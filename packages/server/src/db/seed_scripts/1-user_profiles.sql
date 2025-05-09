CREATE TABLE user_profiles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    username text NOT NULL UNIQUE,
    auth_user_id uuid REFERENCES auth.users(id),
    first_name text,
    last_name text,
    middle_name text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_profiles_pkey ON user_profiles(id uuid_ops);
CREATE UNIQUE INDEX user_profiles_username_key ON user_profiles(username text_ops);
CREATE INDEX user_profile_auth_user ON user_profiles(auth_user_id uuid_ops);