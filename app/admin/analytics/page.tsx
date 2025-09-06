"use client";

import { AdminNav } from "@/components/admin/admin-nav";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";

export default function AdminAnalyticsPage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your store performance, sales trends, and customer insights.
          </p>
        </div>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
