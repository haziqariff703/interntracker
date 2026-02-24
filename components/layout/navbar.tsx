"use client";

import * as React from "react";
import CardNav from "./card-nav";

const items = [
  {
    label: "Platform",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      { label: "Dashboard", href: "/", ariaLabel: "Platform Dashboard" },
      {
        label: "Intelligence",
        href: "/intelligence",
        ariaLabel: "Career Intelligence",
      },
    ],
  },
  {
    label: "Career",
    bgColor: "#fff",
    textColor: "#000",
    links: [
      {
        label: "Applications",
        href: "/applications",
        ariaLabel: "Job Applications",
      },
      {
        label: "Internships",
        href: "/internships",
        ariaLabel: "Internship Postings",
      },
    ],
  },
  {
    label: "Network",
    bgColor: "#000",
    textColor: "#fff",
    links: [
      { label: "Companies", href: "/companies", ariaLabel: "Company Database" },
    ],
  },
];

export function Navbar() {
  return (
    <CardNav
      logo="/assets/trackr_logo.png"
      logoAlt="Trackr Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      className="dark:bg-transparent"
    />
  );
}
