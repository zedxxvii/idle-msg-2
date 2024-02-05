import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashing } from 'src/utils/harshing';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer: Customer = new Customer;
    customer.username = createCustomerDto.username;
    customer.password = await Hashing.harshPassword(createCustomerDto.password);
    try {
      const newCustomer = this.customerRepository.save(customer);
      return newCustomer;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(username: string) {
    try {
      const user = await this.customerRepository.findOneBy({username: username})
      if(!user) throw new Error('Incorrect username')
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findExisting(username: string) {
    try {
      const user = await this.customerRepository.findBy({username: username})
      if(user.length != 0) {
        throw new Error('Username Already Exist')
      } else {
        return true;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
