-- FAQ and services editable from the MCS-X7 backoffice

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists services_visible_sort_idx
  on public.services (sort_order)
  where is_visible = true;

create index if not exists faqs_visible_sort_idx
  on public.faqs (sort_order)
  where is_visible = true;

alter table public.services enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "services_public_read" on public.services;
drop policy if exists "services_auth_all" on public.services;
drop policy if exists "faqs_public_read" on public.faqs;
drop policy if exists "faqs_auth_all" on public.faqs;

create policy "services_public_read"
  on public.services
  for select
  to anon
  using (is_visible = true);

create policy "services_auth_all"
  on public.services
  for all
  to authenticated
  using (true)
  with check (true);

create policy "faqs_public_read"
  on public.faqs
  for select
  to anon
  using (is_visible = true);

create policy "faqs_auth_all"
  on public.faqs
  for all
  to authenticated
  using (true)
  with check (true);

grant select on table public.services to anon, authenticated;
grant select on table public.faqs to anon, authenticated;
grant insert, update, delete on table public.services to authenticated;
grant insert, update, delete on table public.faqs to authenticated;

insert into public.services (title, description, sort_order)
select * from (
  values
    (
      'Aplicaciones de pago',
      'Especialista en desarrollo de apps de cobro y POS en C++, Java, Flutter y Dart. Diseño e implementación de software de pago a medida para proyectos independientes.',
      1
    ),
    (
      'APIs, geolocalización y fullstack',
      'Web, móvil y backoffice. Integro APIs de terceros, mapas y geolocalización, y sistemas internos con foco en seguridad, trazabilidad y una experiencia clara.',
      2
    ),
    (
      'Apps educativas y a medida',
      'Productos didácticos como Terraliam y Midoc: contenidos, recorridos y herramientas para aprender. Si tu idea no es de pagos, también la construyo.',
      3
    )
) as seed(title, description, sort_order)
where not exists (select 1 from public.services);

insert into public.faqs (question, answer, sort_order)
select * from (
  values
    (
      '¿Qué es QuintanaDev?',
      'QuintanaDev es la agencia y mission control de software de Juniors Quintana, en Caracas, Venezuela. Especialista en desarrollo de aplicaciones de pago y también en apps fullstack con integración de APIs, geolocalización y productos educativos.',
      1
    ),
    (
      '¿Eres especialista en aplicaciones de pago?',
      'Sí. Me especializo en el desarrollo de aplicaciones de pago: POS, Flutter, C++ y Java, e integraciones técnicas de cobro. Ese expertise lo aplico en proyectos independientes y a medida.',
      2
    ),
    (
      '¿Solo hacen apps de pago?',
      'No. También desarrollo cualquier aplicación con integración de APIs, geolocalización o una experiencia educativa. Ejemplos: Terraliam y Midoc, productos didácticos con mapas, contenidos y flujos a medida.',
      3
    ),
    (
      '¿Cómo contactar a QuintanaDev?',
      'Escribe a quintanajuniors@gmail.com o usa el formulario de contacto en quintanadev.us. El equipo opera en horario UTC-4 (Caracas).',
      4
    )
) as seed(question, answer, sort_order)
where not exists (select 1 from public.faqs);

update public.site_profile
set
  tagline = 'FULLSTACK // APPS DE PAGO // APIS // GEO',
  bio = 'Desarrollador fullstack y mobile con más de 8 años de experiencia. En QuintanaDev soy especialista en desarrollo de aplicaciones de pago (POS, Flutter, C++ y Java) y también construyo cualquier tipo de app: integración de APIs, geolocalización y productos educativos como Terraliam y Midoc.',
  updated_at = now()
where bio ilike '%bancos y comercios%'
   or bio ilike '%ISO8583%'
   or tagline ilike '%PAYMENT SYSTEMS%';
