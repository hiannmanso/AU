import { Injectable } from '@nestjs/common';
import { Category } from '../interfaces/category.interface';
import { CategoryRepository } from '../repositories/category.repository';
import { throwUnauthorizedException } from '../helper/error.helper';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async create(category: Category): Promise<Category> {
    const existingCategory = await this.categoryRepository
      .findByName(category.name)
      .catch((error) => {
        throwUnauthorizedException(
          `An error occurred while finding the category by name: ${error}`,
        );
      });

    if (existingCategory) {
      throwUnauthorizedException(
        'This category already exists, please try other name.',
      );
    }

    return this.categoryRepository.create(category).catch((error) => {
      throwUnauthorizedException(
        `An error occurred while creating the category: ${error}`,
      );
    });
  }

  async update(id: string, category: Category): Promise<Category> {
    const existingCategory = await this.categoryRepository.findById(id);

    if (!existingCategory)
      throwUnauthorizedException(
        'This category does not exist. please try other id.',
      );

    return this.categoryRepository.update(id, category);
  }

  async delete(id: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory)
      throwUnauthorizedException(
        'This category does not exist. please try other id.',
      );
    return this.categoryRepository.delete(id);
  }
}
