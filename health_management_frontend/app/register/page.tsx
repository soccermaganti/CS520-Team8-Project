"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { DatePicker } from "@/components/ui/datepicker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "../supabaseClient";
import localHost from "../localHost";
import getCookie from "../getCookie";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 digits.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    dob: z.date().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("patient");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      dob: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            phone_number: values.phoneNumber,
            user_type: userType, // doctor or patient
            // dob: values.dob,
            dob: "2025-5-7",
          },
        },
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      if (userType === "patient"){
        const response = await fetch(`${localHost}/create_${userType}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") || "",
          },
          body: JSON.stringify({
            // pid: String(data.user.id),
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone_num: values.phoneNumber,
            // dob: values.dob,
            dob: "2025-5-7"
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast({
            title: "Registration failed",
            description: errorData.message,
            variant: "destructive",
          });
          return;
        }  
      }
      else{
        const response = await fetch(`${localHost}/create_${userType}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") || "",
          },
          body: JSON.stringify({
            specialty: "filler",
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone_num: values.phoneNumber,
            // // dob: values.dob,
            // dob: "2025-5-7"

          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast({
            title: "Registration failed",
            description: errorData.message,
            variant: "destructive",
          });
          return;
        }  
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });

      router.push("/login");
    } catch (err) {
      console.error(err);
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-b from-teal-100 to-cyan-100 md:block">
          <div
            className="absolute right-0 h-full w-16 bg-white"
            style={{
              borderTopLeftRadius: "100%",
              borderBottomLeftRadius: "100%",
            }}
          ></div>
        </div>

        <div className="relative flex flex-col p-6 md:ml-[30%] md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Register as a User
            </h1>
          </div>

          <Tabs
            defaultValue="patient"
            className="mb-6 w-fit self-end"
            onValueChange={setUserType}
          >
            <TabsList>
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
          </Tabs>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password*</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    Sign in
                  </Link>
                </p>

                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  REGISTER
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
