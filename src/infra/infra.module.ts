import { Module } from '@nestjs/common';
import { PrismaService } from './gateways/connections/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class InfraModule {}
