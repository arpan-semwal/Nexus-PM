import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const hashPassword = async(password:string) => {
    return bcrypt.hash(password , SALT_ROUNDS);
}

export const comparePassword = async (password:string , hash:string) => {
    return bcrypt.compare(password , hash);

}

export const generateToken = (userId:string) => {
    return jwt.sign({userId} , JWT_SECRET , {expiresIn: '7d'});
}