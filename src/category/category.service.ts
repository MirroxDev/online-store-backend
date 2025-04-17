import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getByStoreId(storeId: string) {
		return this.prisma.category.findMany({
			where: {
				storeId
			}
		})
	}

	async getById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			}
		})

		if (!category) throw new NotFoundException('category not found')

		return category
	}

	async create(dto: CategoryDto, storeId: string) {
		return this.prisma.category.create({
			data: {
				title: dto.title,
				description: dto.description,
				storeId
			}
		})
	}
	async update(dto: CategoryDto, id: string) {
		await this.getById(id)

		return this.prisma.category.update({
			where: {
				id
			},
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
