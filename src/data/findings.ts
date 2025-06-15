
import { BadgeProps } from "@/components/ui/badge";

export type Severity = "Critical" | "High" | "Medium";

export interface Finding {
  id: string;
  vulnerability: string;
  status: "Open" | "Closed";
  severity: Severity;
}

export const findings: Finding[] = [
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

export const severityVariantMap: Record<Severity, BadgeProps["variant"]> = {
  Critical: "destructive",
  High: "destructive",
  Medium: "default",
};
