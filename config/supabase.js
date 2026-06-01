// Supabase Client Initialization
// This file handles all Supabase connections

// Load environment variables
const getEnvVar = (key) => {
  // Try to get from window if loaded from HTML script
  if (window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  // Fallback for development
  return process.env[key] || '';
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY');

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
