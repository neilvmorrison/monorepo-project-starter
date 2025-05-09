CREATE SCHEMA auth;

CREATE TABLE auth.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    email text NOT NULL UNIQUE,
    password_hash text,
    last_login timestamp with time zone
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX users_pkey ON auth.users(id uuid_ops);
CREATE UNIQUE INDEX users_email_key ON auth.users(email text_ops);
CREATE INDEX auth_email ON auth.users(email text_ops);
