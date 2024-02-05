import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto, LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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
  @Get('verifytoken')
  @UseGuards(JwtAuthGuard)
  async create(@Req() request: any) {
    const user = request.user;
    return user;
  }
  @Post('/admin/login')
  async adminLogin(@Body() loginDto: AdminLoginDto ) {
    return await this.authService.adminLogin(loginDto);
  }

  
}
