import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePurchaseDto {
    @IsNotEmpty()
    @IsBoolean()
    isPaid: boolean;
}
