import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {}
}
