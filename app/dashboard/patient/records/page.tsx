"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
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
  Search,
  Bell,
  Mail,
  Download,
  Printer,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default function MedicalRecordsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false)
  const [records, setRecords] = useState([
    {
      id: "1",
      date: "03/20/2020",
      name: "Prolactin",
      noteType: "History and Physical",
      author: "Dr. Branch",
      lastUpdated: "04/28/2020",
      updatedBy: "Stephanie Branch",
      fileType: "pdf" as const,
    },
    {
      id: "2",
      date: "03/29/2020",
      name: "Bilirubin, total",
      noteType: "Cardiology consultation",
      author: "Dr. Branch",
      lastUpdated: "04/29/2020",
      updatedBy: "Stephanie Branch",
      fileType: "png" as const,
    },
    {
      id: "3",
      date: "04/20/2020",
      name: "DHEA-sulphate",
      noteType: "History and Physical",
      author: "Dr. Sullivan",
      lastUpdated: "05/03/2020",
      updatedBy: "Jimmy Sullivan",
      fileType: "pdf" as const,
    },
    {
      id: "4",
      date: "05/10/2020",
      name: "Free Urinary Cortisol",
      noteType: "History and Physical",
      author: "Dr. Melzer",
      lastUpdated: "05/27/2020",
      updatedBy: "Melissa Melzer",
      fileType: "pdf" as const,
    },
    {
      id: "5",
      date: "05/15/2020",
      name: "Alcohol",
      noteType: "History and Physical",
      author: "Dr. Branch",
      lastUpdated: "05/28/2020",
      updatedBy: "Stephanie Branch",
      fileType: "png" as const,
    },
    {
      id: "6",
      date: "05/20/2020",
      name: "Globuline",
      noteType: "Cardiology consultation",
      author: "Dr. Velaskez",
      lastUpdated: "05/28/2020",
      updatedBy: "Cris Velaskez",
      fileType: "pdf" as const,
    },
  ])

  // Form state for new record
  const [newRecord, setNewRecord] = useState({
    name: "",
    noteType: "",
    author: "",
    fileType: "pdf" as "pdf" | "png",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would filter the records based on the search query
    console.log("Searching for downloadable records:", searchQuery)
  }

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new record with the form data
    const today = new Date()
    const formattedDate = format(today, "MM/dd/yyyy")

    const record = {
      id: (records.length + 1).toString(),
      date: formattedDate,
      name: newRecord.name,
      noteType: newRecord.noteType,
      author: newRecord.author,
      lastUpdated: formattedDate,
      updatedBy: newRecord.author, // In a real app, this would be the current user
      fileType: newRecord.fileType,
    }

    // Add the new record to the records array
    setRecords([...records, record])

    // Reset the form and close the dialog
    setNewRecord({
      name: "",
      noteType: "",
      author: "",
      fileType: "pdf",
    })
    setIsAddRecordOpen(false)
  }

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
            <NavItem href="/dashboard/patient/records" icon={<FileText />} active>
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
            <div className="flex items-center">
              <Link href="/dashboard/patient" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
            </div>

            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search records..."
                  className="w-64 pl-3 pr-10 py-2 rounded-md border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 top-0 h-full bg-teal-500 hover:bg-teal-600 text-white rounded-l-none"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-orange-400 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Mail className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-teal-500 rounded-full"></span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medical Records</CardTitle>
              <Button onClick={() => setIsAddRecordOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Note Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Author</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated by</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4 font-medium">{record.name}</td>
                        <td className="py-3 px-4">{record.noteType}</td>
                        <td className="py-3 px-4">{record.author}</td>
                        <td className="py-3 px-4">{record.lastUpdated}</td>
                        <td className="py-3 px-4">{record.updatedBy}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDownload(record)}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="h-4 w-4 mr-1" />
                              Print
                            </Button>
                          </div>
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

      {/* Add Record Dialog */}
      <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Medical Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRecord}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="noteType" className="text-right">
                  Note Type
                </Label>
                <Input
                  id="noteType"
                  value={newRecord.noteType}
                  onChange={(e) => setNewRecord({ ...newRecord, noteType: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={newRecord.author}
                  onChange={(e) => setNewRecord({ ...newRecord, author: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">File Type</Label>
                <RadioGroup
                  value={newRecord.fileType}
                  onValueChange={(value: "pdf" | "png") => setNewRecord({ ...newRecord, fileType: value })}
                  className="col-span-3 flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="png" id="png" />
                    <Label htmlFor="png">PNG</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddRecordOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Add Record
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper function to handle download
function handleDownload(record: {
  name: string
  date: string
  author: string
  noteType: string
  fileType: "pdf" | "png"
}) {
  // Create a dummy file for download based on the file type
  if (record.fileType === "pdf") {
    // Create a simple PDF-like data URL
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      << /Type /Catalog
      /Outlines 2 0 R
      /Pages 3 0 R
      >>
      endobj
      2 0 obj
      << /Type /Outlines
      /Count 0
      >>
      endobj
      3 0 obj
      << /Type /Pages
      /Kids [4 0 R]
      /Count 1
      >>
      endobj
      4 0 obj
      << /Type /Page
      /Parent 3 0 R
      /MediaBox [0 0 612 792]
      /Contents 5 0 R
      /Resources << /ProcSet 6 0 R
      /Font << /F1 7 0 R >>
      >>
      >>
      endobj
      5 0 obj
      << /Length 73 >>
      stream
      BT
      /F1 24 Tf
      100 700 Td
      (Medical Record: ${record.name}) Tj
      ET
      endstream
      endobj
      6 0 obj
      [/PDF /Text]
      endobj
      7 0 obj
      << /Type /Font
      /Subtype /Type1
      /Name /F1
      /BaseFont /Helvetica
      >>
      endobj
      trailer
      << /Root 1 0 R
      /Size 7
      >>
      %%EOF
    `

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger the download
    const a = document.createElement("a")
    a.href = url
    a.download = `${record.name.replace(/\s+/g, "_")}_${record.date.replace(/\//g, "-")}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } else if (record.fileType === "png") {
    // Create a simple canvas and convert to PNG
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Fill background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add header
      ctx.fillStyle = "#0d9488" // teal-600
      ctx.fillRect(0, 0, canvas.width, 80)

      // Add text
      ctx.fillStyle = "#000000"
      ctx.font = "24px Arial"
      ctx.fillText(`Medical Record: ${record.name}`, 50, 150)
      ctx.font = "18px Arial"
      ctx.fillText(`Date: ${record.date}`, 50, 200)
      ctx.fillText(`Author: ${record.author}`, 50, 240)
      ctx.fillText(`Note Type: ${record.noteType}`, 50, 280)

      // Convert to data URL and download
      const dataUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `${record.name.replace(/\s+/g, "_")}_${record.date.replace(/\//g, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}

// Helper component for navigation items
function NavItem({
  href,
  icon,
  children,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}) {
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
