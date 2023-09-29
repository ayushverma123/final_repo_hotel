import { CreateTemplateDto } from './template-dto';
import { Quiz } from 'src/entities/quiz.entity';                                         
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from 'src/entities/template.entity';

@Injectable()
export class TemplateService {
  constructor(@InjectModel(Template.name) private readonly templateModel: Model<Template>) {}  

  async createTemplate(templateDto: CreateTemplateDto): Promise<Template> {
    const createdTemplate = new this.templateModel(templateDto);
    return createdTemplate.save();
  }
  
  async getTemplate(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }  

  async getTemplatebyid(id: string): Promise<Template | null> {
    return this.templateModel.findById(id).exec();
  }

  async updateTemplate(id: string, updateDto: CreateTemplateDto): Promise<Template | null> {  
    return this.templateModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  };

  async deleteTemplate(id: string): Promise<Template | null> {
    return this.templateModel.findByIdAndDelete(id).exec();
  }
}