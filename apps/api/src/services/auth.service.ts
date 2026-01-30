 
import { generateToken, hashPassword } from "../lib/auth";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

const userRepo = new UserRepository();

export class AuthService {
    async signup(data: any){
        //check if the user already exists
        const existingUser = await userRepo.findByEmail(data.email);
        if(existingUser){
            throw new AppError('User with this email already exists',400);
        }

        //Hash password
        const hashedPassword = await hashPassword(data.password);

        //Create user in DB
        const user = await userRepo.create({
            ...data,
            password: hashedPassword,
        });

        //Generate Token
        const token = generateToken(user.id);

        return{user , token};
    }
}