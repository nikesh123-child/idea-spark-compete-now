
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { getAuditLogs, AuditLog } from '@/utils/auditLogger';

export default function SecurityDashboard() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    setAuditLogs(getAuditLogs());
  }, []);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'login_success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'login_failure':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'security_violation':
      case 'rate_limit_exceeded':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventBadgeVariant = (eventType: string) => {
    switch (eventType) {
      case 'login_success':
        return 'default';
      case 'login_failure':
      case 'security_violation':
      case 'rate_limit_exceeded':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const recentFailures = auditLogs.filter(log => 
    log.event_type === 'login_failure' || 
    log.event_type === 'security_violation' ||
    log.event_type === 'rate_limit_exceeded'
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
          <CardDescription>
            Monitor security events and authentication activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {auditLogs.filter(log => log.event_type === 'login_success').length}
              </div>
              <div className="text-sm text-muted-foreground">Successful Logins</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.event_type === 'login_failure').length}
              </div>
              <div className="text-sm text-muted-foreground">Failed Attempts</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {auditLogs.filter(log => log.event_type === 'security_violation').length}
              </div>
              <div className="text-sm text-muted-foreground">Security Violations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {recentFailures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Recent Security Events
            </CardTitle>
            <CardDescription>
              Latest authentication failures and security violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentFailures.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getEventIcon(log.event_type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getEventBadgeVariant(log.event_type)}>
                        {log.event_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      {log.details?.email && (
                        <span className="font-medium">Email: {log.details.email}</span>
                      )}
                      {log.details?.error && (
                        <div className="text-red-600 mt-1">Error: {log.details.error}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Features Active:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>✓ Rate limiting (5 attempts per 15 minutes)</li>
            <li>✓ CSRF protection</li>
            <li>✓ Input sanitization</li>
            <li>✓ Audit logging</li>
            <li>✓ Strong password requirements</li>
            <li>✓ Secure headers</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
