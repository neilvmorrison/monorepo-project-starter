import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const create_hash = async (raw_string: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(raw_string, salt);
};

export const hash_is_valid = async (
  raw_string: string,
  hashed_string: string
): Promise<boolean> => {
  return bcrypt.compare(raw_string, hashed_string);
};
