"use client";

import { AdminNav } from "@/components/admin/admin-nav";
import { AdminSettingsForm } from "@/components/admin/admin-settings-form";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";

export default function AdminSettingsPage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">
            Manage your admin profile, security settings, and system
            preferences.
          </p>
        </div>
        <AdminSettingsForm />
      </div>
    </div>
  );
}
