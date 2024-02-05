import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePurchaseDto {
    @IsNotEmpty()
    @IsNumber()
    itemId: number

    @IsNotEmpty()
    @IsString()
    paymentRef: string
    
    @IsNotEmpty()
    @IsString()
    gameID: string
}
