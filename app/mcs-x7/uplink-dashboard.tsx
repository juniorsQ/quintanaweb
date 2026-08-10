"use client";

import { useEffect, useState } from "react";
import type {
  Certification,
  Education,
  Experience,
  Project,
  SiteProfile,
  Skill,
  SocialLink,
  WorkflowItem,
} from "@/lib/types";
import { createClientBrowser } from "@/lib/supabase/client";
import { withBase } from "@/lib/paths";

type AdminData = {
  profile: SiteProfile | null;
  socialLinks: SocialLink[];
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  workflowItems: WorkflowItem[];
  certifications: Certification[];
  projects: Project[];
};

const TABS = [
  "profile",
  "projects",
  "experience",
  "education",
  "skills",
  "workflow",
  "certs",
  "social",
] as const;

type Tab = (typeof TABS)[number];

type Props = {
  data: AdminData;
  onRefresh: () => Promise<void>;
  onLogout: () => Promise<void>;
};

export function UplinkDashboard({ data, onRefresh, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("profile");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const afterMutate = async () => {
    try {
      await onRefresh();
      setStatus("Guardado OK");
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setBusy(false);
    }
  };

  const projects = data.projects ?? [];
  const experiences = data.experiences ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const workflowItems = data.workflowItems ?? [];
  const certifications = data.certifications ?? [];
  const socialLinks = data.socialLinks ?? [];

  return (
    <div className="min-h-screen bg-crt-bg text-[#c8f5d8]">
      <header className="border-b border-crt-border bg-crt-panel">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
          <div>
            <p className="signal-label">CHANNEL MCS-X7</p>
            <h1 className="font-display text-xl font-bold tracking-widest text-phosphor">
              UPLINK TERMINAL
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="max-w-xs truncate font-mono text-[10px] text-amber-signal">
                ERR :: {error}
              </span>
            )}
            {status && !error && (
              <span className="font-mono text-[10px] text-phosphor">
                {status}
              </span>
            )}
            <a href={withBase("/")} className="btn-crt !py-1.5">
              SURFACE
            </a>
            <button
              type="button"
              className="btn-amber !py-1.5"
              onClick={() => onLogout()}
            >
              SEVER
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setStatus(null);
              }}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
                tab === t
                  ? "border-phosphor bg-phosphor/10 text-phosphor"
                  : "border-crt-border text-phosphor-dim hover:border-phosphor/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <ProfileEditor
            profile={data.profile}
            busy={busy}
            onSave={async (payload) => {
              setBusy(true);
              setStatus(null);
              setError(null);
              try {
                await saveProfile(payload);
                await afterMutate();
              } catch (e) {
                setBusy(false);
                setError(e instanceof Error ? e.message : "Error al guardar");
              }
            }}
          />
        )}
        {tab === "projects" && (
          <CrudList
            title="Proyectos"
            items={projects}
            blank={{
              title: "",
              summary: "",
              image_url: "",
              technologies: "",
              project_url: "",
              sort_order: projects.length + 1,
              is_visible: true,
            }}
            fields={[
              ["title", "Título"],
              ["image_url", "URL imagen"],
              ["technologies", "Tecnologías (separadas por coma)"],
              ["project_url", "URL proyecto"],
              ["sort_order", "Orden", "number"],
              ["summary", "Presentación breve", "textarea"],
            ]}
            table="projects"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "experience" && (
          <CrudList
            title="Experiencia"
            items={experiences}
            blank={{
              title: "",
              company: "",
              description: "",
              date_label: "",
              sort_order: experiences.length + 1,
              is_visible: true,
            }}
            fields={[
              ["title", "Cargo"],
              ["company", "Empresa"],
              ["date_label", "Fechas"],
              ["sort_order", "Orden", "number"],
              ["description", "Descripción", "textarea"],
            ]}
            table="experiences"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "education" && (
          <CrudList
            title="Educación"
            items={education}
            blank={{
              institution: "",
              degree: "",
              date_label: "",
              sort_order: education.length + 1,
              is_visible: true,
            }}
            fields={[
              ["institution", "Institución"],
              ["degree", "Título"],
              ["date_label", "Fechas"],
              ["sort_order", "Orden", "number"],
            ]}
            table="education"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "skills" && (
          <CrudList
            title="Skills"
            items={skills}
            blank={{
              name: "",
              icon: "code",
              sort_order: skills.length + 1,
              is_visible: true,
            }}
            fields={[
              ["name", "Nombre"],
              ["icon", "Icon key"],
              ["sort_order", "Orden", "number"],
            ]}
            table="skills"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "workflow" && (
          <CrudList
            title="Workflow"
            items={workflowItems}
            blank={{
              label: "",
              sort_order: workflowItems.length + 1,
              is_visible: true,
            }}
            fields={[
              ["label", "Texto"],
              ["sort_order", "Orden", "number"],
            ]}
            table="workflow_items"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "certs" && (
          <CrudList
            title="Certificaciones"
            items={certifications}
            blank={{
              title: "",
              issuer: "",
              sort_order: certifications.length + 1,
              is_visible: true,
            }}
            fields={[
              ["title", "Curso"],
              ["issuer", "Emisor"],
              ["sort_order", "Orden", "number"],
            ]}
            table="certifications"
            onDone={afterMutate}
            onError={setError}
          />
        )}
        {tab === "social" && (
          <CrudList
            title="Redes"
            items={socialLinks}
            blank={{
              platform: "",
              url: "",
              icon: "link",
              sort_order: socialLinks.length + 1,
              is_visible: true,
            }}
            fields={[
              ["platform", "Plataforma"],
              ["url", "URL"],
              ["icon", "Icon"],
              ["sort_order", "Orden", "number"],
            ]}
            table="social_links"
            onDone={afterMutate}
            onError={setError}
          />
        )}
      </div>
    </div>
  );
}

async function saveProfile(payload: {
  id: string;
  first_name: string;
  last_name: string;
  location: string;
  phone: string;
  email: string;
  tagline: string;
  bio: string;
}) {
  const supabase = createClientBrowser();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    throw new Error("Sesión expirada. Vuelve a iniciar sesión.");
  }

  const body = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    location: payload.location,
    phone: payload.phone,
    email: payload.email,
    tagline: payload.tagline,
    bio: payload.bio,
    updated_at: new Date().toISOString(),
  };

  const query = payload.id
    ? supabase.from("site_profile").update(body).eq("id", payload.id).select()
    : supabase.from("site_profile").insert(body).select();

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error("Supabase no devolvió filas (posible RLS / sin permisos).");
  }
}

