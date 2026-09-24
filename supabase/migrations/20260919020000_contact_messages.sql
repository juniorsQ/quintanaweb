-- Contact form messages (public insert, authenticated read)

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  locale text not null default 'es',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_public_insert" on public.contact_messages;
drop policy if exists "contact_auth_read" on public.contact_messages;
drop policy if exists "contact_auth_update" on public.contact_messages;

create policy "contact_public_insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 200
    and char_length(trim(email)) between 3 and 320
    and char_length(trim(message)) between 1 and 5000
  );

create policy "contact_auth_read"
  on public.contact_messages
  for select
  to authenticated
  using (true);

create policy "contact_auth_update"
  on public.contact_messages
  for update
  to authenticated
  using (true)
  with check (true);

grant insert on table public.contact_messages to anon, authenticated;
grant select, update on table public.contact_messages to authenticated;
