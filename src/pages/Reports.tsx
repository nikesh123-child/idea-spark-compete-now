
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Mail } from "lucide-react";
import { findings, Severity } from "@/data/findings";
import { Button } from "@/components/ui/button";

const openFindings = findings.filter(f => f.status === 'Open');
const findingsBySeverity = openFindings.reduce((acc, finding) => {
  acc[finding.severity] = (acc[finding.severity] || 0) + 1;
  return acc;
}, {} as Record<Severity, number>);

export default function Reports() {
  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const subject = "Security Findings Report";
    const body = `
Hello,

Please find the security report summary below:

Summary of Open Findings:
- Critical: ${findingsBySeverity.Critical || 0}
- High: ${findingsBySeverity.High || 0}
- Medium: ${findingsBySeverity.Medium || 0}

Open Findings Details:
${openFindings.map(f => `- ${f.vulnerability} (ID: ${f.id}, Severity: ${f.severity})`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-start print:hidden">
        <SidebarTrigger className="sm:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground hidden md:block">
            Generate and view security reports.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <div className="p-8 print:p-0" id="report-content">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Security Findings Report</h1>
            <p className="text-muted-foreground">Generated on: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Overview of open security findings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Card>
                  <CardHeader>
                    <CardTitle>{findingsBySeverity.Critical || 0}</CardTitle>
                    <CardDescription>Critical</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{findingsBySeverity.High || 0}</CardTitle>
                    <CardDescription>High</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{findingsBySeverity.Medium || 0}</CardTitle>
                    <CardDescription>Medium</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Findings Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {openFindings.map((finding) => (
                  <Card key={finding.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{finding.vulnerability}</CardTitle>
                      <CardDescription>ID: {finding.id} | Severity: {finding.severity}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #report-content, #report-content * {
                visibility: visible;
              }
              #report-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
            }
          `}
        </style>
      </main>
    </>
  );
}
