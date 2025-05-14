"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Bell,
  Mail,
  LogOut,
  User,
  Calendar,
  FileText,
  Users,
  Clipboard,
  Settings,
  Search,
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
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { createClient } from "@supabase/supabase-js"

export default function MedicalRecordsDashboard() {
    const supabase = createClient("https://niqomrgbdcegxorlifel.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcW9tcmdiZGNlZ3hvcmxpZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NTM4MTcsImV4cCI6MjA1NzEyOTgxN30.6qAVJlUjbd-JnEDMBNPdyavb_-97HZcB7ECvmX7Pfus")
    // const router = useRouter()
  
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddRecordOpen, setIsAddRecordOpen] = useState(false)
    const [records, setRecords] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [accountName, setAccountName] = useState(null);
    const [accountNameL, setAccountNameL] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          setCurrentUser(user);
          console.log('kmfelm12',user);
          console.log('kmfelm123',user?.user_metadata?.first_name);
          setAccountName(user?.user_metadata?.first_name)
          setAccountNameL(user?.user_metadata?.last_name)
    
    
    
        };
    
    
        fetchUser();
    
      }, []);
  
    const [newRecord, setNewRecord] = useState({
      recordId: "",
      name: "",
      noteType: "",
      author: "",
      fileType: "pdf" as "pdf" | "png",
      file: null as File | null,
    })
  
    useEffect(() => {
      const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)
  
        const { data, error } = await supabase
          .from("medical_records")
          .select("*")
          .eq("email_doc", user?.email)
  
        if (error) {
          console.error("Fetch error:", error)
          return
        }
  
        const formatted = await Promise.all(data.map(async (record: any, index: number) => {
          let fileUrl = null
          if (record.filePath) {
            const { data: fileData } = supabase.storage.from("test-doc").getPublicUrl(record.filePath)
            fileUrl = fileData?.publicUrl || null
          }
  
          return {
            ...record,
            id: record.id || (index + 1).toString(),
            fileData: fileUrl
          }
        }))
  
        setRecords(formatted)
      }
  
      fetchData()
    }, [])
  
    const handleAddRecord = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRecord.file) {
          alert("Please upload a file");
          return;
        }
      
        const today = new Date();
        const formattedDate = format(today, "MM/dd/yyyy");
      
        const filePath = `${crypto.randomUUID()}`;
      
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from("test-doc")
          .upload(filePath, newRecord.file, {
            cacheControl: '3600',
            upsert: false,
          });
          console.log('inside upload')
      
        if (uploadError) {
          console.error("Upload error:", uploadError);
          alert("Failed to upload file");
          return;
        }
    
        const fullNameParts = [];
    if (accountName) fullNameParts.push(accountName);
    if (accountNameL) fullNameParts.push(accountNameL);
    const fullName = fullNameParts.join(' ');
      
        const { error: insertError } = await supabase
          .from("medical_records")
        .insert([
            {
                email_doc: newRecord.recordId,
                name_doc: fullName,
                noteType: newRecord.noteType,
                author: newRecord.author,
                date: formattedDate,
                lastUpdated: formattedDate,
                updatedBy: newRecord.author,
                fileType:  "application/pdf",
                fileName: newRecord.file.name,
                filePath: filePath, // ⬅️ save the path instead of binary
                email: currentUser?.email,
                name: newRecord.name
            },
        ]);
      
        if (insertError) {
          console.error("Insert error:", insertError);
          alert("Failed to save metadata");
          return;
        }
      
        setNewRecord({
          recordId: "",
          name: "",
          noteType: "",
          author: "",
          fileType: "pdf",
          file: null,
        });
        setIsAddRecordOpen(false);
        window.location.reload(); // or router.refresh() if using App Router
    
      };
  
    const handleDownload = (record: any) => {
      if (!record.fileData) return
      const a = document.createElement("a")
      a.href = record.fileData
      a.download = record.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-500">MedC</h1>
        </div>
        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <NavItem href="/dashboard/doctor" icon={<User />}>
              Profile
            </NavItem>
            <NavItem href="/dashboard/doctor/appointments" icon={<Calendar />}>
              Appointments
            </NavItem>
            <NavItem href="/dashboard/doctor/patients" icon={<Users />}>
              Patients
            </NavItem>
            <NavItem href="/dashboard/doctor/records" icon={<FileText />} active>
              Records
            </NavItem>
          </div>
          <div className="absolute bottom-0 w-60 border-t border-gray-200">
            <NavItem href="/dashboard/doctor/settings" icon={<Settings />}>
              Settings
            </NavItem>
            <NavItem href="/login" icon={<LogOut />}>
              Log Out
            </NavItem>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="relative w-64">
            <Input
              placeholder="Search records..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          <div className="text-gray-600">{'xjsnckjasn'}</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-orange-400 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-teal-500 rounded-full"></span>
            </Button>
            <Avatar>
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Medical Records</h1>
            <Button onClick={() => setIsAddRecordOpen(true)} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Patient ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Patient Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Note Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Updated by</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated by</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">File</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{record.email}</td>
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4">{record.name}</td>
                        <td className="py-3 px-4">{record.noteType}</td>
                        <td className="py-3 px-4">{record.author}</td>
                        <td className="py-3 px-4">{record.lastUpdated}</td>
                        <td className="py-3 px-4">{record.updatedBy}</td>
                        <td className="py-3 px-4">
                          {record.fileName ? (
                            <span className="text-sm text-gray-600">
                              {record.fileName}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">No file</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(record)}
                              disabled={!record.fileData}
                              className={!record.fileData ? "cursor-not-allowed opacity-50" : ""}
                              title={!record.fileData ? "No file available" : "Download file"}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            {/* <Button variant="outline" size="sm">
                              <Printer className="h-4 w-4 mr-1" />
                              Print
                            </Button> */}
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
            {/* © 2023 MedC Hospital Management System. All rights reserved. */}
          </p>
        </footer>
      </div>

      {/* Add Record Dialog */}
      <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Add New Medical Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRecord} className="mt-2">
            <div className="space-y-5">
              <fieldset className="border rounded-md p-4 bg-gray-50">
                <legend className="text-sm font-medium px-2">Record Information</legend>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="recordId" className="w-24 text-right flex-shrink-0">
                      Patient mail id <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="recordId"
                      value={newRecord.recordId}
                      onChange={(e) => setNewRecord({ ...newRecord, recordId: e.target.value })}
                      className="flex-1"
                      placeholder="e.g. MR-007"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label htmlFor="name" className="w-24 text-right flex-shrink-0">
                      Paitent Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={newRecord.name}
                      onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                      className="flex-1"
                      placeholder="Record name"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label htmlFor="noteType" className="w-24 text-right flex-shrink-0">
                      Note Type <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="noteType"
                      value={newRecord.noteType}
                      onChange={(e) => setNewRecord({ ...newRecord, noteType: e.target.value })}
                      className="flex-1"
                      placeholder="e.g. History and Physical"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label htmlFor="author" className="w-24 text-right flex-shrink-0">
                      Author <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="author"
                      value={newRecord.author}
                      onChange={(e) => setNewRecord({ ...newRecord, author: e.target.value })}
                      className="flex-1"
                      placeholder="Patient name"
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border rounded-md p-4 bg-gray-50">
                <legend className="text-sm font-medium px-2">File Information</legend>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Label className="w-24 text-right flex-shrink-0">
                      File Type <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={newRecord.fileType}
                      onValueChange={(value: "pdf" | "png") => {
                        setNewRecord({ ...newRecord, fileType: value, file: null })
                        // Reset the file input when changing file type
                        const fileInput = document.getElementById("file") as HTMLInputElement
                        if (fileInput) fileInput.value = ""
                      }}
                      className="flex gap-6"
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

                  <div className="flex items-start gap-3">
                    <Label htmlFor="file" className="w-24 text-right flex-shrink-0 mt-2">
                      Upload <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex-1">
                      <Input
                        id="file"
                        type="file"
                        accept={newRecord.fileType === "pdf" ? ".pdf" : ".png,.jpg,.jpeg"}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setNewRecord({ ...newRecord, file: e.target.files[0] })
                          }
                        }}
                        className="w-full"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a {newRecord.fileType === "pdf" ? "PDF document" : "PNG image"}
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="text-xs text-gray-500 text-right">
                <span className="text-red-500">*</span> Required fields
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2">
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
  fileName?: string
  fileSize?: string
  fileData?: string | null
  recordId?: string
}) {
  // If we have actual file data, use it for download
  if (record.fileData) {
    const a = document.createElement("a")
    a.href = record.fileData
    a.download =
      record.fileName ||
      `${record.recordId || ""}_${record.name.replace(/\s+/g, "_")}_${record.date.replace(/\//g, "-")}.${record.fileType}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    return
  }

  // Fallback to generating dummy files for existing records without fileData
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
    a.download = `${record.recordId || ""}_${record.name.replace(/\s+/g, "_")}_${record.date.replace(/\//g, "-")}.pdf`
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
      ctx.fillText(`Record ID: ${record.recordId || "N/A"}`, 50, 190)
      ctx.fillText(`Date: ${record.date}`, 50, 220)
      ctx.fillText(`Author: ${record.author}`, 50, 250)
      ctx.fillText(`Note Type: ${record.noteType}`, 50, 280)

      // Convert to data URL and download
      const dataUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `${record.recordId || ""}_${record.name.replace(/\s+/g, "_")}_${record.date.replace(/\//g, "-")}.png`
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
