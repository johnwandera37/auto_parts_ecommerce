"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Clock,
  Settings,
  Edit3,
  Camera,
} from "lucide-react";

interface AdminProfileProps {
  showEditButton?: boolean;
  compact?: boolean;
  user: User;
}

export function AdminProfile({
  showEditButton = true,
  compact = false,
  user,
}: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Mock admin data - in real app this would come from props or API
  const adminData = {
    name: "Admin User",
    email: "admin@deutschepoint.de",
    phone: "+49 30 12345678",
    role: "Super Administrator",
    department: "Operations",
    location: "Berlin, Germany",
    joinDate: "January 2023",
    lastLogin: "2 hours ago",
    avatar: "/admin-profile.png",
    permissions: [
      "Full System Access",
      "User Management",
      "Financial Reports",
      "System Settings",
    ],
    stats: {
      ordersManaged: 1250,
      customersHelped: 890,
      productsAdded: 340,
      reportsGenerated: 45,
    },
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={adminData.avatar || "/placeholder.svg"}
            alt={adminData.name}
          />
          <AvatarFallback className="bg-red-100 text-red-600">
            {adminData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {adminData.name}
          </p>
          <p className="text-xs text-gray-500 truncate">{adminData.role}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Online
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={adminData.avatar || "/placeholder.svg"}
                  alt={adminData.name}
                />
                <AvatarFallback className="bg-red-100 text-red-600 text-xl">
                  {adminData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {" "}
                    {`${user?.firstName ?? "Admin"} ${
                      user?.lastName ?? "User"
                    }`.trim()}
                  </h2>
                  <p className="text-gray-600">{user.role}</p>
                </div>
                {showEditButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-2 sm:mt-0"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="bg-red-600">
                  <Shield className="mr-1 h-3 w-3" />
                  {adminData.role}
                </Badge>
                <Badge variant="outline">{adminData.department}</Badge>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600">{adminData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{adminData.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-gray-600">{adminData.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Last Login</p>
                <p className="text-sm text-gray-600">{adminData.lastLogin}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-gray-600">{adminData.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions & Access</CardTitle>
          <CardDescription>
            Current administrative permissions and system access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {adminData.permissions.map((permission, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm">{permission}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>
            Your administrative activity and contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {adminData.stats.ordersManaged}
              </div>
              <div className="text-sm text-gray-600">Orders Managed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {adminData.stats.customersHelped}
              </div>
              <div className="text-sm text-gray-600">Customers Helped</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {adminData.stats.productsAdded}
              </div>
              <div className="text-sm text-gray-600">Products Added</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {adminData.stats.reportsGenerated}
              </div>
              <div className="text-sm text-gray-600">Reports Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
