import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';
import { MenuController } from './controllers/menu.controller';
import { MenuRepository } from './repositories/menu.repository';
import { MenuService } from './services/menu.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { MenuProductRepository } from './repositories/menuProduct.repository';

@Module({
  imports: [],
  controllers: [CategoryController, MenuController, ProductController],
  providers: [
    CategoryRepository,
    CategoryService,
    MenuRepository,
    MenuService,
    ProductRepository,
    ProductService,
    MenuProductRepository,
  ],
})
export class AppModule {}
