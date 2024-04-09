import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { MenuProductRepository } from '../repositories/menuProduct.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { MenuRepository } from '../repositories/menu.repository';
import { UnauthorizedException } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { PutProductDto } from '../schemas/product.schema';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        ProductRepository,
        MenuProductRepository,
        CategoryRepository,
        MenuRepository,
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    productRepository = moduleRef.get<ProductRepository>(ProductRepository);

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
          categoryId: '2',
          description: 'Description 2',
          price: 15,
          image: 'image2.jpg',
        },
      ];

      jest.spyOn(productRepository, 'findAll').mockResolvedValue(mockProducts);

      const result = await productService.findAll();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('findById', () => {
    it('should return a product by id', async () => {
      const mockProductId = '1';
      const mockProduct: Product = {
        id: mockProductId,
        name: 'Product 1',
        categoryId: '1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);

      const result = await productService.findById(mockProductId);

      expect(result).toEqual(mockProduct);
    });

    it('should return null if product with given id does not exist', async () => {
      const mockProductId = '999';

      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      const result = await productService.findById(mockProductId);

      expect(result).toBeNull();
    });
  });

  describe('findByCategoryId', () => {
    it('should return an array of products by category id', async () => {
      const mockCategoryId = '1';
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          categoryId: mockCategoryId,
          description: 'Description 1',
          price: 10,
          image: 'image1.jpg',
        },
        {
          id: '2',
          name: 'Product 2',
          categoryId: mockCategoryId,
          description: 'Description 2',
          price: 15,
          image: 'image2.jpg',
        },
      ];

      jest
        .spyOn(productRepository, 'findByCategoryId')
        .mockResolvedValue(mockProducts);

      const result = await productService.findByCategoryId(mockCategoryId);

      expect(result).toEqual(mockProducts);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProduct: Product = {
        name: 'New Product',
        categoryId: '1',
        description: 'Description',
        price: 20,
        image: 'newimage.jpg',
      };

      jest.spyOn(productRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(categoryRepository, 'findById').mockResolvedValue({} as any);
      jest.spyOn(productRepository, 'create').mockResolvedValue(mockProduct);

      const result = await productService.create(mockProduct);

      expect(result).toEqual(mockProduct);
    });

    it('should throw an exception if the product name already exists', async () => {
      const mockProduct: Product = {
        name: 'Existing Product',
        categoryId: '1',
        description: 'Description',
        price: 20,
        image: 'existingimage.jpg',
      };

      jest
        .spyOn(productRepository, 'findByName')
        .mockResolvedValue(mockProduct);

      await expect(productService.create(mockProduct)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw an exception if the category id does not exist', async () => {
      const mockProduct: Product = {
        name: 'Invalid Category Product',
        categoryId: '999', // Non-existent category id
        description: 'Description',
        price: 20,
        image: 'invalidcategoryimage.jpg',
      };

      jest.spyOn(productRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      await expect(productService.create(mockProduct)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    it('should update a product if it exists', async () => {
      const mockProductId = '1';
      const mockProduct: Product = {
        id: mockProductId,
        name: 'Product 1',
        categoryId: '1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      };

      const mockProductDto: PutProductDto = {
        name: 'Updated Product 1',
        description: 'Updated Description 1',
        price: 15,
        image: 'updatedimage.jpg',
        categoryId: '1', // Add categoryId to DTO
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({ ...mockProduct, ...mockProductDto });

      const result = await productService.update(mockProductId, mockProductDto);

      expect(result).toEqual({ ...mockProduct, ...mockProductDto });
    });

    it('should throw an exception if the product does not exist', async () => {
      const mockProductId = '999'; // Non-existent product id
      const mockProductDto: PutProductDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 15,
        image: 'updatedimage.jpg',
        categoryId: '1', // Add categoryId to DTO
      };

      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(
        productService.update(mockProductId, mockProductDto),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('delete', () => {
    // it('should delete a product if it exists', async () => {
    //   const mockProduct: Product = {
    //     id: 'b42f5f12-f8df-4a66-bae4-0a1098f104f2',
    //     name: 'alow',
    //     categoryId: 'f21bd35c-b9ad-4596-b265-308afe806244',
    //     description: '360ml',
    //     price: 15,
    //     image:
    //       'https://prezunic.vtexassets.com/arquivos/ids/191783-800-auto?v=638369662859570000&width=800&height=auto&aspect=true',
    //     createdAt: new Date('2024-04-06T21:45:50.165Z'),
    //     updatedAt: new Date('2024-04-06T21:45:50.165Z'),
    //   };

    //   jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);

    //   // jest.spyOn(productRepository, 'delete').mockResolvedValue(mockProduct);

    //   jest
    //     .spyOn(menuProductRepository, 'deleteByProductId')
    //     .mockResolvedValue({ count: 1 });

    //   const result = await productService.delete(mockProduct.id);

    //   expect(result.deleteProduct).toEqual(mockProduct);
    //   expect(result.deleteMenuProduct.count).toBe(1);
    // });

    it('should throw an exception if the product does not exist', async () => {
      const mockProductId = '999'; // Non-existent product id

      jest.spyOn(productRepository, 'findById').mockResolvedValue(null);

      await expect(productService.delete(mockProductId)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
