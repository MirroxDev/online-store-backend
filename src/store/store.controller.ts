import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { StoreService } from './store.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'

@Controller('stores')
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	@Auth()
	@Get('by-id/:id')
	async getById(
		@CurrentUser('id') userId: string,
		@Param('id') storeId: string
	) {
		return this.storeService.getById(storeId, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('create')
	async create(
		@CurrentUser('id') userId: string,
		@Body() dto: CreateStoreDto
	) {
		return this.storeService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(
		@Param('id') storeId: string,
		@CurrentUser('id') userId: string,
		@Body() dto: UpdateStoreDto
	) {
		return this.storeService.update(dto, userId, storeId)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(
		@Param('id') storeId: string,
		@CurrentUser('id') userId: string
	) {
		return this.storeService.delete(userId, storeId)
	}
}
