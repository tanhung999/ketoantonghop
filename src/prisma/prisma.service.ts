import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient{
    
    constructor(){
        
        super({
            datasources: {
                db: {
                    url:"sqlserver://localhost:1435;database=DBAccounting;user=sa;password=Hung@02011999;trustServerCertificate=true"
                }
            }
        })  
    }
}
