import { Injectable } from '@nestjs/common';
import { DeleteResultProduct, Product } from '../interfaces/product.interface';
import { ProductRepository } from '../repositories/product.repository';
import { MenuProductRepository } from '../repositories/menuProduct.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { throwUnauthorizedException } from '../helper/error.helper';
import { MenuRepository } from '../repositories/menu.repository';
import { PutProductDto } from '../schemas/product.schema';

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

  async create(productData: Product): Promise<Product> {
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

    // await Promise.all(
    //   productData.menuIds.map(async (id) => {
    //     const existingMenu = await this.menuRepository.findById(id);
    //     console.log(existingMenu);
    //     if (existingMenu === null) {
    //       throwUnauthorizedException('This menu type does not exist.');
    //     }
    //   }),
    // );
    // const dataProductFromDB = { ...productData };
    // delete dataProductFromDB.menuIds;

    const createProduct = await this.productRepository.create(productData);
    if (!createProduct) {
      throwUnauthorizedException(
        'An error occurred while creating the product.',
      );
    }
    // const listMenus = [];
    // productData.menuIds.forEach((menu) => {
    //   listMenus.push({ menuId: menu, productId: createProduct.id });
    // });
    // const createMenuProduct =
    //   await this.menuProductRepository.createMany(listMenus);
    return createProduct;
  }

  async update(id: string, productData: PutProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throwUnauthorizedException(
        'This product does not exist. please try other id.',
      );
    }
    return this.productRepository.update(id, productData);
  }

  async delete(id: string): Promise<DeleteResultProduct> {
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
