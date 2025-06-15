
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, DatabaseZap } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-start">
            <SidebarTrigger className="sm:hidden" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground hidden md:block">
                Prioritized risks based on data sensitivity and exposure.
              </p>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
            <Card className="border-red-500 border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ShieldAlert className="h-6 w-6 text-red-500" />
                      Publicly Accessible Database with PII
                    </CardTitle>
                    <CardDescription className="mt-1">
                      A critical combination of infrastructure exposure and sensitive data has been found.
                    </CardDescription>
                  </div>
                  <Badge variant="destructive" className="text-sm">CRITICAL</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <DatabaseZap className="h-4 w-4" />
                  <AlertTitle>Finding Details</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2 mt-2">
                      <p><strong>Resource:</strong> `db-customers-02`</p>
                      <p><strong>Vulnerability:</strong> The database is exposed to the public internet (0.0.0.0/0).</p>
                      <p>
                        <strong>Data Classification:</strong> Our AI has identified highly sensitive
                        <Badge variant="secondary" className="mx-1.5 py-0.5 px-1.5">PII (Customer Credentials)</Badge>
                        within this database.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="font-semibold mb-2">AI-Generated Remediation Steps</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
                    <li>Navigate to your cloud provider's console for the database service.</li>
                    <li>Select the `db-customers-02` instance.</li>
                    <li>In the network/security settings, remove the inbound rule that allows access from `0.0.0.0/0`.</li>
                    <li>Restrict access to only trusted IP addresses, such as your application's servers.</li>
                    <li>Save and apply the changes. Verify that the database is no longer publicly accessible.</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
