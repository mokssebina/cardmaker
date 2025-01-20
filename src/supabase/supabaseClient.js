import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cifkdsltxulsoifghqdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZmtkc2x0eHVsc29pZmdocWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTExMzEsImV4cCI6MjA1Mjg4NzEzMX0.O6Fpjb5o7-rgWUGvZwX-Z3rYeDSRqei18CUgZbH4GBk';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
