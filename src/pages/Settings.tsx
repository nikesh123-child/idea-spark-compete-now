
import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityDashboard from "@/components/SecurityDashboard";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKey, setApiKey] = useState("agt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

  const handleGenerateKey = () => {
    const newKey = `agt-${crypto.randomUUID()}`;
    setApiKey(newKey);
    toast.success("API Key Generated", {
      description: "Your new API key has been successfully generated.",
    });
  };

  const handleSaveChanges = (section: string) => {
    toast.success("Settings Saved", {
      description: `Your ${section} settings have been saved.`,
    });
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-start">
        <SidebarTrigger className="sm:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground hidden md:block">
            Manage your account and application settings.
          </p>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  General application preferences and display settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                    <span>Dark Mode</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Enable or disable dark mode.
                    </span>
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => handleSaveChanges('general')}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security features and monitoring.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                      <span>Two-Factor Authentication</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Add an extra layer of security to your account.
                      </span>
                    </Label>
                    <Switch
                      id="two-factor"
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
                      <span>Security Alerts</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Receive alerts about suspicious login attempts.
                      </span>
                    </Label>
                    <Switch
                      id="security-alerts"
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => handleSaveChanges('security')}>Save Security Settings</Button>
                </CardFooter>
              </Card>

              <SecurityDashboard />
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Receive notifications about new findings via email.
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-notifications" className="flex flex-col space-y-1">
                    <span>Security Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Get notified about security events and login attempts.
                    </span>
                  </Label>
                  <Switch
                    id="security-notifications"
                    checked={securityAlerts}
                    onCheckedChange={setSecurityAlerts}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => handleSaveChanges('notification')}>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage your API keys for secure integrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Your API Key" value={apiKey} readOnly />
                  <p className="text-sm text-muted-foreground">
                    Use this key to integrate with other services. Keep it secure and never share it publicly.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 space-x-2">
                <Button variant="secondary" onClick={handleGenerateKey}>
                  Generate New Key
                </Button>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(apiKey)}>
                  Copy Key
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
