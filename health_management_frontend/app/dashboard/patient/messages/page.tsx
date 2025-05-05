"use client";

import { useState } from "react";
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
  Send,
  Plus,
} from "lucide-react";
import { Button } from "@/health_management_be/frontend/health_management_frontend/components/ui/button";
import { Input } from "@/health_management_be/frontend/health_management_frontend/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/health_management_be/frontend/health_management_frontend/components/ui/avatar";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageInput, setMessageInput] = useState("");

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Dr. USER2",
      role: "Cardiologist",
      lastMessage: "How are you feeling today?",
      time: "10:30 AM",
      unread: true,
      messages: [
        {
          sender: "doctor",
          content: "Hello USER1, how are you feeling today?",
          time: "10:25 AM",
        },
        {
          sender: "patient",
          content: "I'm feeling much better, thank you.",
          time: "10:28 AM",
        },
        {
          sender: "doctor",
          content:
            "That's great to hear! Have you been taking your medications regularly?",
          time: "10:30 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Dr. USER3",
      role: "Neurologist",
      lastMessage: "Your test results look good",
      time: "Yesterday",
      unread: false,
      messages: [
        {
          sender: "doctor",
          content: "I've reviewed your latest test results.",
          time: "Yesterday",
        },
        {
          sender: "doctor",
          content: "Everything looks good, no concerns at this time.",
          time: "Yesterday",
        },
        {
          sender: "patient",
          content: "That's a relief. Thank you doctor.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 3,
      name: "Dr. USER4",
      role: "Dermatologist",
      lastMessage: "Remember to apply the cream twice daily",
      time: "May 15",
      unread: false,
      messages: [
        {
          sender: "doctor",
          content: "Remember to apply the prescribed cream twice daily.",
          time: "May 15",
        },
        {
          sender: "patient",
          content: "I will. Should I continue if the rash improves?",
          time: "May 15",
        },
        {
          sender: "doctor",
          content: "Yes, please continue for the full 2 weeks as prescribed.",
          time: "May 15",
        },
      ],
    },
    {
      id: 4,
      name: "Nurse USER5",
      role: "Primary Care",
      lastMessage: "Your appointment is confirmed",
      time: "May 10",
      unread: false,
      messages: [
        {
          sender: "nurse",
          content: "Your appointment for next Tuesday at 2:30 PM is confirmed.",
          time: "May 10",
        },
        {
          sender: "patient",
          content: "Thank you. Should I bring anything specific?",
          time: "May 10",
        },
        {
          sender: "nurse",
          content:
            "Just your insurance card and a list of current medications.",
          time: "May 10",
        },
      ],
    },
    {
      id: 5,
      name: "Lab Results",
      role: "Automated",
      lastMessage: "Your lab results are ready",
      time: "May 5",
      unread: false,
      messages: [
        {
          sender: "system",
          content: "Your lab results from May 3rd are now available.",
          time: "May 5",
        },
        {
          sender: "system",
          content:
            "Please log in to the patient portal to view them or discuss with your doctor at your next appointment.",
          time: "May 5",
        },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    // In a real app, you would send this message to the backend
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

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
          <div className="px-6 py-4 flex items-center">
            <Link href="/dashboard/patient" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Conversations sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Conversations</h3>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === index ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(index)}
                >
                  <div className="flex items-start">
                    <Avatar className="mr-3">
                      <AvatarFallback>
                        {conversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium truncate">
                          {conversation.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-500">
                        {conversation.role}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-teal-500 rounded-full ml-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom buttons */}
            <div className="p-3 border-t border-gray-200 flex space-x-2">
              <Button variant="outline" className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button variant="outline" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                New Convo
              </Button>
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Selected conversation header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center">
              <Avatar className="mr-3">
                <AvatarFallback>
                  {conversations[selectedConversation].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">
                  {conversations[selectedConversation].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {conversations[selectedConversation].role}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {conversations[selectedConversation].messages.map(
                (message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === "patient"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender !== "patient" && (
                      <Avatar className="mr-3 mt-1">
                        <AvatarFallback>
                          {conversations[selectedConversation].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "patient"
                          ? "bg-teal-500 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "patient"
                            ? "text-teal-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                    {message.sender === "patient" && (
                      <Avatar className="ml-3 mt-1">
                        <AvatarFallback>U1</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Message input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 mr-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="ml-2">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </main>
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
