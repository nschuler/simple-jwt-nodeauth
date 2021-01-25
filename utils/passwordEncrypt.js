import bcrypt from "bcryptjs";

export const passwordEncrypt = async (rawPassword) => {
  try {
    const SALT = await bcrypt.genSalt(10)
    encryptedPassword = await bcrypt.hash(rawPassword, SALT)
    return encryptedPassword
  } catch (err) {
    throw err
  }
}