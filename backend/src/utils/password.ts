import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hashear la contraseña con bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

// Comparar la contraseña con el hash almacenado
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};