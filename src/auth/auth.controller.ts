import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto, LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto ) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return await this.authService.register(registerDto);
  }

  @Post('/admin/login')
  async adminLogin(@Body() loginDto: AdminLoginDto ) {
    return await this.authService.adminLogin(loginDto);
  }
}
