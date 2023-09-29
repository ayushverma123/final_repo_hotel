import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from '@nestjs/common/decorators';  
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';  
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Req} from '@nestjs/common';  
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { CustomerService } from './customer.service';
import { GetQueryDto } from './dto/query-dto';
import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { UpdateCustomerDto } from './dto/updateCustomer-dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @UseGuards(JwtGuard)
  @Get('getall')
  async getCustomers(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.customerService.getFilteredCustomers(queryDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Get('getbyid/:id')
  async getCustomerById(
    @Param('id') id: string
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.getCustomerById(id);
  }
  
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('create')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<CustomerInterfaceResponse> {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Put('updatebyid/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }  

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Delete('deletebyid/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerInterfaceResponse | null> { 
    return this.customerService.deleteCustomer(id);
  }

  @UseGuards(JwtGuard)
  @Put('change-password')
  async changerCustomerPassword(
    @Req() req: any,
    @Body() body: { oldPassword: string , newPassword: string }): Promise<any> {
    const id=req.user.id;
    const { oldPassword, newPassword } = body;

    // Verify OTP and reset password
    const User = await this.customerService.getCustomerById(id);
    if (User) {
      const Password = await this.customerService.changePassword(id, oldPassword, newPassword);
      return { message: 'Password changed successfully' }
    }
    else {
      throw new NotFoundException("Cannot reset password");
    }
  }  
}