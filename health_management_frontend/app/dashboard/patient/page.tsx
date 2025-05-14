"use client";
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Pill,
  Settings,
  User,
  Clock,
  Activity,
  Heart,
  Clipboard,
  MessageSquare,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { createClient } from "@supabase/supabase-js";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";

interface Appointment {
  appt_id: string;
  appt_type: string;
  appt_date: string;
  appt_time: string;
  doctor_email: string;
  patient_email: string;
  link?: string;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

interface MetricItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function PatientDashboard() {
  const [currentDate] = useState(
    new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  },[]);


  // Mock data for the patient
  // TODO: Replace with actual data fetching logic
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone_num: "",
  });
  const [patientInfo, setPatientInfo] = useState({
    age: 0,
    blood_type: "",
    blood_pressure: "",
    bpm: 0,
    height: "",
    weight: "",
    temp: 0,
  });
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchPatientInfo = async () => {
      const { data, error } = await supabase
        .from("Info")
        .select("*")
        .eq("email", currentUser?.email)
        .single();

      if (error) {
        console.error("Error fetching patient EHR:", error);
      } else {
        // Set the patient data in state or use it directly
        // console.log("Patient EHR data:", data)
        setPatientInfo(data);
      }
    };

    fetchPatientInfo();
  }, [currentUser]);
  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    // console.log("Parsed ID:", parsedID)
    const fetchPatient = async () => {
      const { data, error } = await supabase
        .from("Patient")
        .select("name, email, phone_num")
        .eq("email", currentUser?.email)
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
  }, [currentUser]);

  useEffect(() => {
    // const currentPatientId = localStorage.getItem("user") || "{}";
    // const parsedID = JSON.parse(currentPatientId);
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("Appointment")
        .select("*")
        .eq("patient_email", currentUser?.email)
        .order("appt_date", { ascending: true });

      if (!error) {
        console.log("Appointments data:", data);
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const patientData = {
    name: patient.name,
    email: patient.email,
    phone_num: patient.phone_num,
    age: patientInfo.age,
    bloodType: patientInfo.blood_type,
    nextAppointment: appointments[0],
    // pid: patient.pid,
  };
  // console.log(appointments)

  // Mock data for appointments
  // const appointments = [
  //		{
  //			type: "Check-up",
  //			date: "May 28, 2023",
  //			time: "10:30 AM",
  //			doctor: "Dr. USER2",
  //			location: "Main Hospital, Room 302",
  //		},
  //		{
  //			type: "Blood Test",
  //			date: "June 5, 2023",
  //			time: "9:00 AM",
  //			doctor: "Dr. USER3",
  //			location: "Lab Center, Floor 1",
  //		},
  //		{
  //			type: "Physical Therapy",
  //			date: "June 12, 2023",
  //			time: "2:15 PM",
  //			doctor: "Dr. USER4",
  //			location: "Rehabilitation Center",
  //		},
  // ]
  // const appointments = [
  //		{
  //			type: "Check-up",
  //			date: "May 28, 2023",
  //			time: "10:30 AM",
  //			doctor: "Dr. USER2",
  //			location: "Main Hospital, Room 302",
  //		},
  //		{
  //			type: "Blood Test",
  //			date: "June 5, 2023",
  //			time: "9:00 AM",
  //			doctor: "Dr. USER3",
  //			location: "Lab Center, Floor 1",
  //		},
  //		{
  //			type: "Physical Therapy",
  //			date: "June 12, 2023",
  //			time: "2:15 PM",
  //			doctor: "Dr. USER4",
  //			location: "Rehabilitation Center",
  //		},
  // ]

  // Health metrics data
  const healthMetrics = {
    age: `${patientInfo.age} yrs old`,
    heartRate: patientInfo.bpm,
    bloodPressure: patientInfo.blood_pressure,
    height: `${patientInfo.height} ft`,
    weight: `${patientInfo.weight} lbs`,
    temperature: `${patientInfo.temp} °F`,
  };

  // Quick access tiles
  const quickAccessTiles = [
    {
      title: "Appointments",
      icon: <Calendar className="h-6 w-6" />,
      link: "/dashboard/patient/appointments",
      color: "bg-blue-100",
    },
    {
      title: "Medications",
      icon: <Pill className="h-6 w-6" />,
      link: "/dashboard/patient/medications",
      color: "bg-green-100",
    },
    {
      title: "Medical Records",
      icon: <FileText className="h-6 w-6" />,
      link: "/dashboard/patient/records",
      color: "bg-purple-100",
    },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser?.email) {
        const { data, error } = await supabase
          .from("Appointment")
          .select("*")
          .eq("patient_email", currentUser.email)
          .order("appt_date", { ascending: true });

        if (!error) setAppointments(data);
      }
    };
    fetchAppointments();
  }, [currentUser]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600">CentraHealth</h1>
        </div>

        {/* User Profile in Sidebar */}
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
              <p className="font-medium">
                {currentUser?.email ? currentUser.email : "U"}
              </p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <NavItem href="/dashboard/patient" icon={<Home />} active>
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
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600">{currentDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {patientData.name}
            </h2>
          </div>

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Health Summary Card with Chart */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Most Recent Check-up Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* <div className="relative w-full md:w-1/2 aspect-square max-w-[240px] mx-auto md:mx-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-teal-600">87%</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Overall Health
                        </p>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset="37"
                      />
                    </svg>
                  </div> */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {/* <MetricItem
                      label="Age"
                      value={`${healthMetrics.age}`}
                      icon={<Activity className="h-4 w-4 text-green-500" />}
                    /> */}
                    <MetricItem
                      label="Heart Rate"
                      value={`${healthMetrics.heartRate}`}
                      icon={<Heart className="h-4 w-4 text-red-500" />}
                    />
                    <MetricItem
                      label="Blood Pressure"
                      value={healthMetrics.bloodPressure}
                      icon={<Activity className="h-4 w-4 text-blue-500" />}
                    />
                    <MetricItem
                      label="Weight"
                      value={`${healthMetrics.weight}`}
                      icon={<Activity className="h-4 w-4 text-yellow-500" />}
                    />
                    <MetricItem
                      label="Height"
                      value={`${healthMetrics.height}`}
                      icon={<Activity className="h-4 w-4 text-purple-500" />}
                    />
                    <MetricItem
                      label="Temperature"
                      value={healthMetrics.temperature}
                      icon={<Activity className="h-4 w-4 text-orange-500" />}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <div className="bg-teal-100 p-2 rounded-lg mr-3">
                        <Clock className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.appt_type}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.appt_date} at {appointment.appt_time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.doctor_email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/patient/appointments" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Appointments
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Quick Access Tiles */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickAccessTiles.map((tile, index) => (
              <Link href={tile.link} key={index}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`${tile.color} p-3 rounded-lg mb-3`}>
                      {tile.icon}
                    </div>
                    <h3 className="font-medium">{tile.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <ActivityItem
                  title="Prescription Refilled"
                  description="Your prescription for Albuterol HFA has been refilled"
                  time="2 hours ago"
                  icon={<Pill className="h-5 w-5" />}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                />
                <ActivityItem
                  title="Lab Results Available"
                  description="Your recent blood work results are now available"
                  time="Yesterday"
                  icon={<FileText className="h-5 w-5" />}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                />
                <ActivityItem
                  title="Appointment Confirmed"
                  description="Your appointment with Dr. USER2 has been confirmed"
                  time="2 days ago"
                  icon={<Calendar className="h-5 w-5" />}
                  iconBg="bg-purple-100"
                  iconColor="text-purple-600"
                />
                <ActivityItem
                  title="Payment Processed"
                  description="Your payment of $75.00 has been processed"
                  time="3 days ago"
                  icon={<CreditCard className="h-5 w-5" />}
                  iconBg="bg-yellow-100"
                  iconColor="text-yellow-600"
                />
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-gray-600 text-sm text-center">
            © 2025 CentraHealth Hospital Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

// Helper components
function NavItem({ href, icon, children, active = false }: NavItemProps) {
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

function MetricItem({ label, value, icon }: MetricItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
  icon,
  iconBg,
  iconColor,
}: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}