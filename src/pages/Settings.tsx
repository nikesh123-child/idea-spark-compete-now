
import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const [emailNotifications, setEmailNotifications] = useState(true);
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                General application settings.
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
              <Button onClick={() => handleSaveChanges('general')}>Save</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
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
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => handleSaveChanges('notification')}>Save</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API</CardTitle>
              <CardDescription>
                Manage your API keys for integrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" placeholder="Your API Key" value={apiKey} readOnly />
                <p className="text-sm text-muted-foreground">Use this key to integrate with other services.</p>
              </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
              <Button variant="secondary" onClick={handleGenerateKey}>Generate New Key</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
