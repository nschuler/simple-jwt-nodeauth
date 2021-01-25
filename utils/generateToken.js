import crypto from "crypto";
import Token from "./../models/Token.js";

export const randomTokenGen = async (savedUser) => {
    try {
        // Generate and save token
        const token = await crypto.randomBytes(20).toString("hex")
        const userToken = new Token({ _userId: savedUser._id, token: token })
        await userToken.save()

        return userToken
      } catch (err) {
        throw err
      }
}