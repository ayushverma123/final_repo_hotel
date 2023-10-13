import { Multer } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common/decorators';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';  
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/createHotel-dto';
import { GetQueryDto } from './dto/query-dto';
import { HotelInterfaceResponse } from './interface/HotelResponse.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';
import { Admin } from 'mongodb';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }  

  @Roles('Admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('getall')
  @UsePipes(new ValidationPipe())
  async getHotels(@Query() queryDto: GetQueryDto): Promise<any> {    
    return this.hotelService.getFilteredHotels(queryDto);
  }
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            }
        })
    }))

    async createHotel1(
        @UploadedFile() file: Express.Multer.File, // Access the uploaded file if needed
        @Body() createHotelDto: CreateHotelDto
    ): Promise<HotelInterfaceResponse | null> {
        if (file) {
            // If an image file is uploaded, you can handle it here
            // For example: save the file path to the database along with other data
            const imagePaths = file ? [file.path] : []; 
            createHotelDto.image = imagePaths;
        }
        
        return this.hotelService.createHotel(createHotelDto);
    }
  
  @Post("/upload")
  @UseInterceptors(FileInterceptor('file' , {
    storage : diskStorage({
      destination : "./uploads",
      filename : (req , file , cb) => {
        cb(null , `${file.originalname}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file : any) {
    console.log(file);
    return "success";
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @Get('getbyid/:id')
  async getHotelById(@Param('id') id: string): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.getHotelById(id);
  }
   
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('create')
  async createHotel(
    @Body() createHotelDto: CreateHotelDto
  ): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.createHotel(createHotelDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @Put('updatebyid/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: CreateHotelDto,
  ): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.updateHotel(id, updateHotelDto);
  }

  @UseGuards(JwtGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @Delete('deletebyid/:id')
  async deleteHotel(@Param('id') id: string): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.deleteHotel(id);
  }
}
