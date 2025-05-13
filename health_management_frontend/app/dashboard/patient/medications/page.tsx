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

const MedicationsPage = () => {
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
  }, [patientEmail]);
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
        console.log("Patient data:", data);
        setPatientName(data.name);
      }
    };
    fetchPatient();
  }, [patientEmail]);
  const [activeMeds, setActiveMeds] = useState([]);
  // const [patient, setPatient] = useState({name: "", email: "", phone_num: ""})
  // const [patientAge, setPatientAge] = useState(0)
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchActivePrescriptions = async () => {
      const { data, error } = await supabase
        .from("Prescription")
        .select("*")
        .eq("patient_email", patientEmail)
        .gte("exp_date", new Date().toISOString())
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching patient:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Active Meds data:", data);
        setActiveMeds(data);
      }
    };
    fetchActivePrescriptions();
  }, [patientEmail]);
  const [expiredMeds, setExpiredMeds] = useState([]);
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchExpiredPrescriptions = async () => {
      const { data, error } = await supabase
        .from("Prescription")
        .select("*")
        .eq("patient_email", patientEmail)
        .lt("exp_date", new Date().toISOString())
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching patient:", error);
      } else {
        // Set the patient data in state or use it directly
        console.log("Expired Meds data:", data);
        setExpiredMeds(data);
      }
    };
    fetchExpiredPrescriptions();
  }, [patientEmail]);
  // const medications = [
  //   { id: 1, name: "Medication A", dosage: "10mg", frequency: "Once a day" },
  //   { id: 2, name: "Medication B", dosage: "20mg", frequency: "Twice a day" },
  //   { id: 3, name: "Medication C", dosage: "5mg", frequency: "Once a week" },
  // ];

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
              icon={<Pill />} active
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
            <h2 className="text-2xl font-bold text-gray-800">Medications</h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Medications View */}
          <div className="flex space-x-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Active Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-128 overflow-y-auto">
                  {activeMeds.map((medication) => (
                    <Card key={medication.pre_id}>
                      <CardHeader>
                        <CardTitle>{medication.drug_name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Dosage: {medication.dosage} mg</p>
                        <p>Quantity: {medication.quantity}</p>
                        <p>Expiration Date: {medication.exp_date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Expired Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-128 overflow-y-auto">
                  {expiredMeds.map((medication) => (
                    <Card key={medication.pre_id}>
                      <CardHeader>
                        <CardTitle>{medication.drug_name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Dosage: {medication.dosage} mg</p>
                        <p>Quantity: {medication.quantity}</p>
                        <p>Expiration Date: {medication.exp_date}</p>
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
export default MedicationsPage;
