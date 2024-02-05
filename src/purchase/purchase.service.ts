import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ItemService } from 'src/item/item.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Purchase) private readonly purchaseRepository: Repository<Purchase>,
    private customerService: CustomerService, //Inject User Serivce
    private itemService: ItemService //Inject JWT Service
  ) { }


  async create(createPurchaseDto: CreatePurchaseDto, customerUsername: string) {
    try {
      const purchase = new Purchase;
      const item = await this.itemService.findOne(createPurchaseDto.itemId);
      const customer = await this.customerService.findOne(customerUsername);
      purchase.customer = customer;
      purchase.item = item;
      purchase.isPaid = false;
      purchase.payment_ref = createPurchaseDto.paymentRef;
      const newPuchase = this.purchaseRepository.save(purchase);
      return newPuchase;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    try {
      const purchases = await this.purchaseRepository.find({
        relations: {
          customer: true,
          item: true,
        },
        order: { created_at: 'DESC' },
      })
      return purchases;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number) {
    try {
      const purchase = await this.purchaseRepository.findOneBy({ id })
      if (!purchase) throw new Error("not found")
      return purchase;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findNotPaid() {
    try {
      const purchases = await this.purchaseRepository.find({
        relations: {
          customer: true,
          item: true,
        },
        order: { created_at: 'DESC' },
        where: {
          isPaid: false,
        }
      })
      return purchases;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    try {
      const purchase = await this.findOne(id);
      purchase.isPaid = updatePurchaseDto.isPaid;
      const newPurchase = await this.purchaseRepository.save(purchase);
      return purchase;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async approvePurhcase(id: number) {
    try {
      const purchase = await this.findOne(id);
      if (purchase.isPaid == true) {
        throw new Error("Is already paid")
      } else {
        purchase.isPaid = true;
        const newPurchase = this.purchaseRepository.save(purchase)
        return newPurchase;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getPurchaseHistory(username: string) {
    try {
      const customer = await this.customerService.findOne(username);
      const purchases = await this.purchaseRepository.find(
        {
          where : {
            customer: {
              username: customer.username
            }
          },
          relations: {
            item: true
          },
          order: { created_at: 'DESC' },
        }
      )
      return purchases;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
