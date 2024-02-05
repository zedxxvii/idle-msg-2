import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsNumber()
    price: number
}
