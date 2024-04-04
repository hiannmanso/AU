/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';

import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { Category, CategoryPatch } from '../interfaces/category.interface';
import { CategoryRepository } from '../repositories/category.repository';

describe('CategoryService', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, CategoryRepository],
    }).compile();

    categoryController = moduleRef.get<CategoryController>(CategoryController);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryRepository = moduleRef.get<CategoryRepository>(CategoryRepository);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      // Mocking the data returned by the service
      const categories: Category[] = [
        { id: '1', name: 'Category 1', description: 'Description 1' },
        { id: '2', name: 'Category 2', description: 'Description 2' },
      ];

      // Mocking the service method to return the categories
      jest.spyOn(categoryService, 'findAll').mockResolvedValue(categories);

      // Calling the controller method
      const result = await categoryController.findAll();
      // Expecting the result to be the same as the mocked categories
      expect(result).toEqual(categories);
    });
  });

  describe('findById', () => {
    it('should return a category when found', async () => {
      const categoryId = '1';
      const category: Category = {
        id: categoryId,
        name: 'Category 1',
        description: 'Description 1',
      };

      // Mockando o retorno do método findById do CategoryRepository
      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(category);

      // Chamando o método findById do CategoryService
      const result = await categoryService.findById(categoryId);

      // Esperando que o resultado seja a mesma categoria mockada
      expect(result).toEqual(category);
    });

    it('should return null when not found', async () => {
      const categoryId = '1';

      // Mockando o retorno do método findById do CategoryRepository como null
      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      // Chamando o método findById do CategoryService
      const result = await categoryService.findById(categoryId);

      // Esperando que o resultado seja null
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should throw an error when an error occurs while finding the category by name', async () => {
      const category: Category = {
        name: 'Test',
        description: 'Test description',
      };

      jest
        .spyOn(categoryRepository, 'findByName')
        .mockRejectedValue(new Error('Database error'));

      await expect(categoryService.create(category)).rejects.toThrowError(
        'Unauthorized Exception',
      );
    });

    it('should throw an error when the category already exists', async () => {
      const category: Category = {
        name: 'Test',
        description: 'Test description',
      };

      jest.spyOn(categoryRepository, 'findByName').mockResolvedValue(category);

      await expect(categoryService.create(category)).rejects.toThrowError(
        'Unauthorized Exception',
      );
    });

    it('should throw an error when an error occurs while creating the category', async () => {
      const category: Category = {
        name: 'Test',
        description: 'Test description',
      };

      jest.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
      jest
        .spyOn(categoryRepository, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(categoryService.create(category)).rejects.toThrowError(
        'Unauthorized Exception',
      );
    });

    it('should create the category successfully', async () => {
      const category: Category = {
        name: 'Test',
        description: 'Test description',
      };

      jest.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(categoryRepository, 'create').mockResolvedValue(category);

      const createdCategory = await categoryService.create(category);

      expect(createdCategory).toEqual(category);
    });
  });
  describe('update', () => {
    it('should throw an error when the category does not exist', async () => {
      const categoryId = 'nonexistent-id';
      const categoryPatch: CategoryPatch = { name: 'Updated name' };

      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      await expect(
        categoryService.update(categoryId, categoryPatch),
      ).rejects.toThrowError('Unauthorized Exception');
    });

    it('should update the category successfully', async () => {
      const categoryId = 'existing-id';
      const existingCategory = {
        id: categoryId,
        name: 'Original name',
        description: 'Original description',
      };
      const updatedCategory: CategoryPatch = { name: 'Updated name' };

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValue(existingCategory);
      jest
        .spyOn(categoryRepository, 'update')
        .mockResolvedValue({ ...existingCategory, ...updatedCategory });

      const updated = await categoryService.update(categoryId, updatedCategory);

      expect(updated).toEqual({ ...existingCategory, ...updatedCategory });
    });
  });
  describe('delete', () => {
    it('should throw an error when the category does not exist', async () => {
      const categoryId = 'nonexistent-id';

      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      await expect(categoryService.delete(categoryId)).rejects.toThrowError(
        'Unauthorized Exception',
      );
    });

    it('should delete the category successfully', async () => {
      const categoryId = 'existing-id';
      const existingCategory = {
        id: categoryId,
        name: 'Existing category',
        description: 'Existing description',
      };

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValue(existingCategory);
      jest
        .spyOn(categoryRepository, 'delete')
        .mockResolvedValue(existingCategory);

      const deleted = await categoryService.delete(categoryId);

      expect(deleted).toEqual(existingCategory);
    });
  });
});
