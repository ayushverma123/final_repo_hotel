import * as bcrypt from 'bcrypt'; 
export async function hashPassword(password: string): Promise<string> {       
  const saltRounds = 10; // Number of salt rounds to use for hashing 

  // Generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
}
