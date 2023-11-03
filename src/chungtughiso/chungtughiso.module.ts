import { Module } from '@nestjs/common';
import { ChungtughisoService } from './chungtughiso.service';
import { ChungtughisoController } from './chungtughiso.controller';

@Module({
    providers:[ChungtughisoService],
    controllers: [ChungtughisoController],
    exports: [ChungtughisoService]
})
export class ChungtughisoModule {}
