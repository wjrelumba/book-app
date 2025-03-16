import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qc2xtemxtc3NpZ3Fub25paHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjc3NzUsImV4cCI6MjA1NzcwMzc3NX0.OocqoLdTWPbMCBJK09rV0ENb9QMHSBhD5HJCCgAaxOc';
const supabaseUrl = 'https://njslmzlmssigqnonihpm.supabase.co';

export const supabase = createClient(supabaseUrl,supabaseKey);