"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { createClient } from '@supabase/supabase-js'

export default function PatientDashboard() {
  const [currentDate] = useState(
    new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  )
  const [appointments, setAppointments] = useState([])

  // Mock data for the patient
  const patientData = {
    name: "USER1",
    age: 25,
    bloodType: "A+",
    height: "5'7\"",
    weight: "145 lbs",
    nextAppointment: "June 3, 2023 - 10:30 AM",
    doctor: "Dr. USER2",
  }

  // Mock data for appointments
  // const appointments = [
  //   {
  //     type: "Check-up",
  //     date: "May 28, 2023",
  //     time: "10:30 AM",
  //     doctor: "Dr. USER2",
  //     location: "Main Hospital, Room 302",
  //   },
  //   {
  //     type: "Blood Test",
  //     date: "June 5, 2023",
  //     time: "9:00 AM",
  //     doctor: "Dr. USER3",
  //     location: "Lab Center, Floor 1",
  //   },
  //   {
  //     type: "Physical Therapy",
  //     date: "June 12, 2023",
  //     time: "2:15 PM",
  //     doctor: "Dr. USER4",
  //     location: "Rehabilitation Center",
  //   },
  // ]

  // Health metrics data
  const healthMetrics = {
    heartRate: "--",
    bloodPressure: "--",
    glucose: "--",
    cholesterol: "--",
    temperature: "--",
    oxygenLevel: "--",
  }

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
    {
      title: "Bills & Payments",
      icon: <CreditCard className="h-6 w-6" />,
      link: "/dashboard/patient/bills",
      color: "bg-yellow-100",
    },
    {
      title: "Lab Results",
      icon: <Clipboard className="h-6 w-6" />,
      link: "/dashboard/patient/lab-results",
      color: "bg-pink-100",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-6 w-6" />,
      link: "/dashboard/patient/messages",
      color: "bg-indigo-100",
    },
    {
      title: "Health Tracking",
      icon: <Activity className="h-6 w-6" />,
      link: "/dashboard/patient/health-tracking",
      color: "bg-red-100",
    },
    {
      title: "Settings",
      icon: <Settings className="h-6 w-6" />,
      link: "/dashboard/patient/settings",
      color: "bg-gray-100",
    },
  ]

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY! // Use this securely server-side
  )

  // Replace with real authenticated user info
  const currentPatientId = "66ddd3dd-aa53-4146-b724-47fd54b5607c"
  const doctorIdMap = {
    "Dr. USER2": "uuid-for-user2",
    "Dr. USER3": "uuid-for-user3",
    "Dr. Smith": "uuid-for-smith", // Add more mappings as needed,
    "Jim bob": "fb469d05-726e-4678-82f7-2793e6375cab",
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("Appointment")
        .select("*")
        .eq("pid", currentPatientId)
        .order("appt_date", { ascending: true })

      if (!error) setAppointments(data)
    }

    fetchAppointments()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600">MedC</h1>
        </div>

        {/* User Profile in Sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{patientData.name}</p>
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
            <NavItem href="/dashboard/patient/medications" icon={<Pill />}>
              Medications
            </NavItem>
            <NavItem href="/dashboard/patient/bills" icon={<CreditCard />}>
              Bills
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
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {patientData.name}</h2>
          </div>

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Health Summary Card with Chart */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/2 aspect-square max-w-[240px] mx-auto md:mx-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-teal-600">87%</p>
                        <p className="text-sm text-gray-500 mt-1">Overall Health</p>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
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
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
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
                      label="Glucose"
                      value={`${healthMetrics.glucose}`}
                      icon={<Activity className="h-4 w-4 text-yellow-500" />}
                    />
                    <MetricItem
                      label="Cholesterol"
                      value={`${healthMetrics.cholesterol}`}
                      icon={<Activity className="h-4 w-4 text-purple-500" />}
                    />
                    <MetricItem
                      label="Temperature"
                      value={healthMetrics.temperature}
                      icon={<Activity className="h-4 w-4 text-orange-500" />}
                    />
                    <MetricItem
                      label="Oxygen Level"
                      value={`${healthMetrics.oxygenLevel}`}
                      icon={<Activity className="h-4 w-4 text-green-500" />}
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
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Appointment</p>
                      <p className="text-sm text-gray-500">
                        {appointment.appt_date}
                      </p>
                      <p className="text-sm text-gray-500">Doctor ID: {appointment.doctor_id}</p>
                      {appointment.link && (
                        <p className="text-sm text-gray-400 mt-1">{appointment.link}</p>
                      )}
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickAccessTiles.map((tile, index) => (
              <Link href={tile.link} key={index}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`${tile.color} p-3 rounded-lg mb-3`}>{tile.icon}</div>
                    <h3 className="font-medium">{tile.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
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
            © 2023 MedC Hospital Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
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
  )
}

function MetricItem({ label, value, icon }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center mb-1">
        {icon}
        <span className="text-xs text-gray-500 ml-1">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}

function ActivityItem({ title, description, time, icon, iconBg, iconColor }) {
  return (
    <div className="flex items-start">
      <div className={`${iconBg} p-2 rounded-lg mr-3`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium">{title}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
