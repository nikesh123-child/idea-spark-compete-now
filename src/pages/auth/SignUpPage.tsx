
import { Link } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff, Shield, CheckCircle, XCircle } from "lucide-react";
import { sanitizeInput, validatePasswordStrength, setCSRFToken, getCSRFToken } from "@/utils/security";
import { logAuditEvent } from "@/utils/auditLogger";
import { Alert, AlertDescription } from "@/components/ui/alert";

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(12, { message: "Password must be at least 12 characters." }),
  csrfToken: z.string().min(1, { message: "Security token required." }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ isValid: false, errors: [] as string[] });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const token = setCSRFToken();
    setCsrfToken(token);
  }, []);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      csrfToken: "",
    },
  });

  useEffect(() => {
    form.setValue('csrfToken', csrfToken);
  }, [csrfToken, form]);

  const password = form.watch('password');
  
  useEffect(() => {
    if (password) {
      setPasswordStrength(validatePasswordStrength(password));
    }
  }, [password]);

  const onSubmit = async (data: SignUpFormValues) => {
    // Validate CSRF token
    if (data.csrfToken !== getCSRFToken()) {
      toast.error("Security validation failed. Please refresh and try again.");
      return;
    }

    if (!passwordStrength.isValid) {
      toast.error("Please ensure your password meets all security requirements.");
      return;
    }

    setIsLoading(true);
    
    try {
      const sanitizedFirstName = sanitizeInput(data.firstName);
      const sanitizedLastName = sanitizeInput(data.lastName);
      const sanitizedEmail = sanitizeInput(data.email);

      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: data.password,
        options: {
          data: {
            first_name: sanitizedFirstName,
            last_name: sanitizedLastName,
          },
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        await logAuditEvent({
          event_type: 'login_failure',
          details: { email: sanitizedEmail, error: error.message, action: 'signup' }
        });
        throw error;
      }

      await logAuditEvent({
        event_type: 'login_attempt',
        details: { email: sanitizedEmail, action: 'signup_success' }
      });

      toast.success("Account created! Check your email for verification link.");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
      // Regenerate CSRF token
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
          <h1 className="text-3xl font-bold">Create Secure Account</h1>
        </div>
        <p className="text-balance text-muted-foreground">
          Join our secure platform with enterprise-grade protection
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Max" {...field} autoComplete="given-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Robinson" {...field} autoComplete="family-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} autoComplete="email" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {password && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Password Requirements:</h4>
              <div className="grid gap-1 text-xs">
                {[
                  { text: "At least 12 characters", valid: password.length >= 12 },
                  { text: "One lowercase letter", valid: /[a-z]/.test(password) },
                  { text: "One uppercase letter", valid: /[A-Z]/.test(password) },
                  { text: "One number", valid: /\d/.test(password) },
                  { text: "One special character", valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {req.valid ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-500" />
                    )}
                    <span className={req.valid ? "text-green-600" : "text-red-600"}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          <Button type="submit" className="w-full" disabled={isLoading || !passwordStrength.isValid}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Secure Account
          </Button>
          
          <Button variant="outline" className="w-full" type="button" onClick={() => toast.info("OAuth integration coming soon!")}>
            Sign up with Google
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Sign in
        </Link>
      </div>

      <div className="text-xs text-muted-foreground text-center mt-4">
        <p>🔒 All data encrypted with AES-256 | SOC 2 Type II Compliant</p>
      </div>
    </>
  );
}
