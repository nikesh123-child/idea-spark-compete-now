
import { Outlet, Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AuthLayout() {
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
            <div></div>
            <blockquote className="space-y-2">
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
