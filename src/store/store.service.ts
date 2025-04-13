import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'

@Injectable()
export class StoreService {
	constructor(private prisma: PrismaService) {}

	async getById(storeId: string, userId: string) {
		const store = await this.prisma.store.findUnique({
			where: {
				id: storeId,
				userId
			}
		})

		if (!store) throw new NotFoundException('Store not found')

		return store
	}

	async create(dto: CreateStoreDto, userId: string) {
		return this.prisma.store.create({
			data: {
				title: dto.title,
				userId
			}
		})
	}
	async update(dto: UpdateStoreDto, userId: string, storeId: string) {
		await this.getById(storeId, userId)

		return this.prisma.store.update({
			where: {
				id: storeId
			},
			data: {
				...dto,
				userId
			}
		})
    }
    
	async delete(userId: string, storeId: string) {
		await this.getById(storeId, userId)

		return this.prisma.store.delete({
			where: {
				id: storeId
			}
		})
	}
}
