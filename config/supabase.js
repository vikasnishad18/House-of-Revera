// Supabase Client Initialization
// This file handles all Supabase connections

// Load environment variables from .env file
const getEnvVar = (key) => {
  // For direct file approach, read from meta tags in HTML
  const metaTag = document.querySelector(`meta[data-env-${key.toLowerCase()}]`);
  if (metaTag) {
    return metaTag.getAttribute(`data-env-${key.toLowerCase()}`);
  }
  return '';
};

const SUPABASE_URL = 'https://ihbrlivclnemejxkxghe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloYnJsaXZjbG5lbWVqeGt4Z2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTc3NzUsImV4cCI6MjA5NTg3Mzc3NX0.V7Qt_aLpxHiu7vrmPM6E6uBKHlDMsxCEhfpVJHAHmRg';

// Initialize Supabase client
const { createClient } = window.supabase;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Helper function to check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null && SUPABASE_URL && SUPABASE_ANON_KEY;
};

// Save contact inquiry to Supabase
const saveContactInquiry = async (data) => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Please add your credentials to .env');
    return false;
  }

  try {
    const { error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) {
      console.error('Error saving inquiry:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception saving inquiry:', err);
    return false;
  }
};

// Export for use in other files
window.supabaseConfig = {
  supabase,
  isSupabaseConfigured,
  saveContactInquiry,
};
