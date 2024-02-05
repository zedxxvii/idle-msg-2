import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport_strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { CustomerService } from 'src/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    PassportModule, //Import passport
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }), //Register JWT module so we can use it
    TypeOrmModule.forFeature([Customer, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CustomerService, UserService],
})
export class AuthModule {}
