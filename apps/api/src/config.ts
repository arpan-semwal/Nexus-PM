import {z} from 'zod';
import dotenv from 'dotenv';
import { error } from 'console';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development','test','production']).default('development'),
    PORT: z.string().transform(Number).default(5000),
    DATABASE_URL: z.string().url().default('postgresql://user:pass@localhost:5432/nexusdb'),
    JWT_SECRET: z.string().min(32).default('a_very_long_random_string_for_security_purposes'),
});

 
    const envVars = envSchema.safeParse(process.env);

    if(!envVars.success){
        console.error('Invalid Environment Varables:',envVars.error.format());
        process.exit(1);
    }

    export const config = envVars.data;