function ProfileEditor({
  profile,
  busy,
  onSave,
}: {
  profile: SiteProfile | null;
  busy: boolean;
  onSave: (payload: {
    id: string;
    first_name: string;
    last_name: string;
    location: string;
    phone: string;
    email: string;
    tagline: string;
    bio: string;
  }) => Promise<void>;
}) {
  const [form, setForm] = useState({
    id: profile?.id ?? "",
    first_name: profile?.first_name ?? "",
    last_name: profile?.last_name ?? "",
    location: profile?.location ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? "",
    tagline: profile?.tagline ?? "",
    bio: profile?.bio ?? "",
  });

  // Sync only when switching to a different profile row.
  useEffect(() => {
    if (!profile?.id) return;
    setForm({
      id: profile.id,
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      location: profile.location ?? "",
      phone: profile.phone ?? "",
      email: profile.email ?? "",
      tagline: profile.tagline ?? "",
      bio: profile.bio ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only on id change
  }, [profile?.id]);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <span>EDIT PROFILE</span>
      </div>
      <form
        className="grid gap-4 p-5 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
      >
        <ControlledField label="Nombre" value={form.first_name} onChange={set("first_name")} />
        <ControlledField label="Apellido" value={form.last_name} onChange={set("last_name")} />
        <ControlledField label="Ubicación" value={form.location} onChange={set("location")} />
        <ControlledField label="Teléfono" value={form.phone} onChange={set("phone")} />
        <ControlledField label="Email" value={form.email} onChange={set("email")} />
        <ControlledField label="Tagline" value={form.tagline} onChange={set("tagline")} />
        <div className="md:col-span-2">
          <ControlledField
            label="Bio"
            value={form.bio}
            onChange={set("bio")}
            textarea
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="btn-crt" disabled={busy}>
            {busy ? "SYNC..." : "COMMIT"}
          </button>
        </div>
      </form>
    </div>
  );
}

type FieldDef = [string, string, ("text" | "number" | "textarea")?];

function CrudList<T extends { id?: string; is_visible?: boolean }>({
  title,
  items,
  blank,
  fields,
  table,
  onDone,
  onError,
}: {
  title: string;
  items: T[];
  blank: Record<string, string | number | boolean>;
  fields: FieldDef[];
  table: string;
  onDone: () => Promise<void>;
  onError?: (message: string | null) => void;
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const upsert = async () => {
    if (!editing) return;
    setSaving(true);
    setLocalError(null);
    onError?.(null);

    try {
      const supabase = createClientBrowser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("Sesión expirada. Vuelve a iniciar sesión.");
      }

      const id = String(editing.id ?? "").trim();
      const payload: Record<string, unknown> = {
        is_visible: editing.is_visible !== false,
      };
      for (const [name, , type] of fields) {
        const raw = editing[name];
        payload[name] =
          type === "number" ? Number(raw ?? 0) : String(raw ?? "");
      }

      const query = id
        ? supabase.from(table).update(payload).eq("id", id).select()
        : supabase.from(table).insert(payload).select();

      const { data: saved, error } = await query;
      if (error) throw new Error(error.message);
      if (!saved || saved.length === 0) {
        throw new Error(
          "Supabase no devolvió filas (posible RLS / sin permisos)."
        );
      }

      setEditing(null);
      await onDone();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al guardar";
      setLocalError(msg);
      onError?.(msg);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (rowId: string) => {
    setLocalError(null);
    onError?.(null);
    try {
      const supabase = createClientBrowser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("Sesión expirada. Vuelve a iniciar sesión.");
      }
      const { error } = await supabase.from(table).delete().eq("id", rowId);
      if (error) throw new Error(error.message);
      await onDone();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al borrar";
      setLocalError(msg);
      onError?.(msg);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-phosphor">{title}</h2>
        <button
          type="button"
          className="btn-crt !py-1.5"
          onClick={() => {
            setLocalError(null);
            setEditing({ ...blank });
          }}
        >
          + NUEVO
        </button>
      </div>

      {localError && (
        <p className="border border-amber-signal/40 bg-amber-signal/10 px-3 py-2 font-mono text-xs text-amber-signal">
          ERR :: {localError}
        </p>
      )}

      {editing && (
        <div className="panel p-4">
          <div className="grid gap-3 md:grid-cols-2">
            {fields.map(([name, label, type]) => (
              <div
                key={name}
                className={type === "textarea" ? "md:col-span-2" : undefined}
              >
                <ControlledField
                  label={label}
                  value={String(editing[name] ?? "")}
                  type={type === "number" ? "number" : "text"}
                  textarea={type === "textarea"}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            [name]:
                              type === "number"
                                ? Number(e.target.value)
                                : e.target.value,
                          }
                        : prev
                    )
                  }
                />
              </div>
            ))}
            <label className="flex items-center gap-2 font-mono text-xs text-phosphor-dim md:col-span-2">
              <input
                type="checkbox"
                checked={editing.is_visible !== false}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev ? { ...prev, is_visible: e.target.checked } : prev
                  )
                }
              />
              Visible en el sitio
            </label>
            <div className="flex gap-2 md:col-span-2">
              <button
                type="button"
                className="btn-crt"
                disabled={saving}
                onClick={() => upsert()}
              >
                {saving ? "SYNC..." : "GUARDAR"}
              </button>
              <button
                type="button"
                className="btn-amber"
                onClick={() => setEditing(null)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {items.length === 0 && (
          <li className="font-mono text-sm text-phosphor-dim">
            {"// sin registros"}
          </li>
        )}
        {items.map((item) => (
          <li
            key={item.id}
            className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3"
          >
            <div className="min-w-0 font-mono text-sm text-phosphor">
              {fields
                .slice(0, 2)
                .map(([name]) => {
                  const row = item as Record<string, unknown>;
                  return String(row[name] ?? "");
                })
                .join(" · ")}
              {item.is_visible === false && (
                <span className="ml-2 text-amber-signal">[HIDDEN]</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-crt !py-1 !text-[10px]"
                onClick={() =>
                  setEditing({ ...(item as Record<string, unknown>) })
                }
              >
                EDIT
              </button>
              <button
                type="button"
                className="btn-amber !py-1 !text-[10px]"
                onClick={() => item.id && remove(item.id)}
              >
                DEL
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ControlledField({
  label,
  value,
  onChange,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="signal-label mb-1 block">{label}</label>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={onChange}
          className="input-crt"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="input-crt"
        />
      )}
    </div>
  );
}
