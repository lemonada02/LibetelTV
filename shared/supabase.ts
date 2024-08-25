import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pktanpfnmrlxxevkzqra.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdGFucGZubXJseHhldmt6cXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MDEzMDgsImV4cCI6MjA0MDA3NzMwOH0.LJdctuZfYOF64husZxjFnaXZAoLoGxCq7wBnTRlgV68";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
