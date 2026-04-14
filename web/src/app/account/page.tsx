"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { 
  Sparkles, User, BookOpen, Crown, Calendar, 
  Settings, LogOut, Play, CheckCircle, Clock,
  ChevronRight, Star, MessageCircle, Users
} from "lucide-react";

const stats = [
  { label: "Current Level", value: "Medium", icon: Crown, color: "text-purple-400" },
  { label: "Courses Completed", value: "4", icon: BookOpen, color: "text-amber-400" },
  { label: "Hours Practiced", value: "127", icon: Clock, color: "text-blue-400" },
  { label: "Community Rank", value: "Top 15%", icon: Users, color: "text-green-400" }
];

const courses = [
  {
    id: "meditation-101",
    title: "Meditation Fundamentals",
    progress: 100,
    status: "completed",
    nextLesson: null
  },
  {
    id: "intuition-101",
    title: "Developing Intuition",
    progress: 75,
    status: "in-progress",
    nextLesson: "Trusting Your Gut"
  },
  {
    id: "energy-basics",
    title: "Energy Healing Basics",
    progress: 30,
    status: "in-progress",
    nextLesson: "Understanding Chakras"
  },
  {
    id: "mediumship-101",
    title: "Introduction to Mediumship",
    progress: 0,
    status: "locked",
    nextLesson: null
  }
];

const upcomingEvents = [
  {
    title: "Monthly Healing Circle",
    date: "March 15, 2026",
    time: "7:00 PM EST"
  },
  {
    title: "Live Q&A Session",
    date: "March 18, 2026",
    time: "2:00 PM EST"
  },
  {
    title: "Cohort Call",
    date: "March 22, 2026",
    time: "6:00 PM EST"
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0612] via-[#120d1f] to-[#0a0612]">
      <Header />
      
      <div className="container mx-auto px-4 pt-[72px] md:pt-[80px] pb-12 max-w-7xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John</h1>
          <p className="text-white/60">Continue your spiritual journey</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">John Doe</h3>
                  <p className="text-[#8b5cf6] text-sm">Medium Member</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "dashboard" 
                      ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                      : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "courses" 
                      ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                      : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <Play className="w-5 h-5" />
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "events" 
                      ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                      : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Events
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "settings" 
                      ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                      : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <hr className="border-white/10 my-2" />
                <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Membership Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30">
              <div className="flex items-center gap-4 mb-4">
                <Crown className="w-6 h-6 text-purple-400" />
                <h3 className="text-white font-semibold">Medium Membership</h3>
              </div>
              <p className="text-white/60 text-sm mb-4">Your next billing date is April 1, 2026</p>
              <Link 
                href="/membership"
                className="text-[#8b5cf6] text-sm hover:text-[#a78bfa] flex items-center gap-1"
              >
                Upgrade plan <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                      <p className="text-white/60 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Continue Learning */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                    <Link href="/account/courses" className="text-[#8b5cf6] text-sm hover:text-[#a78bfa]">
                      View all
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {courses.filter(c => c.status === "in-progress").map((course) => (
                      <div key={course.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-[#8b5cf6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{course.title}</h3>
                          <p className="text-white/50 text-sm">Next: {course.nextLesson}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[#8b5cf6] font-bold">{course.progress}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
                    <Link href="/account/events" className="text-[#8b5cf6] text-sm hover:text-[#a78bfa]">
                      View all
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {upcomingEvents.map((event, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#d4af37]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{event.title}</h3>
                          <p className="text-white/50 text-sm">{event.date} at {event.time}</p>
                        </div>
                        <button className="px-4 py-2 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] text-sm font-medium hover:bg-[#8b5cf6]/30 transition-all">
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "courses" && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{course.title}</h3>
                          <p className="text-white/50 text-sm">
                            {course.status === "completed" && "Completed"}
                            {course.status === "in-progress" && `In Progress - ${course.progress}%`}
                            {course.status === "locked" && "Locked"}
                          </p>
                        </div>
                        {course.status === "completed" && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                        {course.status === "in-progress" && (
                          <Play className="w-6 h-6 text-[#8b5cf6]" />
                        )}
                      </div>
                      
                      {course.status !== "locked" && (
                        <>
                          <div className="h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <Link 
                            href={`/account/courses/${course.id}`}
                            className="inline-flex items-center gap-2 text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
                          >
                            {course.status === "completed" ? "Review Course" : "Continue Learning"}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-semibold mb-4">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">First Name</label>
                        <input 
                          type="text" 
                          defaultValue="John"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue="Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-semibold mb-4">Email Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-4 text-white/70">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        Receive course updates
                      </label>
                      <label className="flex items-center gap-4 text-white/70">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        Event notifications
                      </label>
                      <label className="flex items-center gap-4 text-white/70">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        Marketing emails
                      </label>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold rounded-full">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2024 ALIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
