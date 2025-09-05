import { AdminNotifications } from "@/components/admin/admin-notifications"

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Manage your notification preferences and view recent system alerts.</p>
      </div>
      <AdminNotifications />
    </div>
  )
}
