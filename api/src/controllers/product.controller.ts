import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { DeleteResultProduct, Product } from '../interfaces/product.interface';
import { CreateProductDto, PutProductDto } from '../schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('id/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product | null> {
    return this.productService.findById(id);
  }
  @Get('category/:id')
  async getByCategoryId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product[]> {
    return this.productService.findByCategoryId(id);
  }

  @Post()
  async create(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.create(productData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: PutProductDto,
  ): Promise<Product> {
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteResultProduct> {
    return this.productService.delete(id);
  }
}
