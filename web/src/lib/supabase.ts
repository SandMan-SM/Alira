import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://odvxtychuxxsudfpcqqs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdnh0eWNodXh4c3VkZnBjcXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjkzMjQsImV4cCI6MjA4NzUwNTMyNH0.Ka-pmRzzDwAoTFNbkuvZqtWJMefrtM0pypIr_dZ6lYA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
