import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { UnauthorizedException } from '@nestjs/common';
import { Category, CategoryPatch } from '../interfaces/category.interface';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, CategoryRepository],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryRepository = moduleRef.get<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories: Category[] = [
        { id: '1', name: 'Category 1', description: 'Category 1 desc' },
        { id: '2', name: 'Category 2', description: 'Category 2 desc' },
      ];

      jest
        .spyOn(categoryRepository, 'findAll')
        .mockResolvedValue(mockCategories);

      const result = await categoryService.findAll();

      expect(result).toEqual(mockCategories);
    });
  });

  describe('findById', () => {
    it('should return a category by id', async () => {
      const mockCategoryId = '1';
      const mockCategory: Category = {
        id: mockCategoryId,
        name: 'Category 1',
        description: 'Category 1 desc',
      };

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValue(mockCategory);

      const result = await categoryService.findById(mockCategoryId);

      expect(result).toEqual(mockCategory);
    });

    it('should return null if category with given id does not exist', async () => {
      const mockCategoryId = '999';

      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      const result = await categoryService.findById(mockCategoryId);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const mockCategory: Category = {
        name: 'New Category',
        description: 'New category desc',
      };
      const mockCreatedCategory: Category = { id: '3', ...mockCategory };

      jest.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
      jest
        .spyOn(categoryRepository, 'create')
        .mockResolvedValue(mockCreatedCategory);

      const result = await categoryService.create(mockCategory);

      expect(result).toEqual(mockCreatedCategory);
    });

    it('should throw UnauthorizedException if category with same name already exists', async () => {
      const mockCategory: Category = {
        name: 'Existing Category',
        description: 'Existing category desc',
      };

      jest
        .spyOn(categoryRepository, 'findByName')
        .mockResolvedValue(mockCategory);

      await expect(categoryService.create(mockCategory)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const mockCategoryId = '1';
      const mockUpdatedCategory: CategoryPatch = {
        name: 'Updated Category',
        description: 'Updated category desc',
      };

      const mockExistingCategory: Category = {
        id: mockCategoryId,
        name: 'Existing Category',
        description: 'Existing category desc',
      };

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValue(mockExistingCategory);
      jest
        .spyOn(categoryRepository, 'update')
        .mockResolvedValue({ ...mockExistingCategory, ...mockUpdatedCategory });

      const result = await categoryService.update(
        mockCategoryId,
        mockUpdatedCategory,
      );

      expect(result).toEqual({
        ...mockExistingCategory,
        ...mockUpdatedCategory,
      });
    });

    it('should throw UnauthorizedException if category with given id does not exist', async () => {
      const mockCategoryId = '999';
      const mockUpdatedCategory: CategoryPatch = {
        name: 'Updated Category',
        description: 'Updated category desc',
      };

      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      await expect(
        categoryService.update(mockCategoryId, mockUpdatedCategory),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('delete', () => {
    it('should delete a category by id', async () => {
      const mockCategoryId = '1';
      const mockExistingCategory: Category = {
        id: mockCategoryId,
        name: 'Existing Category',
        description: 'Existing category desc',
      };

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValue(mockExistingCategory);
      jest
        .spyOn(categoryRepository, 'delete')
        .mockResolvedValue(mockExistingCategory);

      const result = await categoryService.delete(mockCategoryId);

      expect(result).toEqual(mockExistingCategory);
    });

    it('should throw UnauthorizedException if category with given id does not exist', async () => {
      const mockCategoryId = '999';

      jest.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      await expect(categoryService.delete(mockCategoryId)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
