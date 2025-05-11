"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Home,
  User,
  Calendar,
  FileText,
  Pill,
  Clipboard,
  CreditCard,
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY! // Use this securely server-side
);
const DoctorsPage = () => {
  const [patientEmail, setPatientEmail] = useState("");
  useEffect(() => {
    const fetchPatient = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error("Error fetching patient");
      } else {
        // Set the patient data in state or use it directly
        console.log("Patient data:", user);
        setPatientEmail(user.email.toString());
      }
    };
    fetchPatient();
  }, []);
  // console.log(`Patient email: ${patientEmail}-${typeof patientEmail}`);
  const [patientName, setPatientName] = useState("");
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from("Patient")
        .select("name")
        .eq("email", patientEmail)
        .single();

      if (error) {
        console.error("Error fetching patient:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Patient Name:", data);
        setPatientName(data.name);
      }
    };
    fetchPatient();
  }, [patientEmail]);
  const [patientDoctors, setPatientDoctors] = useState([]);
  const [updated, setUpdated] = useState(false)
  useEffect(() => {
    const fetchPatientDoctors = async () => {
      const { data, error } = await supabase
        .from("Patient-Doctor")
        .select("*")
        .eq("patient_email", patientEmail)
        .order("accepted", { ascending: false })
        .order("doctor_email", {ascending: true});

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        // Set the doctor data in state or use it directly
        console.log("Doctor data:", data);
        setPatientDoctors(data);
      }
    };
    fetchPatientDoctors();
  }, [patientEmail, ]);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("Doctor")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        // Set the doctor data in state or use it directly
        console.log("Doctor data:", data);
        setDoctors(data);
      }
    };
    fetchDoctors();
  }, [patientEmail]);

  const [selectedDoctor, setSelectedDoctor] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const patient_email = patientEmail
    const doctor_email = selectedDoctor
    

    // setLoading(true)

    const { error } = await supabase.from("Patient-Doctor").insert([
      {
        patient_email : patient_email,
        doctor_email: doctor_email,
        accepted: false
      },
      
    ])

    if (error) {
        console.error("Insert failed:", error.message, error.details, error.hint)
        alert("Doctor has already been requested for.")
    } else {
      // Re-fetch after successful insert
      const { data, error } = await supabase
        .from("Patient-Doctor")
        .select("*")
        .eq("patient_email", patientEmail)
        .order("accepted", { ascending: false })
        .order("doctor_email", {ascending: true});

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        // Set the doctor data in state or use it directly
        console.log("Doctor data:", data);
        setPatientDoctors(data);
      }
    }

  }


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
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{patientName}</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <NavItem href="/dashboard/patient" icon={<Home />}>
              Dashboard
            </NavItem>
            <NavItem href="/dashboard/patient/profile" icon={<User />}>
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
            <NavItem href="/dashboard/patient/Doctors" icon={<Clipboard />} active>
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
            <h2 className="text-2xl font-bold text-gray-800">Doctors</h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Doctors View */}
            <div className="space-y-8">
            <Card>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <select
                id="doctor"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                <option value="">-- Select a Doctor --</option>
                {doctors.map((doctor) => (
                <option key={doctor.email} value={doctor.email}>
                  {doctor.name} ({doctor.email})
                </option>
                ))}
                </select>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 p-2">
                Request Doctor
                </Button>
                </form>
            </Card>
            <Card>
              <CardHeader>
              <CardTitle>Requested and Assigned Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {patientDoctors.map((doctor) => (
                <Card key={doctor.doctor_email + " " + doctor.patient_email}>
                  <CardHeader>
                  <CardTitle>{doctor.doctor_email}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  {doctor.accepted ? (
                    <p>Accepted</p>
                  ) : (
                    <p>Pending</p>
                  )}
                  </CardContent>
                </Card>
                ))}
              </div>
              </CardContent>
            </Card>
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
export default DoctorsPage;
