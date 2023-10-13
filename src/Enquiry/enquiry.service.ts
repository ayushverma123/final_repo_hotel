import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEnquiryDto } from './dto/createEnquiry-dto';
import { Enquiry } from 'src/entities/enquiry.entity';

@Injectable()
export class EnquiryService {
  constructor(@InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>) {}

  async createEnquiry(createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    const createdEnquiry = new this.enquiryModel(createEnquiryDto);
    return createdEnquiry.save();
  }

  async getAllEnquiries(): Promise<Enquiry[]> {
    return this.enquiryModel.find().exec();
  }

  async getEnquiryById(id: string): Promise<Enquiry> {
    return this.enquiryModel.findById(id).exec();
  }

  async updateEnquiry(id: string, createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    return this.enquiryModel.findByIdAndUpdate(id, createEnquiryDto, { new: true }).exec();
  }

  async deleteEnquiry(id: string): Promise<Enquiry> {
    return this.enquiryModel.findByIdAndRemove(id).exec();
  }
}
