"use client";

import { useState } from "react";
import type {
  Certification,
  Education,
  Experience,
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
};

const TABS = [
  "profile",
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

  const afterMutate = async () => {
    await onRefresh();
    setBusy(false);
  };

  return (
    <div className="crt-shell min-h-screen">
      <header className="border-b border-crt-border bg-crt-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
          <div>
            <p className="signal-label">CHANNEL MCS-X7</p>
            <h1 className="font-display text-xl font-bold tracking-widest text-phosphor">
              UPLINK TERMINAL
            </h1>
          </div>
          <div className="flex gap-2">
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

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
                tab === t
                  ? "border-phosphor bg-phosphor/10 text-phosphor shadow-phosphor"
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
            onSave={async (fd) => {
              setBusy(true);
              await saveProfile(fd);
              await afterMutate();
            }}
          />
        )}
        {tab === "experience" && (
          <CrudList
            title="Experiencia"
            items={data.experiences}
            blank={{
              title: "",
              company: "",
              description: "",
              date_label: "",
              sort_order: data.experiences.length + 1,
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
          />
        )}
        {tab === "education" && (
          <CrudList
            title="Educación"
            items={data.education}
            blank={{
              institution: "",
              degree: "",
              date_label: "",
              sort_order: data.education.length + 1,
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
          />
        )}
        {tab === "skills" && (
          <CrudList
            title="Skills"
            items={data.skills}
            blank={{
              name: "",
              icon: "code",
              sort_order: data.skills.length + 1,
              is_visible: true,
            }}
            fields={[
              ["name", "Nombre"],
              ["icon", "Icon key"],
              ["sort_order", "Orden", "number"],
            ]}
            table="skills"
            onDone={afterMutate}
          />
        )}
        {tab === "workflow" && (
          <CrudList
            title="Workflow"
            items={data.workflowItems}
            blank={{
              label: "",
              sort_order: data.workflowItems.length + 1,
              is_visible: true,
            }}
            fields={[
              ["label", "Texto"],
              ["sort_order", "Orden", "number"],
            ]}
            table="workflow_items"
            onDone={afterMutate}
          />
        )}
        {tab === "certs" && (
          <CrudList
            title="Certificaciones"
            items={data.certifications}
            blank={{
              title: "",
              issuer: "",
              sort_order: data.certifications.length + 1,
              is_visible: true,
            }}
            fields={[
              ["title", "Curso"],
              ["issuer", "Emisor"],
              ["sort_order", "Orden", "number"],
            ]}
            table="certifications"
            onDone={afterMutate}
          />
        )}
        {tab === "social" && (
          <CrudList
            title="Redes"
            items={data.socialLinks}
            blank={{
              platform: "",
              url: "",
              icon: "link",
              sort_order: data.socialLinks.length + 1,
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
          />
        )}
      </div>
    </div>
  );
}

async function saveProfile(formData: FormData) {
  const supabase = createClientBrowser();
  const id = String(formData.get("id") ?? "");
  const payload = {
    first_name: String(formData.get("first_name") ?? ""),
    last_name: String(formData.get("last_name") ?? ""),
    location: String(formData.get("location") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    updated_at: new Date().toISOString(),
  };
  if (id) await supabase.from("site_profile").update(payload).eq("id", id);
  else await supabase.from("site_profile").insert(payload);
}

function ProfileEditor({
  profile,
  busy,
  onSave,
}: {
  profile: SiteProfile | null;
  busy: boolean;
  onSave: (fd: FormData) => Promise<void>;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <span>EDIT PROFILE</span>
      </div>
      <form
        className="grid gap-4 p-5 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(new FormData(e.currentTarget));
        }}
      >
        <input type="hidden" name="id" value={profile?.id ?? ""} />
        <Field name="first_name" label="Nombre" defaultValue={profile?.first_name} />
        <Field name="last_name" label="Apellido" defaultValue={profile?.last_name} />
        <Field name="location" label="Ubicación" defaultValue={profile?.location} />
        <Field name="phone" label="Teléfono" defaultValue={profile?.phone} />
        <Field name="email" label="Email" defaultValue={profile?.email} />
        <Field name="tagline" label="Tagline" defaultValue={profile?.tagline} />
        <div className="md:col-span-2">
          <Field name="bio" label="Bio" defaultValue={profile?.bio} textarea />
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
}: {
  title: string;
  items: T[];
  blank: Record<string, string | number | boolean>;
  fields: FieldDef[];
  table: string;
  onDone: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const upsert = async (fd: FormData) => {
    const supabase = createClientBrowser();
    const id = String(fd.get("id") ?? "");
    const payload: Record<string, unknown> = {
      is_visible: fd.get("is_visible") === "on",
    };
    for (const [name, , type] of fields) {
      const raw = fd.get(name);
      payload[name] =
        type === "number" ? Number(raw ?? 0) : String(raw ?? "");
    }
    if (id) await supabase.from(table).update(payload).eq("id", id);
    else await supabase.from(table).insert(payload);
    setEditing(null);
    await onDone();
  };

  const remove = async (id: string) => {
    const supabase = createClientBrowser();
    await supabase.from(table).delete().eq("id", id);
    await onDone();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-phosphor">{title}</h2>
        <button
          type="button"
          className="btn-crt !py-1.5"
          onClick={() => setEditing({ ...blank })}
        >
          + NUEVO
        </button>
      </div>

      {editing && (
        <div className="panel p-4">
          <form
            className="grid gap-3 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              upsert(new FormData(e.currentTarget));
            }}
          >
            <input type="hidden" name="id" value={String(editing.id ?? "")} />
            {fields.map(([name, label, type]) => (
              <div
                key={name}
                className={type === "textarea" ? "md:col-span-2" : undefined}
              >
                <Field
                  name={name}
                  label={label}
                  defaultValue={String(editing[name] ?? "")}
                  type={type === "number" ? "number" : "text"}
                  textarea={type === "textarea"}
                />
              </div>
            ))}
            <label className="flex items-center gap-2 font-mono text-xs text-phosphor-dim md:col-span-2">
              <input
                type="checkbox"
                name="is_visible"
                defaultChecked={editing.is_visible !== false}
              />
              Visible en el sitio
            </label>
            <div className="flex gap-2 md:col-span-2">
              <button type="submit" className="btn-crt">
                GUARDAR
              </button>
              <button
                type="button"
                className="btn-amber"
                onClick={() => setEditing(null)}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}

      <ul className="space-y-2">
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
                onClick={() => setEditing(item as Record<string, unknown>)}
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

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  textarea,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="signal-label mb-1 block" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          defaultValue={defaultValue}
          className="input-crt"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          className="input-crt"
        />
      )}
    </div>
  );
}
