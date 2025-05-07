"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Home,
  User,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Settings,
  LogOut,
  Clock,
} from "lucide-react"

// import { supabase } from "../../../supabaseClient.js"
import { createClient } from '@supabase/supabase-js'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY! // Use this securely server-side
  )

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    doctor: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  // Figure out how to get this from localStorage or from Supabase directly
  const currentPatientId = "66ddd3dd-aa53-4146-b724-47fd54b5607c"
  const doctorIdMap = {
    "Dr. Ben Carter": "0781ce8a-6551-4f5f-b700-708335faec09",
    "Dr. Alice Morgan": "33911418-e56b-423c-bc65-49d99fe4bd09",
    "Dr. Frank Thompson": "546bd4cf-e035-44a0-8f5e-511a08c0603b",
    "Dr. Grace Kim": "6847c972-bfa4-46e1-9bfa-b2f0c08fa13b",
    "Dr. Emma Patel": "8d360888-9f7c-40f7-984f-0a4555a99899",
    "Dr. Claire Reynolds": "90bb4a38-e922-4d93-9ca5-3c7747819bca",
    "Dr. Daniel Lee": "e40ccb7b-c91b-4259-8c6c-507cc21fba6f",
    "Dr. Henry Zhao": "f6116a19-05b5-46d1-a914-a1b2eedaac71",
    "Jim bob": "fb469d05-726e-4678-82f7-2793e6375cab",
  };
  

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { type, date, time, doctor, notes } = formData
    const doctor_id = doctorIdMap[doctor] || null
    if (!doctor_id) {
      alert("Doctor not recognized.")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("Appointment").insert([
      {
        pid: currentPatientId,
        doctor_id,
        appt_date: date,
        link: notes || null,
        appt_time: time,
        appt_type: type
      },
      
    ])

    if (error) {
        console.error("Insert failed:", error.message, error.details, error.hint)
        alert("Failed to schedule appointment. Check console for details.")
    } else {
      // Re-fetch after successful insert
      const { data: updated, error: fetchError } = await supabase
        .from("Appointment")
        .select("*")
        .eq("pid", currentPatientId)
        .order("appt_date", { ascending: true })

      if (!fetchError) {
        setAppointments(updated)
        setFormData({ type: "", date: "", time: "", doctor: "", notes: "" })
      }
    }

    setLoading(false)
  }

  const handleDelete = async (appt_id) => {
    const { error } = await supabase
      .from("Appointment")
      .delete()
      .eq("appt_id", appt_id)
  
    if (error) {
      console.error("Delete failed:", error.message)
      alert("Failed to delete appointment.")
    } else {
      // Optionally refetch appointments or update state locally
      setAppointments((prev) => prev.filter((appt) => appt.appt_id !== appt_id))
    }
  }
  


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600">MedC</h1>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">USER1</p>
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
            <NavItem href="/dashboard/patient/appointments" icon={<Calendar />} active>
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
          {/* Appointment Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Schedule a New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Appointment Type</Label>
                    <Input
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      placeholder="e.g., Consultation"
                      required
                    />
                  </div>
                  <div>
                    <Label>Doctor</Label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select a doctor</option>
                      {Object.keys(doctorIdMap).map((doctorName) => (
                        <option key={doctorName} value={doctorName}>
                          {doctorName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Optional notes..."
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
                    {loading ? "Scheduling..." : "Schedule Appointment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Appointment List */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments scheduled yet.</p>
              ) : (
                appointments.map((appt, index) => (
                  <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <p className="font-medium">{appt.appt_type}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {appt.appt_date}
                      <Clock className="h-4 w-4 ml-4" /> {appt.appt_time || "—"}
                    </p>
                    <p className="text-sm text-gray-500">Doctor: {appt.doctor_id || "-"}</p>
                    {appt.link && <p className="text-sm text-gray-400 mt-1">{appt.link}</p>}
                    <Button onClick={() => handleDelete(appt.appt_id)}>
                        Cancel
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-gray-600 text-sm text-center">
            © 2025 MedC Hospital Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

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
