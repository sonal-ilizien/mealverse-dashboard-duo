
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Platform Name</Label>
                <Input id="site-name" defaultValue="HomeCooks Platform" />
                <p className="text-sm text-muted-foreground">
                  The name displayed throughout the platform
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Support Email</Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  defaultValue="support@homecooks.example.com" 
                />
                <p className="text-sm text-muted-foreground">
                  Email displayed for support inquiries
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <select 
                    id="timezone" 
                    className="w-full p-2 rounded-md border"
                    defaultValue="UTC-5"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC">Universal Time (UTC)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <select 
                    id="currency" 
                    className="w-full p-2 rounded-md border"
                    defaultValue="USD"
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select>
                </div>
              </div>
              
              <Button className="mt-4">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for important events
                  </p>
                </div>
                <Switch defaultChecked id="email-notifications" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">System Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about system performance and issues
                  </p>
                </div>
                <Switch defaultChecked id="system-alerts" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New User Registrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new users register
                  </p>
                </div>
                <Switch id="new-users" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Cook Applications</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new cook applications are submitted
                  </p>
                </div>
                <Switch defaultChecked id="new-cooks" />
              </div>
              
              <Button className="mt-4">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable two-factor authentication for enhanced security
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              
              <Button className="mt-4">Update Security Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">API Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-key" 
                    readOnly 
                    value="sk_live_51HGj00IEq42335U1gDgWCHxx12345678abcdefghijk" 
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your API key for integrating with third-party services
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable API Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow external services to connect via API
                  </p>
                </div>
                <Switch defaultChecked id="api-access" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Rate Limiting</h3>
                  <p className="text-sm text-muted-foreground">
                    Limit API requests to prevent abuse
                  </p>
                </div>
                <Switch defaultChecked id="rate-limiting" />
              </div>
              
              <Button className="mt-4">Save API Settings</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
