create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  workspace_name text default 'Personal workspace',
  created_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  topic text,
  meeting_date timestamptz not null default now(),
  duration_seconds integer not null default 0,
  summary text,
  transcript jsonb not null default '[]'::jsonb,
  action_items jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  recording_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.meetings enable row level security;
create policy "Users can view their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view their meetings" on public.meetings for select using (auth.uid() = owner_id);
create policy "Users can create their meetings" on public.meetings for insert with check (auth.uid() = owner_id);
create policy "Users can update their meetings" on public.meetings for update using (auth.uid() = owner_id);
create policy "Users can delete their meetings" on public.meetings for delete using (auth.uid() = owner_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
