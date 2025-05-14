"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Home,
  Calendar,
  User,
  Pill,
  FileText,
  LogOut,
  Clock,
} from "lucide-react";

import { createClient } from "@supabase/supabase-js";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { supabase } from "../../../supabaseClient";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
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

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser?.email) {
        const { data, error } = await supabase
          .from("Appointment")
          .select(
            `
            appt_id,
            appt_date,
            appt_time,
            appt_type,
            link,
            Patient (
              email,
              name
            )
          `
          )
          .eq("doctor_email", currentUser.email)
          .order("appt_date", { ascending: true });

        if (!error) {
          setAppointments(data);
        } else {
          console.error("Error fetching appointments:", error);
        }
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
            <NavItem
              href="/dashboard/doctor/appointments"
              icon={<Calendar />}
              active
            >
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
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center">
            <Link href="/dashboard/doctor" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">
              My Appointments
            </h2>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments scheduled yet.</p>
              ) : (
                appointments.map((appt) => (
                  <div
                    key={appt.appt_id}
                    className="border-b pb-3 last:border-0 last:pb-0"
                  >
                    <p className="font-medium">{appt.appt_type}</p>
                    <p className="text-sm text-gray-500">
                      Patient: {appt.Patient?.full_name || "N/A"} (
                      {appt.Patient?.email || "N/A"})
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {appt.appt_date}
                      <Clock className="h-4 w-4 ml-4" /> {appt.appt_time || "—"}
                    </p>
                    {appt.link && (
                      <p className="text-sm text-gray-400 mt-1">
                        Notes: {appt.link}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-gray-600 text-sm text-center">
            © 2025 CentraHealth Hospital Management System. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
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
  );
}
