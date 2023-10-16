import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';  
import { Enquiry } from 'src/entities/enquiry.entity';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/createEnquiry-dto';


@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post('create')
  async create(@Body() createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    return this.enquiryService.createEnquiry(createEnquiryDto);
  }

  @Get('getall')
  async findAll(): Promise<Enquiry[]> {
    return this.enquiryService.getAllEnquiries();
  }

  @Get('getbyid/:id')
  async findOne(@Param('id') id: string): Promise<Enquiry> {
    return this.enquiryService.getEnquiryById(id);
  }

  @Put('updatebyid/:id')
  async update(@Param('id') id: string, @Body() createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    return this.enquiryService.updateEnquiry(id, createEnquiryDto);
  }

  @Delete('deletebyid/:id')
  async remove(@Param('id') id: string): Promise<Enquiry> {
    return this.enquiryService.deleteEnquiry(id);
  }
}