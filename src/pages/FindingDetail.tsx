
import { useParams, Link } from "react-router-dom";
import { findings, severityVariantMap } from "@/data/findings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, History, FileText } from "lucide-react";

export default function FindingDetail() {
  const { findingId } = useParams();
  const finding = findings.find((f) => f.id === findingId);

  if (!finding) {
    return (
      <main className="flex-1 p-4 sm:px-6 sm:py-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg text-muted-foreground">Finding not found.</p>
          <Button asChild className="mt-4">
            <Link to="/findings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Findings
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Button variant="outline" size="icon" asChild className="h-9 w-9">
          <Link to="/findings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Findings</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight truncate md:text-2xl">{finding.vulnerability}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
            <span>ID: {finding.id}</span>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <span>Status: {finding.status}</span>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <span>Severity: <Badge variant={severityVariantMap[finding.severity]} className="ml-1 text-xs">{finding.severity}</Badge></span>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6 pb-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full Description</CardTitle>
                <CardDescription>A detailed explanation of the vulnerability and its potential impact.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The application is vulnerable to {finding.vulnerability}. This type of vulnerability allows an attacker to inject malicious scripts into web pages viewed by other users. This can lead to session hijacking, defacement of the website, or redirection to malicious sites. In this specific case, the vulnerability was found in the search input field, where user-provided data is not properly sanitized before being rendered back to the page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Evidence
                </CardTitle>
                <CardDescription>Specific code snippets, logs, or network requests that demonstrate the issue.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre><code>{`<script>alert("XSS attempt for ${finding.id}")</script>`}</code></pre>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The payload above was injected into the main search bar and executed successfully, demonstrating the flaw.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Remediation History
                </CardTitle>
                <CardDescription>Audit trail of the finding's lifecycle.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-4">
                    <div className="relative">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">1</div>
                      <div className="absolute left-1/2 top-full h-4 w-px bg-border -translate-x-1/2 mt-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Discovered</p>
                      <p className="text-muted-foreground">June 10, 2025 by Aegis AI Scan</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">2</div>
                    <div>
                      <p className="font-semibold">Assigned</p>
                      <p className="text-muted-foreground">Not yet assigned</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Collaboration
                </CardTitle>
                <CardDescription>Discuss this finding with your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Add a comment... (feature coming soon)" disabled />
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" disabled>Post Comment</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
