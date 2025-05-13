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

const PrescribePage = () => {
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
        .eq("accepted", true);
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
  const [selectedPatient, setSelectedPatient] = useState("");

  const [formData, setFormData] = useState({
    drug_name: "",
    dosage: 0,
    exp_date: "",
    start_date: "",
    quantity: 0,
    patient_email: "",
    doctor_email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.patient_email = selectedPatient.split(",")[1];
    formData.doctor_email = doctorEmail;
    console.log(`Selected Doctor Info ${formData}`);

    // setLoading(true)

    const { error } = await supabase.from("Prescription").insert([formData]);

    if (error) {
      console.error("Insert failed:", error.message, error.details, error.hint);
      alert("Already Prescribed");
    } else {
      alert(`Prescribed Medication to ${selectedPatient.split(",")[0]}`);
    }
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
              Check-Up Form
            </NavItem>
            <NavItem href="/dashboard/doctor/appointments" icon={<Calendar />}>
              Appointments
            </NavItem>
            <NavItem href="/dashboard/doctor/patients" icon={<Calendar />}>
              Patients
            </NavItem>
            <NavItem href="/dashboard/doctor/records" icon={<FileText />}>
              Records
            </NavItem>
            <NavItem href="/dashboard/doctor/prescribe" icon={<Pill />} active>
              Prescribe
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
                <CardTitle>Prescribe Medication</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    id="doctor"
                    className="w-full border border-gray-300 rounded-md p-2"
                    onChange={(e) => {
                      setSelectedPatient(e.target.value);
                    }}
                  >
                    <option value="">-- Select a Patient --</option>
                    {patientDoctors.map((pairing) => (
                      <option
                        key={pairing.patient_email}
                        value={[pairing.patient_name, pairing.patient_email]}
                      >
                        {pairing.patient_name} ({pairing.patient_email})
                      </option>
                    ))}
                  </select>
                  <div>
                    <Label htmlFor="drug_name">Drug Name</Label>
                    <Input
                      id="drug_name"
                      type="text"
                      placeholder="Enter drug name"
                      required
                      className="mt-1"
                      value={formData.drug_name}
                      onChange={(e) =>
                        setFormData({ ...formData, drug_name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage (mg/day)</Label>
                    <Input
                      id="dosage"
                      type="number"
                      step="0.01"
                      placeholder="Enter dosage"
                      required
                      className="mt-1"
                      value={formData.dosage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dosage: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      required
                      className="mt-1"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="exp_date">Expiration Date</Label>
                    <Input
                      id="exp_date"
                      type="date"
                      required
                      className="mt-1"
                      value={formData.exp_date}
                      onChange={(e) =>
                        setFormData({ ...formData, exp_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      required
                      className="mt-1"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Prescribe
                  </Button>
                </form>
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
export default PrescribePage;
