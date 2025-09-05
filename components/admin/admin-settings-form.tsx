"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, Save, Shield, Bell, User, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlert } from "@/hooks/useAlert";

export function AdminSettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setError, setSuccess, AlertUI } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Admin settings have been updated successfully.");
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="w-full justify-start border-b bg-transparent p-0">
        <TabsTrigger
          value="profile"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Lock className="mr-2 h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger
          value="permissions"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Shield className="mr-2 h-4 w-4" />
          Permissions
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Admin Profile</CardTitle>
            <CardDescription>
              Update your admin profile information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="profile-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <AlertUI /> {/* ✅ directly rendered from hook */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-first-name">First Name</Label>
                  <Input id="admin-first-name" defaultValue="Admin" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-last-name">Last Name</Label>
                  <Input id="admin-last-name" defaultValue="User" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@deutschepoint.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-phone">Phone Number</Label>
                <Input
                  id="admin-phone"
                  type="tel"
                  defaultValue="+49 123 456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-role">Admin Role</Label>
                <Select defaultValue="super-admin">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">
                      Super Administrator
                    </SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-department">Department</Label>
                <Select defaultValue="operations">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="customer-service">
                      Customer Service
                    </SelectItem>
                    <SelectItem value="inventory">
                      Inventory Management
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              form="profile-form"
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="security-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <AlertUI /> {/* ✅ directly rendered from hook */}
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" required />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters and include uppercase,
                  numbers, and special characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-start space-x-2">
                  <Checkbox id="enable-2fa" className="mt-1" />
                  <Label htmlFor="enable-2fa" className="text-sm font-normal">
                    Enable two-factor authentication for enhanced security
                  </Label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Session Management</h3>
                <div className="flex items-start space-x-2">
                  <Checkbox id="auto-logout" defaultChecked className="mt-1" />
                  <Label htmlFor="auto-logout" className="text-sm font-normal">
                    Automatically log out after 30 minutes of inactivity
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              form="security-form"
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Update Security
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="permissions">
        <Card>
          <CardHeader>
            <CardTitle>Admin Permissions</CardTitle>
            <CardDescription>
              View and manage your administrative permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 text-blue-600">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your current role: <strong>Super Administrator</strong> - You
                have full access to all system features.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-medium">Current Permissions</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">Manage Products</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">Manage Orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">Manage Customers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">View Analytics</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">Manage Inventory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">System Settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">User Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked disabled />
                    <span className="text-sm">Financial Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Admin Notifications</CardTitle>
            <CardDescription>
              Configure your admin notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="notifications-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <AlertUI /> {/* ✅ directly rendered from hook */}
              <div className="space-y-4">
                <h3 className="font-medium">System Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="new-orders" defaultChecked className="mt-1" />
                    <Label htmlFor="new-orders" className="text-sm font-normal">
                      New order notifications
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="low-inventory"
                      defaultChecked
                      className="mt-1"
                    />
                    <Label
                      htmlFor="low-inventory"
                      className="text-sm font-normal"
                    >
                      Low inventory alerts
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="customer-issues"
                      defaultChecked
                      className="mt-1"
                    />
                    <Label
                      htmlFor="customer-issues"
                      className="text-sm font-normal"
                    >
                      Customer service issues
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="system-updates" className="mt-1" />
                    <Label
                      htmlFor="system-updates"
                      className="text-sm font-normal"
                    >
                      System maintenance and updates
                    </Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Report Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="daily-reports"
                      defaultChecked
                      className="mt-1"
                    />
                    <Label
                      htmlFor="daily-reports"
                      className="text-sm font-normal"
                    >
                      Daily sales reports
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="weekly-analytics"
                      defaultChecked
                      className="mt-1"
                    />
                    <Label
                      htmlFor="weekly-analytics"
                      className="text-sm font-normal"
                    >
                      Weekly analytics summary
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="monthly-reports" className="mt-1" />
                    <Label
                      htmlFor="monthly-reports"
                      className="text-sm font-normal"
                    >
                      Monthly performance reports
                    </Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 font-medium">Notification Delivery</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delivery-email"
                      name="delivery"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                      defaultChecked
                    />
                    <Label
                      htmlFor="delivery-email"
                      className="text-sm font-normal"
                    >
                      Email notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delivery-dashboard"
                      name="delivery"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <Label
                      htmlFor="delivery-dashboard"
                      className="text-sm font-normal"
                    >
                      Dashboard notifications only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="delivery-both"
                      name="delivery"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <Label
                      htmlFor="delivery-both"
                      className="text-sm font-normal"
                    >
                      Both email and dashboard
                    </Label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              form="notifications-form"
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
