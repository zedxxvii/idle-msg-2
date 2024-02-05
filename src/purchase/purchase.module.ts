import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from 'src/item/item.service';
import { CustomerService } from 'src/customer/customer.service';
import { Item } from 'src/item/entities/item.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Item, Customer])],
  controllers: [PurchaseController],
  providers: [PurchaseService, ItemService, CustomerService],
})
export class PurchaseModule {}
