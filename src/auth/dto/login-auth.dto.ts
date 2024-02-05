import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must have atleast 8 characters.' })
    password: string
}

export class AdminLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must have atleast 8 characters.' })
    password: string
}