-- DDL generated by Postico 2.1.2
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE user_profiles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    username text NOT NULL UNIQUE,
    auth_user_id uuid REFERENCES auth.users(id),
    first_name text,
    last_name text,
    middle_name text,
    avatar_url text,
    birthdate date,
    email text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_profiles_pkey ON user_profiles(id uuid_ops);
CREATE UNIQUE INDEX user_profiles_username_key ON user_profiles(username text_ops);
CREATE INDEX user_profile_auth_user ON user_profiles(auth_user_id uuid_ops);
CREATE INDEX idx_user_profile_email ON user_profiles(email text_ops);
