/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryRepository } from '../repositories/category.repository';
import { Test } from '@nestjs/testing';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { Product, ProductSchemaReq } from '../interfaces/product.interface';
import { MenuProductRepository } from '../repositories/menuProduct.repository';
import { MenuRepository } from '../repositories/menu.repository';
import { MenuProduct } from 'src/interfaces/menu.interface';
import { PatchProductDto } from 'src/schemas/product.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('ProductService', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepository: ProductRepository;
  let menuProductRepository: MenuProductRepository;
  let categoryRepository: CategoryRepository;
  let menuRepository: MenuRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        ProductRepository,
        MenuProductRepository,
        MenuRepository,
        CategoryRepository,
      ],
    }).compile();

    productController = moduleRef.get<ProductController>(ProductController);
    productService = moduleRef.get<ProductService>(ProductService);
    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    menuProductRepository = moduleRef.get<MenuProductRepository>(
      MenuProductRepository,
    );
    menuRepository = moduleRef.get<MenuRepository>(MenuRepository);
    categoryRepository = moduleRef.get<CategoryRepository>(CategoryRepository);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          categoryId: '1',
          description: 'Description 1',
          price: 10,
          image: 'image1.jpg',
        },
        {
          id: '2',
          name: 'Product 2',
          categoryId: '1',
          description: 'Description 2',
          price: 20,
          image: 'image2.jpg',
        },
      ];

      jest.spyOn(productRepository, 'findAll').mockResolvedValue(mockProducts);

      const result = await productService.findAll();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('findById', () => {
    it('should return a product when a valid id is provided', async () => {
      const mockProduct: Product = {
        id: '1',
        name: 'Product 1',
        categoryId: '1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);

      const result = await productService.findById('1');

      expect(result).toEqual(mockProduct);
    });

    it('should return null when an invalid id is provided', async () => {
      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      const result = await productService.findById('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('findByCategoryId', () => {
    it('should return an array of products when a valid category id is provided', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          categoryId: '1',
          description: 'Description 1',
          price: 10,
          image: 'image1.jpg',
        },
        {
          id: '2',
          name: 'Product 2',
          categoryId: '1',
          description: 'Description 2',
          price: 20,
          image: 'image2.jpg',
        },
      ];

      jest
        .spyOn(productRepository, 'findByCategoryId')
        .mockResolvedValue(mockProducts);

      const result = await productService.findByCategoryId('1');

      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array when no products are found for the provided category id', async () => {
      jest.spyOn(productRepository, 'findByCategoryId').mockResolvedValue([]);

      const result = await productService.findByCategoryId(
        'invalid-category-id',
      );

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new product and return the result', async () => {
      const productData: ProductSchemaReq = {
        name: 'Product 1',
        categoryId: '1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
        menuType: ['lunch', 'dinner'],
      };

      jest.spyOn(productRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(categoryRepository, 'findById').mockResolvedValue({
        id: '1',
        name: 'Category Name',
        description: 'description',
      });

      jest.spyOn(menuRepository, 'findByType').mockResolvedValue({
        id: '1',
        name: 'Menu Name',
        description: 'description',
        type: 'typed',
      });

      jest.spyOn(productRepository, 'create').mockResolvedValue({
        id: '1',
        ...productData,
      });

      const menuProductData: MenuProduct[] = [
        { productId: '1', menuType: 'lunch' },
        { productId: '1', menuType: 'dinner' },
      ];

      jest
        .spyOn(menuProductRepository, 'createMany')
        .mockResolvedValue({ count: menuProductData.length });

      const result = await productService.create(productData);

      const createMenuProduct = menuProductData.map((menuProduct, index) => ({
        id: (index + 1).toString(),
        menuType: menuProduct.menuType,
        productId: '1',
      }));

      expect(result).toEqual({
        createProduct: {
          id: '1',
          ...productData,
        },
        createMenuProduct: {
          count: menuProductData.length,
        },
      });
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const existingProduct: Product = {
        id: '1',
        name: 'Existing Product',
        categoryId: '1',
        description: 'Existing Description',
        price: 20,
        image: 'existing_image.jpg',
      };

      const patchProductData: PatchProductDto = {
        description: 'New Description',
        price: 30,
      };

      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValue(existingProduct);

      jest
        .spyOn(productRepository, 'update')
        .mockImplementation((id: string, data: PatchProductDto) => {
          return Promise.resolve({ ...existingProduct, ...data });
        });

      const result = await productService.update('1', patchProductData);

      expect(result).toEqual({
        id: '1',
        name: 'Existing Product',
        categoryId: '1',
        description: 'New Description',
        price: 30,
        image: 'existing_image.jpg',
      });
    });

    it('should throw an error if the product does not exist', async () => {
      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(
        productService.update('1', {} as PatchProductDto),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('delete', () => {
    it('should delete an existing product and its related menu products', async () => {
      const existingProduct = {
        id: '1',
        name: 'Existing Product',
        categoryId: '1',
        description: 'Existing Description',
        price: 20,
        image: 'existing_image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValue(existingProduct);

      jest
        .spyOn(menuProductRepository, 'deleteByProductId')
        .mockResolvedValue(true);

      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValue(existingProduct);

      const result = await productService.delete('1');

      expect(result).toEqual({
        deleteProduct: existingProduct,
        deleteMenuProduct: true,
      });
    });

    it('should throw an error if the product does not exist', async () => {
      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.delete('1')).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
