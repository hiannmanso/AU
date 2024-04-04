// src/services/menu.service.ts
import { Injectable } from '@nestjs/common';
import { Menu } from '../interfaces/menu.interface';
import { MenuRepository } from 'src/repositories/menu.repository';
import { PatchMenuDto } from 'src/schemas/menu.schema';
import { throwUnauthorizedException } from 'src/helper/error.helper';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.findAll();
  }

  async findById(id: string): Promise<Menu | null> {
    return this.menuRepository.findById(id);
  }
  async findMenuNow() {
    const currentHour = new Date().getHours();
    let menuType: string;
    if (currentHour < 6 || currentHour >= 18) {
      menuType = 'night';
    } else {
      menuType = 'day';
    }
    const result = await this.menuRepository.findByType(menuType);
    return result;
  }

  async create(menu: Menu): Promise<Menu> {
    const existingMenu = await this.menuRepository.findByName(menu.name);
    if (existingMenu) {
      throwUnauthorizedException(
        'This menu already exists. please try other name',
      );
    }

    return this.menuRepository.create(menu);
  }

  async update(id: string, menu: PatchMenuDto): Promise<Menu> {
    const existingMenu = await this.menuRepository.findById(id);
    if (!existingMenu) {
      throwUnauthorizedException('This menu does not exist.');
    }
    return this.menuRepository.update(id, menu);
  }

  async delete(id: string): Promise<Menu> {
    const existingMenu = await this.menuRepository.findById(id);
    if (!existingMenu) {
      throwUnauthorizedException('This menu does not exist.');
    }
    return this.menuRepository.delete(id);
  }
}
