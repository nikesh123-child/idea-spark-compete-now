// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ootdksampvekmrifdwau.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdGRrc2FtcHZla21yaWZkd2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDIzOTgsImV4cCI6MjA2NTU3ODM5OH0.07goOtbRyxPlRpewQmVXXIJ8qqtBnhvCSzOHCvzXsPs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);