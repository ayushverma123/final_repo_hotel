import { MailerService} from "@nestjs-modules/mailer";
import { Controller, Get, Query } from '@nestjs/common';

@Controller('email')
export class EmailController {
    constructor(private mailService: MailerService){} 

    @Get('plain-text-email')
    async plainTextEmail(@Query('toemail') toemail){  
        await this.mailService.sendMail({
            to: toemail,
            from:'ayushv657@gmail.com',
            subject:'Simple Plain Text',
            template:'email'
        });
        return 'success';
    }
}






