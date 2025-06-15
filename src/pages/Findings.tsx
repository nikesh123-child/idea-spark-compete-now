
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";

const findings: {
  id: string;
  vulnerability: string;
  status: string;
  severity: "Critical" | "High" | "Medium";
}[] = [
  {
    id: "FIN-001",
    vulnerability: "Publicly Accessible Database with PII",
    status: "Open",
    severity: "Critical",
  },
  {
    id: "FIN-002",
    vulnerability: "Outdated SSL/TLS Protocol",
    status: "Open",
    severity: "High",
  },
  {
    id: "FIN-003",
    vulnerability: "SQL Injection",
    status: "Closed",
    severity: "High",
  },
  {
    id: "FIN-004",
    vulnerability: "Cross-Site Scripting (XSS)",
    status: "Open",
    severity: "Medium",
  },
];

const severityVariantMap: {
  Critical: "destructive";
  High: "destructive";
  Medium: "default";
} = {
  Critical: "destructive",
  High: "destructive",
  Medium: "default",
};

export default function Findings() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-start">
        <SidebarTrigger className="sm:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Findings</h1>
          <p className="text-muted-foreground hidden md:block">
            Review and manage all security findings.
          </p>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>All Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vulnerability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findings.map((finding) => (
                  <TableRow key={finding.id}>
                    <TableCell className="font-medium">{finding.id}</TableCell>
                    <TableCell>{finding.vulnerability}</TableCell>
                    <TableCell>{finding.status}</TableCell>
                    <TableCell>
                      <Badge variant={severityVariantMap[finding.severity]}>
                        {finding.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
