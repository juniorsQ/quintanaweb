import { createClientBrowser } from "@/lib/supabase/client";
import { isPaymentOfferCopy } from "@/lib/i18n/cms";
import type { Experience, PortfolioData, Project, Skill } from "@/lib/types";

const PUBLIC_EXPERIENCE_FALLBACK =
  "Desarrollo de aplicaciones web y móviles, CMS/backoffice y sistemas internos en producción.";

function publicExperiences(items: Experience[]): Experience[] {
  return items.map((item) =>
    isPaymentOfferCopy(item.title, item.description)
      ? { ...item, description: PUBLIC_EXPERIENCE_FALLBACK }
      : item
  );
}

function publicSkills(items: Skill[]): Skill[] {
  return items.filter((item) => !isPaymentOfferCopy(item.name, item.icon));
}

function publicProjects(items: Project[]): Project[] {
  return items.filter(
    (item) => !isPaymentOfferCopy(item.title, item.summary, item.technologies)
  );
}

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
    projectsRes,
    servicesRes,
    faqsRes,
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
    supabase
      .from("projects")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("services")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
    supabase
      .from("faqs")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order"),
  ]);

  return {
    profile: profileRes.data,
    socialLinks: socialRes.data ?? [],
    experiences: publicExperiences(experienceRes.data ?? []),
    education: educationRes.data ?? [],
    skills: publicSkills(skillsRes.data ?? []),
    workflowItems: workflowRes.data ?? [],
    certifications: certsRes.data ?? [],
    projects: publicProjects(projectsRes.data ?? []),
    services: [],
    faqs: [],
  };
}

export async function fetchAdminData() {
  const supabase = createClientBrowser();
  await supabase.auth.getSession();

  const [
    profileRes,
    socialRes,
    experienceRes,
    educationRes,
    skillsRes,
    workflowRes,
    certsRes,
    projectsRes,
    servicesRes,
    faqsRes,
    contactsRes,
  ] = await Promise.all([
    supabase.from("site_profile").select("*").limit(1).maybeSingle(),
    supabase.from("social_links").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("workflow_items").select("*").order("sort_order"),
    supabase.from("certifications").select("*").order("sort_order"),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("faqs").select("*").order("sort_order"),
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const firstError =
    profileRes.error ||
    socialRes.error ||
    experienceRes.error ||
    educationRes.error ||
    skillsRes.error ||
    workflowRes.error ||
    certsRes.error ||
    projectsRes.error ||
    servicesRes.error ||
    faqsRes.error ||
    contactsRes.error;

  if (firstError) {
    throw new Error(firstError.message);
  }

  return {
    profile: profileRes.data,
    socialLinks: socialRes.data ?? [],
    experiences: experienceRes.data ?? [],
    education: educationRes.data ?? [],
    skills: skillsRes.data ?? [],
    workflowItems: workflowRes.data ?? [],
    certifications: certsRes.data ?? [],
    projects: projectsRes.data ?? [],
    services: servicesRes.data ?? [],
    faqs: faqsRes.data ?? [],
    contactMessages: contactsRes.data ?? [],
  };
}
