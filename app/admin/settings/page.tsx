import { AdminNav } from "@/components/admin/admin-nav"
import { AdminSettingsForm } from "@/components/admin/admin-settings-form"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Manage your admin profile, security settings, and system preferences.</p>
        </div>
        <AdminSettingsForm />
      </div>
    </div>
  )
}
