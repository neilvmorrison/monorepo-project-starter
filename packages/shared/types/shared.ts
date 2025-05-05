import { UserProfile } from "./database/user_profiles.types";

export type LoginPayload = { email: string; password: string };
export type CurrentUser = {
  is_authenticated: boolean;
  user_profile: UserProfile;
  error: unknown | null;
};
