import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cifkdsltxulsoifghqdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZmtkc2x0eHVsc29pZmdocWR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODQxNjg1OSwiZXhwIjoyMDUzOTkyODU5fQ.Hf6me_vAk6PUvTST17IeYLn5bwR9xvu0qyINSR5ZTZM';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
