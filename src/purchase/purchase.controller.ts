import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Role, Roles } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() request: any, @Body() createPurchaseDto: CreatePurchaseDto) {
    const user = request.user;
    return this.purchaseService.create({itemId: createPurchaseDto.itemId, paymentRef: createPurchaseDto.paymentRef }, user.username);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get("notpaid")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findNotPaid() {
    return this.purchaseService.findNotPaid();
  }

  @Get("history")
  @UseGuards(JwtAuthGuard)
  async findHistory(@Req() request: any) {
    const user = request.user;
    const purchases = await this.purchaseService.getPurchaseHistory(user.username);
    return purchases;
  }

  @Patch("approve/:id")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async approve(@Param('id') id: string) {
    const purchases = await this.purchaseService.approvePurhcase(+id);
    return purchases;
  }


  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  // @Patch(':id')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
  //   return this.purchaseService.update(+id, updatePurchaseDto);
  // }

  // @Delete(':id')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // remove(@Param('id') id: string) {
  //   return this.purchaseService.remove(+id);
  // }
}
