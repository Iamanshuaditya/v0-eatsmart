import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col sf-pro">
      <DashboardNav />
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}
