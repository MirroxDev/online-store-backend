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
import { ColorService } from './color.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ColorDto } from './dto/color.dto'

@Controller('colors')
export class ColorController {
	constructor(private readonly colorService: ColorService) {}

	@Auth()
	@Get('by-storeId/:storeId')
	async getByStoreId(@Param('id') storeId: string) {
		return this.colorService.getByStoreId(storeId)
	}

	@Auth()
	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.colorService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('create/:storeId')
	async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
		return this.colorService.create(dto, storeId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(
		@Param('id') colorId: string,
		@Body() dto: ColorDto
	) {
		return this.colorService.update(dto, colorId)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(
		@Param('id') colorId: string,
	) {
		return this.colorService.delete(colorId)
	}
}
