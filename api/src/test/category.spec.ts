import { Test } from '@nestjs/testing';

import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category.interface';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    categoryController = moduleRef.get<CategoryController>(CategoryController);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [];
      jest
        .spyOn(categoryService, 'findAll')
        .mockImplementation(async () => result);
      console.log(result);
      expect(await categoryController.findAll()).toBe(result);
    });
  });
});
