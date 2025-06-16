
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { sanitizeInput, setCSRFToken, getCSRFToken, handleSecureError } from "@/utils/security";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  csrfToken: z.string().min(1, { message: "Security token required." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();
  const { secureLogin, loginAttempts, isLocked } = useAuth();

  useEffect(() => {
    const token = setCSRFToken();
    setCsrfToken(token);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      csrfToken: "",
    },
  });

  useEffect(() => {
    form.setValue('csrfToken', csrfToken);
  }, [csrfToken, form]);

  const onSubmit = async (data: LoginFormValues) => {
    if (isLocked) {
      toast.error("Account temporarily locked due to multiple failed attempts.");
      return;
    }

    // Validate CSRF token
    if (data.csrfToken !== getCSRFToken()) {
      toast.error("Security validation failed. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const sanitizedEmail = sanitizeInput(data.email);
      await secureLogin(sanitizedEmail, data.password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      const secureMessage = handleSecureError(error);
      toast.error(secureMessage);
    } finally {
      setIsSubmitting(false);
      // Regenerate CSRF token after each attempt
      const newToken = setCSRFToken();
      setCsrfToken(newToken);
      form.setValue('csrfToken', newToken);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Secure Login</h1>
        </div>
        <p className="text-balance text-muted-foreground">
          Enter your credentials to access your secure account
        </p>
      </div>

      {loginAttempts > 0 && (
        <Alert variant={loginAttempts >= 3 ? "destructive" : "default"}>
          <AlertDescription>
            {loginAttempts >= 3 
              ? `Account will be temporarily locked after ${5 - loginAttempts} more failed attempts.`
              : `${loginAttempts} failed login attempt${loginAttempts > 1 ? 's' : ''}.`
            }
          </AlertDescription>
        </Alert>
      )}

      {isLocked && (
        <Alert variant="destructive">
          <AlertDescription>
            Account temporarily locked due to multiple failed login attempts. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name@company.com" 
                    {...field} 
                    autoComplete="email"
                    disabled={isLocked}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      autoComplete="current-password"
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      disabled={isLocked}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="csrfToken"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting || isLocked}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLocked ? "Account Locked" : "Secure Login"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </div>

      <div className="text-xs text-muted-foreground text-center mt-4">
        <p>🔒 Your connection is secured with enterprise-grade encryption</p>
      </div>
    </>
  );
}
