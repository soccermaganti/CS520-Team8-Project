"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

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

  const [activeVerticalTab, setActiveVerticalTab] = useState("demographics");
  const [activeHorizontalTab, setActiveHorizontalTab] = useState("vitals");

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
            <NavItem href="/dashboard/doctor/patients" icon={<Users />} active>
              Patients
            </NavItem>
            <NavItem href="/dashboard/doctor/records" icon={<FileText />}>
              Records
            </NavItem>
            <NavItem
              href="/dashboard/doctor/prescriptions"
              icon={<Clipboard />}
            >
              Prescriptions
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
            <Input placeholder="Search..." className="pl-10" />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          <div className="text-gray-600">{currentDate}</div>
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
          <h1 className="text-2xl font-bold mb-6">Data Entry Screen</h1>

          <div className="flex">
            {/* Vertical Tabs */}
            <div className="w-48 mr-6">
              <Card>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    {[
                      { id: "demographics", label: "Demographics" },
                      { id: "living", label: "Living/Arrival" },
                      { id: "supportive", label: "Supportive" },
                      { id: "summary", label: "Summary" },
                      { id: "problem", label: "Problem" },
                      { id: "recovery", label: "Recovery/Military" },
                      { id: "respiratory", label: "Respiratory" },
                      { id: "cardiovascular", label: "Cardiovascular" },
                      { id: "gi", label: "GI/GU" },
                      { id: "endocrine", label: "Endocrine" },
                      { id: "neuro", label: "Neuro/Psych" },
                      { id: "musculoskeletal", label: "Musculoskeletal" },
                      { id: "adl", label: "ADL/IADLs" },
                      { id: "nutrition", label: "Nutrition" },
                      { id: "medications", label: "Medications" },
                      { id: "equipment", label: "Equipment" },
                      { id: "care", label: "Care Planning" },
                      { id: "therapy", label: "Therapy Need" },
                      { id: "discharge", label: "Discharge" },
                      { id: "death", label: "Death/Psych" },
                      { id: "narrative", label: "Narrative" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={`text-left px-4 py-2 text-sm border-b border-gray-200 ${
                          activeVerticalTab === tab.id
                            ? "bg-teal-50 text-teal-600 font-medium border-l-4 border-l-teal-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setActiveVerticalTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Primary</h2>

                    {/* Horizontal Tabs */}
                    <Tabs
                      defaultValue="vitals"
                      className="w-full"
                      onValueChange={setActiveHorizontalTab}
                    >
                      <TabsList className="grid grid-cols-6 w-full">
                        <TabsTrigger value="vitals">Vitals</TabsTrigger>
                        <TabsTrigger value="dent">DENT</TabsTrigger>
                        <TabsTrigger value="pain">Pain</TabsTrigger>
                        <TabsTrigger value="m1200">M1200-1220</TabsTrigger>
                        <TabsTrigger value="m1230">M1230</TabsTrigger>
                        <TabsTrigger value="m1240">M1240-M1242</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Patient Info */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Patient Name
                      </Label>
                      <div className="flex mt-1">
                        <Input
                          className="w-64 mr-2"
                          placeholder="Patient name"
                        />
                        <Button variant="outline" className="mr-2">
                          Docs
                        </Button>
                        <Button variant="outline">Risks</Button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">Save</Button>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="outline">Exit</Button>
                    </div>
                  </div>

                  {/* Vitals Form */}
                  {activeHorizontalTab === "vitals" && (
                    <div className="space-y-6">
                      {/* Pulse & Apical */}
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Pulse</Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="regular"
                                      id="pulse-regular"
                                    />
                                    <Label htmlFor="pulse-regular">
                                      Regular
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="irregular"
                                      id="pulse-irregular"
                                    />
                                    <Label htmlFor="pulse-irregular">
                                      Irregular
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="not-answered"
                                      id="pulse-not-answered"
                                    />
                                    <Label htmlFor="pulse-not-answered">
                                      Not Answered
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                          <Input placeholder="Enter pulse rate" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                              Apical
                            </Label>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="regular"
                                      id="apical-regular"
                                    />
                                    <Label htmlFor="apical-regular">
                                      Regular
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="irregular"
                                      id="apical-irregular"
                                    />
                                    <Label htmlFor="apical-irregular">
                                      Irregular
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="regular">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="not-answered"
                                      id="apical-not-answered"
                                    />
                                    <Label htmlFor="apical-not-answered">
                                      Not Answered
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                          <Input placeholder="Enter apical rate" />
                        </div>
                      </div>

                      {/* Blood Pressure */}
                      <div>
                        <Label className="text-sm font-medium">
                          Blood Pressure
                        </Label>
                        <div className="grid grid-cols-2 gap-8 mt-2">
                          <div>
                            <Label className="text-xs text-gray-500">
                              Left
                            </Label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <Input placeholder="Systolic" />
                              <Input placeholder="Diastolic" />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">
                              Right
                            </Label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <Input placeholder="Systolic" />
                              <Input placeholder="Diastolic" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Height & Weight */}
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <Label className="text-sm font-medium">Height</Label>
                          <Input className="mt-1" placeholder="Enter height" />
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Weight</Label>
                          <div className="flex items-center mt-1">
                            <Input
                              placeholder="Enter weight"
                              className="mr-4"
                            />
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="actual">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="actual"
                                      id="weight-actual"
                                    />
                                    <Label htmlFor="weight-actual">
                                      Actual
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroup defaultValue="actual">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="stated"
                                      id="weight-stated"
                                    />
                                    <Label htmlFor="weight-stated">
                                      Stated
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Temperature */}
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Temperature
                          </Label>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="oral">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="oral" id="temp-oral" />
                                  <Label htmlFor="temp-oral">Oral</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="oral">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="rectal"
                                    id="temp-rectal"
                                  />
                                  <Label htmlFor="temp-rectal">Rectal</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="oral">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="axillary"
                                    id="temp-axillary"
                                  />
                                  <Label htmlFor="temp-axillary">
                                    Axillary
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="oral">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="tympanic"
                                    id="temp-tympanic"
                                  />
                                  <Label htmlFor="temp-tympanic">
                                    Tympanic
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="oral">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="not-answered"
                                    id="temp-not-answered"
                                  />
                                  <Label htmlFor="temp-not-answered">
                                    Not Answered
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <Input
                            placeholder="Enter temperature"
                            className="mr-4"
                          />
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notify-temp" />
                            <Label htmlFor="notify-temp" className="text-sm">
                              Notify Physician of Temperature Range of
                            </Label>
                            <Input className="w-16" />
                          </div>
                        </div>
                      </div>

                      {/* Respiratory & Oxygen */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Respiratory
                          </Label>
                          <Input
                            className="mt-1"
                            placeholder="Enter respiratory rate"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Oxygen</Label>
                          <Input
                            className="mt-1"
                            placeholder="Enter oxygen level"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            O2 Saturation
                          </Label>
                          <Input
                            className="mt-1"
                            placeholder="Enter O2 saturation"
                          />
                        </div>
                      </div>

                      {/* Blood Sugar */}
                      <div>
                        <Label className="text-sm font-medium">
                          Blood Sugar Glucometer
                        </Label>
                        <Input
                          className="mt-1"
                          placeholder="Enter blood sugar level"
                        />
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="infection" />
                          <Label htmlFor="infection" className="text-sm">
                            Patient Developed an infection since last visit.
                            Explain:
                          </Label>
                        </div>
                        <Input placeholder="Explain infection details" />

                        <div className="flex items-center space-x-2">
                          <Checkbox id="fall" />
                          <Label htmlFor="fall" className="text-sm">
                            Patient has had a fall since last visit (describe
                            injury if any)
                          </Label>
                        </div>
                        <Input placeholder="Describe fall details" />

                        <div className="flex items-center space-x-2">
                          <Checkbox id="medical-attention" />
                          <Label
                            htmlFor="medical-attention"
                            className="text-sm"
                          >
                            Medical attention was required for fall (describe
                            medical attention sought for injury)
                          </Label>
                        </div>
                        <Input placeholder="Describe medical attention details" />
                      </div>

                      {/* Notes */}
                      <div>
                        <Label className="text-sm font-medium">Notes</Label>
                        <textarea
                          className="w-full h-32 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter additional notes here"
                        />
                      </div>
                    </div>
                  )}
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
