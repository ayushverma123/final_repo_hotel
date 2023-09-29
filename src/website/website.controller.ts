import { NotFoundException } from '@nestjs/common/exceptions';
import { LoginDto } from 'src/auth/models/login.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { BookingService } from 'src/booking/booking.service';
import { CreateBookingDto } from 'src/booking/dto/createBooking-dto';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request, UsePipes, ValidationPipe , Req} from '@nestjs/common';

import { HotelService } from 'src/hotel/hotel.service';
import { GetQueryDto } from 'src/hotel/dto/query-dto';
import { BookingInterfaceResponse } from 'src/booking/interface/BookingResponse-interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomerService } from 'src/customer/customer.service';

@Controller('website')
export class WebsiteController {
  constructor(private readonly hotelService: HotelService,
        private readonly bookingService: BookingService,
        private readonly authService: AuthService,
        private readonly customerService: CustomerService
  ) {}    

  @Post('login')
  async login(@Body() data: LoginDto) {
        return await this.authService.logIn(data);
    }
 
  @Get('getlogininfo')
  @UseGuards(JwtGuard)
    async getLoginInfo(@Req() req: any) {
        const id = req.user.id;
        const user = await this.authService.getbyid(id);
        return { user: user };
    }
    
  @Get('getall')
  async getHotels(@Query() queryDto: GetQueryDto): Promise<any> {  
    return this.hotelService.getFilteredHotels(queryDto);
  }

   @UseGuards(JwtGuard)  
   @Post('create') 
    async createBooking(
        @Req() req: any,
        @Body() createBookingDto: CreateBookingDto
    ): Promise<BookingInterfaceResponse> {
        const id=req.user.id;
        return this.bookingService.createBooking(createBookingDto, id);
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

  @UseGuards(JwtGuard)
  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
      return this.bookingService.getBookingById(id);
  }
}


