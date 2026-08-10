import { createClientBrowser } from "@/lib/supabase/client";
import type { PortfolioData } from "@/lib/types";

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const supabase = createClientBrowser();

  const [
    profileRes,
    socialRes,
    experienceRes,
    educationRes,
    skillsRes,
    workflowRes,
    certsRes,
  ] = await Promise.all([
    supabase.from("site_profile").select("*").limit(1).maybeSingle(),
    supabase
      .from("social_links")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("experiences")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("education")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("skills")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("workflow_items")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("certifications")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
  ]);

  return {
    profile: profileRes.data,
    socialLinks: socialRes.data ?? [],
    experiences: experienceRes.data ?? [],
    education: educationRes.data ?? [],
    skills: skillsRes.data ?? [],
    workflowItems: workflowRes.data ?? [],
    certifications: certsRes.data ?? [],
  };
}

export async function fetchAdminData() {
  const supabase = createClientBrowser();

  const [
    profileRes,
    socialRes,
    experienceRes,
    educationRes,
    skillsRes,
    workflowRes,
    certsRes,
  ] = await Promise.all([
    supabase.from("site_profile").select("*").limit(1).maybeSingle(),
    supabase.from("social_links").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("workflow_items").select("*").order("sort_order"),
    supabase.from("certifications").select("*").order("sort_order"),
  ]);

  return {
    profile: profileRes.data,
    socialLinks: socialRes.data ?? [],
    experiences: experienceRes.data ?? [],
    education: educationRes.data ?? [],
    skills: skillsRes.data ?? [],
    workflowItems: workflowRes.data ?? [],
    certifications: certsRes.data ?? [],
  };
}
