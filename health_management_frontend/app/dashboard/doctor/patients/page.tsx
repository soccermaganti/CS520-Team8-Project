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
import { supabase } from "../../../supabaseClient";

const PatientsPage = () => {
  const [doctorEmail, setDoctorEmail] = useState("");
  useEffect(() => {
    const fetchDoctor = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("Error fetching patient");
      } else {
        // Set the patient data in state or use it directly
        console.log("Patient data:", user);
        setDoctorEmail(user.email.toString());
      }
    };
    fetchDoctor();
  }, []);
  // console.log(`Patient email: ${patientEmail}-${typeof patientEmail}`);
  const [doctorName, setDoctorName] = useState("");
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchDoctor = async () => {
      const { data, error } = await supabase
        .from("Doctor")
        .select("name")
        .eq("email", doctorEmail)
        .single();

      if (error) {
        console.error("Error fetching doctor:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Doctor Name:", data);
        setDoctorName(data.name);
      }
    };
    fetchDoctor();
  }, [doctorEmail]);
  const [patientDoctors, setPatientDoctors] = useState<
    { doctor_email: string; patient_email: string; accepted: boolean }[]
  >([]);
  // const [updated, setUpdated] = useState(false)
  useEffect(() => {
    const fetchPatientDoctors = async () => {
      const { data, error } = await supabase
        .from("Patient-Doctor")
        .select("*")
        .eq("doctor_email", doctorEmail)
        .order("accepted", { ascending: false })
        .order("doctor_email", { ascending: true });

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        // Set the doctor data in state or use it directly
        console.log("Doctor data:", data);
        setPatientDoctors(data);
      }
    };
    fetchPatientDoctors();
  }, [doctorEmail, doctorName]);

  const fetchPatient = async (patientEmail) => {
    const { data, error } = await supabase
      .from("Patient")
      .select("name")
      .eq("email", patientEmail)
      .single();

    if (error) {
      console.error("Error fetching patient name:", error);
      return "N/A";
    } else {
      // Set the doctor data in state or use it directly
      // console.log("Patient data:", data);
      return data.name;
    }
  };
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (doc_e, pat_e) => {
    try {
      // Update the "Patient-Doctor" table to mark the request as accepted
      // e.preventDefault()
      // console.log("pressed")
      const { data, error } = await supabase
        .from("Patient-Doctor")
        .update({ accepted: true })
        .eq("doctor_email", doc_e)
        .eq("patient_email", pat_e);

      if (error) {
        console.error("Error updating patient-doctor relationship:", error);
      } else {
        console.log("Patient-doctor relationship updated successfully:", data);
        // Optionally, refresh the patientDoctors state here
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    }
  };
  const listPatients = () => {
    return patientDoctors.map((doctor) => (
      <Card key={doctor.doctor_email + " " + doctor.patient_email}>
        <CardHeader>
          <CardTitle>{doctor.patient_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{doctor.patient_email}</p>
          {doctor.accepted ? (
            <p>Accepted</p>
          ) : (
            <div className="flex justify-between items-center">
              <p>Requested</p>
              <Button
                onClick={() => {
                  handleSubmit(doctor.doctor_email, doctor.patient_email);
                  window.location.reload();
                }}
                className="ml-auto"
              >
                Accept
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    ));
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
                  : "DR"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentUser?.email || "Doctor"}</p>
              <p className="text-xs text-gray-500">Doctor</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <NavItem href="/dashboard/doctor" icon={<Home />}>
              Dashboard
            </NavItem>
            <NavItem href="/dashboard/doctor/appointments" icon={<Calendar />}>
              Appointments
            </NavItem>
            <NavItem
              href="/dashboard/doctor/patients"
              icon={<Calendar />}
              active
            >
              Patients
            </NavItem>
            <NavItem href="/dashboard/doctor/records" icon={<FileText />}>
              Records
            </NavItem>
          </div>
          <div className="absolute bottom-0 w-64 border-t border-gray-200">
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
            <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Doctors View */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Requested and Assigned Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {listPatients()}
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
export default PatientsPage;
