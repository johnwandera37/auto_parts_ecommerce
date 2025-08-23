"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountSettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to update user settings
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess("Your account settings have been updated successfully.")
    } catch (err) {
      setError("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList className="w-full justify-start border-b bg-transparent p-0">
        <TabsTrigger
          value="personal"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Personal Information
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Preferences
        </TabsTrigger>
        <TabsTrigger
          value="delete"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Delete Account
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="personal-form" onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <Alert className="bg-green-50 text-green-600">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-600">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+49 123 456789" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="Germany" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Berlin" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="Berliner Straße 123" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" defaultValue="10115" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="Berlin" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="personal-form" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
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

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="password-form" onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <Alert className="bg-green-50 text-green-600">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-600">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" required />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters and include uppercase, numbers, and special characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="password-form" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Update Password
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
            <CardDescription>Manage your email notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="preferences-form" onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <Alert className="bg-green-50 text-green-600">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-600">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="order-updates" defaultChecked className="mt-1" />
                  <Label htmlFor="order-updates" className="text-sm font-normal">
                    Order updates and shipping notifications
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="promotions" defaultChecked className="mt-1" />
                  <Label htmlFor="promotions" className="text-sm font-normal">
                    Promotions, discounts, and special offers
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="new-products" defaultChecked className="mt-1" />
                  <Label htmlFor="new-products" className="text-sm font-normal">
                    New product announcements and updates
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="newsletters" className="mt-1" />
                  <Label htmlFor="newsletters" className="text-sm font-normal">
                    Monthly newsletters and automotive tips
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="surveys" className="mt-1" />
                  <Label htmlFor="surveys" className="text-sm font-normal">
                    Surveys and feedback requests
                  </Label>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-medium">Communication Frequency</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="frequency-weekly"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <Label htmlFor="frequency-weekly" className="text-sm font-normal">
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="frequency-biweekly"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                      defaultChecked
                    />
                    <Label htmlFor="frequency-biweekly" className="text-sm font-normal">
                      Bi-weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="frequency-monthly"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <Label htmlFor="frequency-monthly" className="text-sm font-normal">
                      Monthly
                    </Label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" form="preferences-form" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
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

      <TabsContent value="delete">
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data. This action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive" className="bg-red-50 text-red-600">
              <AlertDescription>
                Warning: Deleting your account will remove all your personal information, order history, saved vehicles,
                and other data from our system. This action is permanent and cannot be reversed.
              </AlertDescription>
            </Alert>

            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <h3 className="font-medium text-red-800">Before you delete your account:</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-red-700">
                <li>Download any order invoices or receipts you may need for your records</li>
                <li>Complete any pending orders or returns</li>
                <li>Save any vehicle information you want to keep</li>
              </ul>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="confirm-delete" className="mt-1" />
              <Label htmlFor="confirm-delete" className="text-sm font-normal">
                I understand that deleting my account is permanent and cannot be undone
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
