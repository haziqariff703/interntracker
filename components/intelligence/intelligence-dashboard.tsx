"use client";

import React from "react";
import {
  Briefcase01Icon,
  DocumentValidationIcon,
  PercentIcon,
  Money01Icon,
  UserGroupIcon,
  Location01Icon,
  Building01Icon,
  Target01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

// Mock Data Aligned to Schema
const mockMetrics = [
  {
    title: "New Postings (30d)",
    value: "245",
    icon: <Briefcase01Icon className="w-6 h-6" />,
    trend: "+12%",
    color: "bg-[#e5e5e5]",
  },
  {
    title: "Applications (30d)",
    value: "18",
    icon: <DocumentValidationIcon className="w-6 h-6" />,
    trend: "+3",
    color: "bg-[#e5e5e5]",
  },
  {
    title: "Interview Rate",
    value: "22.5%",
    icon: <PercentIcon className="w-6 h-6" />,
    trend: "+4.1%",
    color: "bg-[#e5e5e5]",
  },
  {
    title: "Median Stipend",
    value: "RM 1,200",
    icon: <Money01Icon className="w-6 h-6" />,
    trend: "+RM 150",
    color: "bg-[#e5e5e5]",
  },
];

const mockPipeline = [
  {
    status: "Applied",
    count: 18,
    color: "bg-black text-white dark:bg-white dark:text-black",
  },
  {
    status: "Screening",
    count: 12,
    color: "bg-black/80 text-white dark:bg-white/80 dark:text-black",
  },
  {
    status: "Interview",
    count: 4,
    color: "bg-black/60 text-white dark:bg-white/60 dark:text-black",
  },
  {
    status: "Offer",
    count: 2,
    color: "bg-black/40 text-white dark:bg-white/40 dark:text-black",
  },
  {
    status: "Accepted",
    count: 1,
    color: "bg-black/20 text-black dark:bg-white/20 dark:text-white",
  },
  {
    status: "Rejected",
    count: 6,
    color: "bg-red-500/20 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
];

const mockSkills = [
  { name: "React", demand: 85 },
  { name: "Node.js", demand: 78 },
  { name: "TypeScript", demand: 72 },
  { name: "Python", demand: 65 },
  { name: "PostgreSQL", demand: 60 },
  { name: "AWS", demand: 45 },
];

const mockLocations = [
  { city: "Kuala Lumpur", count: 156 },
  { city: "Petaling Jaya", count: 89 },
  { city: "Cyberjaya", count: 64 },
  { city: "Penang", count: 42 },
  { city: "Johor Bahru", count: 28 },
];

const mockCompanyActivity = [
  {
    company: "TechNova Solutions",
    action: "Viewed your profile",
    time: "2h ago",
  },
  { company: "DataSync Inc", action: "Posted 3 new roles", time: "5h ago" },
  {
    company: "CloudScale Systems",
    action: "Downloaded your resume",
    time: "1d ago",
  },
  {
    company: "FinTech Hub",
    action: "Closed applications for Frontend Engineer",
    time: "2d ago",
  },
];

export function IntelligenceDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, i) => (
          <div
            key={i}
            className="border-[3px] border-black dark:border-white bg-white dark:bg-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-start">
              <span className="text-black/60 dark:text-white/60 font-bold uppercase text-xs tracking-wider">
                {metric.title}
              </span>
              <div className="p-2 border-2 border-black dark:border-white rounded-none">
                {metric.icon}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black tracking-tighter">
                {metric.value}
              </span>
              <span className="text-sm font-bold bg-black text-white dark:bg-white dark:text-black px-2 py-1">
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Column (2/3 width on large screens) */}
        <div className="xl:col-span-2 space-y-8">
          {/* 2. Status Pipeline */}
          <section className="border-[3px] border-black dark:border-white bg-white dark:bg-black p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <Target01Icon className="w-8 h-8" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Application Pipeline
              </h2>
            </div>

            <div className="flex flex-col md:flex-row shadow-sm gap-2">
              {mockPipeline.map((stage, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-row md:flex-col items-center justify-between md:justify-center p-4 border-[3px] border-black dark:border-white ${stage.color} relative group`}
                >
                  <span className="font-bold text-sm uppercase tracking-wider md:mb-2">
                    {stage.status}
                  </span>
                  <span className="text-2xl font-black">{stage.count}</span>

                  {/* Connectors for desktop */}
                  {i < mockPipeline.length - 1 && (
                    <div className="hidden md:block absolute -right-3.75 top-1/2 -translate-y-1/2 z-10 text-black dark:text-white">
                      <ArrowRight01Icon className="w-6 h-6 stroke-[3px] drop-shadow-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Company Activity */}
          <section className="border-[3px] border-black dark:border-white bg-[#f4f4f4] dark:bg-[#111] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building01Icon className="w-8 h-8" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Company Activity
              </h2>
            </div>
            <div className="divide-y-2 divide-black/10 dark:divide-white/10">
              {mockCompanyActivity.map((activity, i) => (
                <div
                  key={i}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                >
                  <div>
                    <div className="font-black text-lg group-hover:underline underline-offset-4 decoration-2">
                      {activity.company}
                    </div>
                    <div className="text-black/70 dark:text-white/70 font-semibold">
                      {activity.action}
                    </div>
                  </div>
                  <div className="text-sm font-bold px-3 py-1 border-2 border-black dark:border-white bg-white dark:bg-black inline-flex self-start sm:self-auto">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 border-[3px] border-black dark:border-white font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              View All Activity
            </button>
          </section>
        </div>

        {/* Side Column (1/3 width on large screens) */}
        <div className="space-y-8">
          {/* 4. Top Skills */}
          <section className="border-[3px] border-black dark:border-white bg-white dark:bg-black p-6">
            <div className="flex items-center gap-3 mb-6">
              <UserGroupIcon className="w-6 h-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">
                Top Skills in Demand
              </h3>
            </div>
            <div className="space-y-4">
              {mockSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 font-bold text-sm uppercase">
                    {skill.name}
                  </div>
                  <div className="w-2/3 h-4 border-2 border-black dark:border-white bg-[#f4f4f4] dark:bg-[#222] relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-black dark:bg-white"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                  <div className="w-10 text-right font-black text-sm">
                    {skill.demand}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Hot Locations */}
          <section className="border-[3px] border-black dark:border-white bg-white dark:bg-black p-6">
            <div className="flex items-center gap-3 mb-6">
              <Location01Icon className="w-6 h-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">
                Hot Locations
              </h3>
            </div>
            <div className="space-y-3">
              {mockLocations.map((loc, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-transparent hover:border-black dark:hover:border-white transition-colors cursor-pointer group"
                >
                  <span className="font-bold">{loc.city}</span>
                  <span className="font-black bg-[#f4f4f4] dark:bg-[#222] text-black dark:text-white group-hover:bg-white group-hover:text-black dark:group-hover:bg-black dark:group-hover:text-white px-3 py-1 border-2 border-black dark:border-white">
                    {loc.count} roles
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
