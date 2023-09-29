import { Template } from 'src/entities/template.entity';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './template-dto';
import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';    

@Controller('template') 
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}   
  @Post()
  async createTemplate(@Body() templateDto: CreateTemplateDto): Promise<Template> {       
    return this.templateService.createTemplate(templateDto);
  } 

  @Get()
  async getTemplate(): Promise<Template[]> {
    return this.templateService.getTemplate();
  }

  @Get(':id')
  async getTemplatebyid(@Param('id') id: string): Promise<Template | null> {  
    return this.templateService.getTemplatebyid(id);
  }

  @Put(':id')
  async updateTemplate(
    @Param('id') id: string,
    @Body() updateDto: CreateTemplateDto
  ): Promise<Template | null> { 
    return this.templateService.updateTemplate(id, updateDto);
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string): Promise<Template | null> {  
    return this.templateService.deleteTemplate(id);
  }
}