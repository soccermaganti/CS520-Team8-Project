"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Home,
  User,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Clipboard,
  Settings,
  LogOut,
  Clock,
} from "lucide-react";

// import { supabase } from "../../../supabaseClient.js"
import { createClient } from "@supabase/supabase-js";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../../../supabaseClient";

const PatientProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);
      };
      fetchUser();
    },[]);

  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone_num: "",
  });
  const [patientAge, setPatientAge] = useState(0);
  useEffect(() => {
    const currentPatientId = localStorage.getItem("user") || "{}";
    const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from("Patient")
        .select("*")
        .eq("email", parsedID)
        .single();

      if (error) {
        console.error("Error fetching patient:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Patient data:", data);
        setPatient(data);
      }
    };
    fetchPatient();
  }, []);
  useEffect(() => {
    const currentPatientId = localStorage.getItem("user") || "{}";
    const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from("Info")
        .select("age")
        .eq("email", parsedID)
        .single();

      if (error) {
        console.error("Error fetching patient age:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Patient data:", data);
        setPatientAge(data.age);
      }
    };
    fetchPatient();
  }, []);

  const patientData = {
    name: patient.name,
    age: patientAge,
    dob: patient.dob,
    email: patient.email,
    phone: patient.phone_num,
    address: "123 Main St, Springfield, USA",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600">CentraHealth</h1>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {currentUser?.email
                  ? currentUser.email.substring(0, 2).toUpperCase()
                  : "PT"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{patientData.name}</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <NavItem href="/dashboard/patient" icon={<Home />}>
              Dashboard
            </NavItem>
            <NavItem href="/dashboard/patient/profile" icon={<User />} active>
              Profile
            </NavItem>
            <NavItem href="/dashboard/patient/appointments" icon={<Calendar />}>
              Appointments
            </NavItem>
            <NavItem href="/dashboard/patient/records" icon={<FileText />}>
              Records
            </NavItem>
            <NavItem
              href="/dashboard/patient/medications"
              icon={<Pill />}
            >
              Medications
            </NavItem>
            <NavItem href="/dashboard/patient/doctors" icon={<Clipboard />}>
                Doctors
              </NavItem>
          </div>
          <div className="absolute bottom-0 w-64 border-t border-gray-200">
            <NavItem href="/dashboard/patient/settings" icon={<Settings />}>
              Settings
            </NavItem>
            <NavItem href="/login" icon={<LogOut />}>
              Log Out
            </NavItem>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center">
            <Link href="/dashboard/patient" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/*Profile View */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{patientData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date of Birth:</span>
                <span>{patientData.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Age:</span>
                <span>{patientData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{patientData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{patientData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address:</span>
                <span>{patientData.address}</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-gray-600 text-sm text-center">
            © 2025 CentraHealth Hospital Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

function NavItem({ href, icon, children, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-3 text-sm font-medium ${
        active
          ? "text-teal-500 bg-teal-50 border-l-4 border-teal-500"
          : "text-gray-600 hover:text-teal-500 hover:bg-gray-50"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  );
}

export default PatientProfilePage;
