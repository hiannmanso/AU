import { Injectable } from '@nestjs/common';
import {
  CreateProductResult,
  DeleteResultProduct,
  Product,
  ProductSchemaReq,
} from '../interfaces/product.interface';
import { ProductRepository } from '../repositories/product.repository';
import { MenuProductRepository } from '../repositories/menuProduct.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { throwUnauthorizedException } from '../helper/error.helper';
import { MenuRepository } from '../repositories/menu.repository';
import { PatchProductDto } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly menuProductRepository: MenuProductRepository,
    private readonly menuRepository: MenuRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async findByCategoryId(id: string): Promise<Product[]> {
    return this.productRepository.findByCategoryId(id);
  }
  async create(productData: ProductSchemaReq): Promise<CreateProductResult> {
    const existingProduct = await this.productRepository.findByName(
      productData.name,
    );
    if (existingProduct) {
      throwUnauthorizedException(
        'This product already exists. please try other name.',
      );
    }
    const existingCategory = await this.categoryRepository.findById(
      productData.categoryId,
    );
    if (!existingCategory) {
      throwUnauthorizedException('This category does not exist.');
    }
    await Promise.all(
      productData.menuType.map(async (menuType) => {
        const existingMenuType = await this.menuRepository.findByType(menuType);
        if (existingMenuType === null) {
          throwUnauthorizedException('This menu type does not exist.');
        }
      }),
    );
    const dataProductFromDB = { ...productData };
    delete dataProductFromDB.menuType;
    console.log(dataProductFromDB);
    const createProduct =
      await this.productRepository.create(dataProductFromDB);
    if (!createProduct) {
      throwUnauthorizedException(
        'An error occurred while creating the product.',
      );
    }
    const listMenus = [];
    productData.menuType.forEach((menu) => {
      listMenus.push({ menuType: menu, productId: createProduct.id });
    });
    const createMenuProduct =
      await this.menuProductRepository.createMany(listMenus);
    return { createProduct, createMenuProduct };
  }

  async update(id: string, productData: PatchProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throwUnauthorizedException(
        'This product does not exist. please try other id.',
      );
    }
    return this.productRepository.update(id, productData);
  }

  async delete(id: string): Promise<DeleteResultProduct> {
    console.log(id);
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throwUnauthorizedException(
        'This product does not exist. please try other id.',
      );
    }
    const deleteMenuProduct =
      await this.menuProductRepository.deleteByProductId(id);
    const deleteProduct = await this.productRepository.delete(id);
    return { deleteProduct, deleteMenuProduct };
  }
}
