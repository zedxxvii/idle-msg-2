import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto, LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService, //Inject User Serivce
    private userService: UserService,
    private jwtService: JwtService, //Inject JWT Service
  ) {}
  
  async login(loginCredential: LoginAuthDto) {
    try {
      const customer = await this.customerService.findOne(loginCredential.username);
      const isMatch = await bcrypt.compare(loginCredential.password, customer.password);
      if (!isMatch) throw new Error ('incorrect password');
      delete customer.password;
      const token = await this.getToken(customer, false);
      return {...customer, token };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST)
    }

  }

  async register(registerCredential: RegisterAuthDto) {
    try {
      const isUsernameUsed = await this.customerService.findExisting(registerCredential.username);
      const newCustomer = await this.customerService.create(registerCredential);
      return newCustomer;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async adminLogin(loginCredential: AdminLoginDto) {
    try {
      const admin = await this.userService.findOne(loginCredential.email);
      console.log(admin)
      const isMatch = await bcrypt.compare(loginCredential.password, admin.password);
      console.log(loginCredential.password)
      console.log(isMatch)
      if (!isMatch) throw new Error ('incorrect password');
      delete admin.password;
      const token = await this.getToken(admin, true);
      return {...admin, token };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async getToken(info: Customer | User, isAdmin: boolean): Promise<string> {
    //Create JWT token payload so we can abstract data from authorized token
    const payload = {...info, admin: isAdmin};
    console.log(payload);
    const access_token = this.jwtService.sign(payload); //Sign payload to get token
    return access_token;
  }
}
