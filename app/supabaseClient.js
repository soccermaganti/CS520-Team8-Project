import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://niqomrgbdcegxorlifel.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabasePrivateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcW9tcmdiZGNlZ3hvcmxpZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NTM4MTcsImV4cCI6MjA1NzEyOTgxN30.6qAVJlUjbd-JnEDMBNPdyavb_-97HZcB7ECvmX7Pfus'

export const supabase = createClient(supabaseUrl, supabasePrivateKey)
