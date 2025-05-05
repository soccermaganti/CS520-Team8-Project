"use client";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/health_management_be/frontend/health_management_frontend/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/health_management_be/frontend/health_management_frontend/components/ui/card";
import { Input } from "@/health_management_be/frontend/health_management_frontend/components/ui/input";
import { Textarea } from "@/health_management_be/frontend/health_management_frontend/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
} from "@/health_management_be/frontend/health_management_frontend/components/ui/avatar";

export default function MedicationsPage() {
  // Mock data for currently prescribed medications
  const currentMedications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. USER2",
      startDate: "Jan 15, 2023",
      refillsRemaining: 2,
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. USER3",
      startDate: "Feb 3, 2023",
      refillsRemaining: 5,
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescribedBy: "Dr. USER2",
      startDate: "Dec 10, 2022",
      refillsRemaining: 1,
    },
  ];

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
              <p className="font-medium">USER1</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
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
              active
            >
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
          <div className="px-6 py-4 flex items-center">
            <Link href="/dashboard/patient" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Medications</h2>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Order Prescription Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name
                  </label>
                  <Input placeholder="Enter medication name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <Input placeholder="Enter dosage" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <Input placeholder="Enter quantity" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refills
                  </label>
                  <Input placeholder="Enter number of refills" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <Textarea placeholder="Enter any special instructions" />
              </div>

              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Currently Prescribed Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Currently Prescribed Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Medication
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Dosage
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Frequency
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Prescribed By
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Start Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Refills
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMedications.map((medication, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4">{medication.name}</td>
                        <td className="py-3 px-4">{medication.dosage}</td>
                        <td className="py-3 px-4">{medication.frequency}</td>
                        <td className="py-3 px-4">{medication.prescribedBy}</td>
                        <td className="py-3 px-4">{medication.startDate}</td>
                        <td className="py-3 px-4">
                          {medication.refillsRemaining}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Refill
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  );
}

// Helper component
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
