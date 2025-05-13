"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Mail,
  LogOut,
  Home,
  User,
  Pill,
  Calendar,
  FileText,
  Users,
  Clipboard,
  Settings,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "../../supabaseClient";

export default function DoctorDashboard() {
  const [currentDate] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })
  );
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

  const [selectedPatient, setSelectedPatient] = useState("");

  const [formData, setFormData] = useState({
    weight: 0.0,
    height: 0.0,
    bpm: 0,
    activity_level: "",
    age: 0,
    email: "",
    temp: 0.0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPatient == "") {
      alert("Please select a patient to add or update informatio on");
      return;
    }
    formData.email = selectedPatient.split(",")[1];
    console.log(`Selected Doctor Info ${formData}`);

    // setLoading(true)
    const { error } = await supabase.from("Info").select("*");

    if (error) {
      const { error } = await supabase.from("Info").insert([formData]);

      if (error) {
        console.error(
          "Insert failed:",
          error.message,
          error.details,
          error.hint
        );
        alert("Information for patient already exists");
      } else {
        alert(`Added metrics for ${selectedPatient.split(",")[0]}`);
      }
    } else {
      // Remove keys with no form values
      Object.keys(formData).forEach((key) => {
        if (formData[key] === 0 || formData[key] === "") {
          delete formData[key];
        }
      });
      const { error } = await supabase
        .from("Info")
        .update([formData])
        .eq("email", formData.email);

      if (error) {
        console.error(
          "Update failed:",
          error.message,
          error.details,
          error.hint
        );
        alert("Unable to process changes");
      } else {
        alert(`Updated metrics for ${selectedPatient.split(",")[0]}`);
      }
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
            <NavItem href="/dashboard/doctor" icon={<Home />} active>
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
            <NavItem href="/dashboard/doctor/prescribe" icon={<Pill />}>
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
      <div className="flex-1 overflow-auto">
        {/* Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Patient Checkup Form</h1>

          <div className="flex">
            {/* Main Content Area */}
            <div className="flex-1">
              <Card>
                <CardContent className="p-6">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="Enter height"
                          className="mt-1"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              height: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Enter weight"
                          className="mt-1"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              weight: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="bpm">Heart Rate (BPM)</Label>
                        <Input
                          id="bpm"
                          type="number"
                          placeholder="Enter heart rate"
                          className="mt-1"
                          value={formData.bpm}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bpm: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="activity_level">
                          Blood Pressure (mmHg)
                        </Label>
                        <Input
                          id="activity_level"
                          type="text"
                          placeholder="low, moderate, high, extreme"
                          className="mt-1"
                          value={formData.activity_level}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              activity_level: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="blood_pressure">
                          Blood Pressure (mmHg)
                        </Label>
                        <Input
                          id="blood_pressure"
                          type="text"
                          placeholder="Enter blood pressure"
                          className="mt-1"
                          value={formData.blood_pressure}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              blood_pressure: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="temperature">
                          Body Temperature (°F)
                        </Label>
                        <Input
                          id="temperature"
                          type="number"
                          step="0.1"
                          placeholder="Enter body temperature"
                          className="mt-1"
                          value={formData.temperature}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              temperature: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() =>
                      setFormData({
                        weight: 0.0,
                        height: 0.0,
                        bpm: 0,
                        activity_level: "",
                        age: 0,
                        email: "",
                        temp: 0.0,
                      })
                      }
                    >
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper components
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
