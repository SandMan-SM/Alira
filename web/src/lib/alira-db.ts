import { supabase } from "./supabase";

export type Enrollment = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  program: string;
  status?: string;
  notes?: string;
  created_at?: string;
};

export type Newsletter = {
  id?: string;
  email: string;
  first_name?: string;
  subscribed?: boolean;
  source?: string;
  created_at?: string;
};

export type InventoryItem = {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
  sku?: string;
  image_url?: string;
  active?: boolean;
  created_at?: string;
};

export type Program = {
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  price: number;
  duration_weeks?: number;
  features?: string[];
  active?: boolean;
  sort_order?: number;
  created_at?: string;
};

export type Contact = {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  inquiry_type?: string;
  message?: string;
  status?: string;
  created_at?: string;
};

// Enrollment functions
export async function createEnrollment(data: Omit<Enrollment, "id" | "created_at" | "status">) {
  const { data: result, error } = await supabase
    .from("alira_enrollments")
    .insert([{ ...data, status: "pending" }])
    .select()
    .single();
  if (error) throw error;
  return result;
}

export async function getEnrollments() {
  const { data, error } = await supabase
    .from("alira_enrollments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Newsletter functions
export async function subscribeNewsletter(data: Omit<Newsletter, "id" | "created_at" | "subscribed">) {
  const { data: result, error } = await supabase
    .from("alira_newsletter")
    .insert([{ ...data, subscribed: true }])
    .select()
    .single();
  if (error) throw error;
  return result;
}

export async function getSubscribers() {
  const { data, error } = await supabase
    .from("alira_newsletter")
    .select("*")
    .eq("subscribed", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Inventory functions
export async function getInventory() {
  const { data, error } = await supabase
    .from("alira_inventory")
    .select("*")
    .eq("active", true)
    .order("category", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getInventoryItem(id: string) {
  const { data, error } = await supabase
    .from("alira_inventory")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// Program functions
export async function getPrograms() {
  const { data, error } = await supabase
    .from("alira_programs")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

// Contact functions
export async function createContact(data: Omit<Contact, "id" | "created_at" | "status">) {
  const { data: result, error } = await supabase
    .from("alira_contacts")
    .insert([{ ...data, status: "new" }])
    .select()
    .single();
  if (error) throw error;
  return result;
}

export async function getContacts() {
  const { data, error } = await supabase
    .from("alira_contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
