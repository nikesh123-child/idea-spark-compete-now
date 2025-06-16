
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Layout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Add security headers when layout loads
    const addSecurityHeaders = () => {
      // Prevent clickjacking
      if (window.top !== window.self) {
        window.top!.location = window.self.location;
      }
      
      // Clear sensitive data on page unload
      const clearSensitiveData = () => {
        sessionStorage.removeItem('csrf_token');
      };
      
      window.addEventListener('beforeunload', clearSensitiveData);
      return () => window.removeEventListener('beforeunload', clearSensitiveData);
    };

    addSecurityHeaders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
