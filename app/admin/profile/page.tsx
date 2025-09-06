"use client";

import { AdminNav } from "@/components/admin/admin-nav";
import { AdminProfile } from "@/components/admin/admin-profile";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";

export default function AdminProfilePage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600">
            View and manage your administrative profile information.
          </p>
        </div>
        <AdminProfile user={user} />
      </div>
    </div>
  );
}
