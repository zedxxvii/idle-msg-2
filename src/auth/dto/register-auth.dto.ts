import { IsAlphanumeric, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "src/utils/match.decorator";
const usernameRegEx =
    /^(?=(?:[^A-Za-z]*[A-Za-z]){3})[A-Za-z\d]{4,}$/;

export class RegisterAuthDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @Matches(usernameRegEx, {
        message: `Username must have at least 3 alphabet characters and be longer than 3 characters.`,
    })
    username: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must have atleast 8 characters.' })
    password: string

    @IsNotEmpty()
    @IsString()
    @Match<RegisterAuthDto>('password') //Util class
    confirmPassword: string;
}