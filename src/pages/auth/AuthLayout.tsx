
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (user && location.pathname !== '/update-password') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <Link to="/" className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Shield className="h-8 w-8" />
                    <h1 className="text-3xl font-bold">Aegis AI</h1>
                </Link>
            </div>
            <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="flex h-full flex-col justify-between bg-zinc-900 p-10 text-white dark:bg-zinc-900">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Your all-in-one security command center.</h2>
                <p className="text-zinc-400">Manage vulnerabilities, track assets, and collaborate with your team, all from a single dashboard.</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span><span className="font-semibold text-white">Detailed Finding View:</span> Dive deep into vulnerabilities with comprehensive details and remediation history.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span><span className="font-semibold text-white">Asset Management:</span> Keep track of all your protected assets and their associated risks in one place.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span><span className="font-semibold text-white">Seamless Integrations:</span> Connect with tools like Jira and Slack to streamline your security workflow.</span>
                  </li>
                </ul>
            </div>
            <blockquote className="space-y-2 border-t border-zinc-800 pt-6">
              <p className="text-lg">
                &ldquo;This platform has saved our team countless hours of manual security work and has given us peace of mind.&rdquo;
              </p>
              <footer className="text-sm text-zinc-400">Sofia Davis, CTO at InnoTech</footer>
            </blockquote>
        </div>
      </div>
    </div>
  );
}
