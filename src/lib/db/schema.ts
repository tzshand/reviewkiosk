// Table names (prefixed to coexist with sendletter in same Supabase project)
export const TABLES = {
  users: "reviewkiosk_users",
  businesses: "reviewkiosk_businesses",
  feedback: "reviewkiosk_feedback",
  leads: "reviewkiosk_leads",
} as const;
