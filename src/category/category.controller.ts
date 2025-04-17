import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {

  }
  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('id') storeId: string) {
    return this.categoryService.getByStoreId(storeId)
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create/:storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(dto, storeId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') colorId: string,
    @Body() dto: CategoryDto
  ) {
    return this.categoryService.update(dto, colorId)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id') colorId: string,
  ) {
    return this.categoryService.delete(colorId)
  }
}
