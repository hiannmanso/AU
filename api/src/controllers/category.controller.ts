import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
} from '@nestjs/common';
import { Category } from '../interfaces/category.interface';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../schemas/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category | null> {
    return this.categoryService.findById(id);
  }

  @Post()
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
