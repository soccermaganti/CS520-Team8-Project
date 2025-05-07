"use client"

import type React from "react"
import { useState } from "react"
import { Search, Bell, Mail, Download, Printer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MedicalRecordsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would filter the records based on the search query
    console.log("Searching for downloadable records:", searchQuery)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-60 border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="#" className="text-2xl font-medium text-teal-500">
            MedC
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-6">
          <SidebarItem icon={<UserIcon />} label="Profile" />
          <SidebarItem icon={<CalendarIcon />} label="Appointments" />
          <SidebarItem icon={<CreditCardIcon />} label="Medical Bills" />
          <SidebarItem icon={<FileIcon />} label="Medical Records" active />
          <SidebarItem icon={<PillIcon />} label="Medications" />
          <SidebarItem icon={<SettingsIcon />} label="Settings" />
        </nav>
        <div className="p-4 mt-auto border-t">
          <SidebarItem icon={<LogOutIcon />} label="Log Out" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="w-80">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search downloadable records..."
                className="pl-3 pr-10 py-2 w-full rounded-md border"
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
          </div>

          <div className="text-gray-600">10:50 AM today, 05/28/2020</div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-orange-400 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-teal-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter by</span>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-sm text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Note Type</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">Last Updated</th>
                    <th className="px-4 py-3">Last Updated by</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <MedicalRecordRow
                    date="03/20/2020"
                    name="Prolactin"
                    noteType="History and Physical"
                    author="Dr. Branch"
                    lastUpdated="04/28/2020"
                    updatedBy="Stephanie Branch"
                    fileType="pdf"
                  />
                  <MedicalRecordRow
                    date="03/29/2020"
                    name="Bilirubin, total"
                    noteType="Cardiology consultation"
                    author="Dr. Branch"
                    lastUpdated="04/29/2020"
                    updatedBy="Stephanie Branch"
                    fileType="png"
                  />
                  <MedicalRecordRow
                    date="04/20/2020"
                    name="DHEA-sulphate"
                    noteType="History and Physical"
                    author="Dr. Sullivan"
                    lastUpdated="05/03/2020"
                    updatedBy="Jimmy Sullivan"
                    fileType="pdf"
                  />
                  <MedicalRecordRow
                    date="05/10/2020"
                    name="Free Urinary Cortisol"
                    noteType="History and Physical"
                    author="Dr. Melzer"
                    lastUpdated="05/27/2020"
                    updatedBy="Melissa Melzer"
                    fileType="pdf"
                  />
                  <MedicalRecordRow
                    date="05/15/2020"
                    name="Alcohol"
                    noteType="History and Physical"
                    author="Dr. Branch"
                    lastUpdated="05/28/2020"
                    updatedBy="Stephanie Branch"
                    fileType="png"
                  />
                  <MedicalRecordRow
                    date="05/20/2020"
                    name="Globuline"
                    noteType="Cardiology consultation"
                    author="Dr. Velaskez"
                    lastUpdated="05/28/2020"
                    updatedBy="Cris Velaskez"
                    fileType="pdf"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function MedicalRecordRow({
  date,
  name,
  noteType,
  author,
  lastUpdated,
  updatedBy,
  fileType,
}: {
  date: string
  name: string
  noteType: string
  author: string
  lastUpdated: string
  updatedBy: string
  fileType: "pdf" | "png"
}) {
  const handleDownload = () => {
    // Create a dummy file for download based on the file type
    if (fileType === "pdf") {
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
        (Medical Record: ${name}) Tj
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
      a.download = `${name.replace(/\s+/g, "_")}_${date.replace(/\//g, "-")}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else if (fileType === "png") {
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
        ctx.fillStyle = "#4ade80"
        ctx.fillRect(0, 0, canvas.width, 80)

        // Add text
        ctx.fillStyle = "#000000"
        ctx.font = "24px Arial"
        ctx.fillText(`Medical Record: ${name}`, 50, 150)
        ctx.font = "18px Arial"
        ctx.fillText(`Date: ${date}`, 50, 200)
        ctx.fillText(`Author: ${author}`, 50, 240)
        ctx.fillText(`Note Type: ${noteType}`, 50, 280)

        // Convert to data URL and download
        const dataUrl = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = dataUrl
        a.download = `${name.replace(/\s+/g, "_")}_${date.replace(/\//g, "-")}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{date}</td>
      <td className="px-4 py-3 text-sm font-medium">{name}</td>
      <td className="px-4 py-3 text-sm">{noteType}</td>
      <td className="px-4 py-3 text-sm">{author}</td>
      <td className="px-4 py-3 text-sm">{lastUpdated}</td>
      <td className="px-4 py-3 text-sm">{updatedBy}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            <span className="sr-only">
              Download {name} as {fileType.toUpperCase()}
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print {name}</span>
          </Button>
        </div>
      </td>
    </tr>
  )
}

// Custom icons for the sidebar
function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  )
}

function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
}

function PillIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7.5"></path>
      <path d="M12.5 11.5l4 4"></path>
      <path d="M16.5 15.5l4 4"></path>
      <path d="M18.5 13.5l-4-4"></path>
      <path d="M14.5 17.5l-4-4"></path>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  )
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "text-teal-500 bg-teal-50 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className={active ? "text-teal-500" : "text-gray-500"}>{icon}</span>
      {label}
    </Link>
  )
}
