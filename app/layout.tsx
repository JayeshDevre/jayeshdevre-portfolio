import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayesh Devre — Backend Engineer & Systems Architect",
  description:
    "Portfolio of Jayesh Devre — Backend Engineer specializing in thread management, distributed systems, and cloud architecture. Former Amazon SDE Intern with 2+ years of experience.",
  keywords: [
    "Jayesh Devre",
    "Backend Engineer",
    "Systems Architect",
    "Software Engineer",
    "Amazon",
    "Thread Management",
    "Distributed Systems",
    "Java",
    "Spring Boot",
    "AWS",
  ],
  authors: [{ name: "Jayesh Devre" }],
  openGraph: {
    title: "Jayesh Devre — Backend Engineer & Systems Architect",
    description:
      "Building reliable, distributed systems. From thread management to cloud architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
