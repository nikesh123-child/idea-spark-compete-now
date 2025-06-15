
import { BadgeProps } from "@/components/ui/badge";

export type Asset = {
  id: string;
  name: string;
  type: 'Database' | 'Server' | 'Application' | 'Domain';
  owner: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
};

export const assets: Asset[] = [
  { id: 'ASSET-001', name: 'db-customers-02', type: 'Database', owner: 'Infra Team', risk: 'Critical' },
  { id: 'ASSET-002', name: 'prod-web-server-1', type: 'Server', owner: 'App Team', risk: 'High' },
  { id: 'ASSET-003', name: 'aegis-ai-app', type: 'Application', owner: 'App Team', risk: 'Medium' },
  { id: 'ASSET-004', name: 'marketing-site', type: 'Domain', owner: 'Marketing', risk: 'Low' },
];

export const riskVariantMap: Record<Asset['risk'], BadgeProps['variant']> = {
  Critical: "destructive",
  High: "destructive",
  Medium: "default",
  Low: "secondary",
};
