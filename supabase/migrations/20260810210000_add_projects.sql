-- Projects portfolio section
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  image_url text not null default '',
  technologies text not null default '',
  project_url text not null default '',
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
