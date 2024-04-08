import { Injectable } from '@nestjs/common';
import { Menu } from '../interfaces/menu.interface';
import prisma from '../config/database';
import { PutMenuDto } from 'src/schemas/menu.schema';

@Injectable()
export class MenuRepository {
  constructor() {}

  async findAll(): Promise<Menu[]> {
    return prisma.menu.findMany({ include: { MenuProduct: {} } });
  }

  async findById(id: string): Promise<Menu | null> {
    return prisma.menu.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Menu | null> {
    return prisma.menu.findUnique({
      where: { name },
      include: { MenuProduct: {} },
    });
  }
  async findByType(type: string): Promise<Menu[] | null> {
    return prisma.menu.findMany({
      where: {
        type: {
          has: type,
        },
      },
      include: { MenuProduct: { include: { product: {} } } },
    });
  }
  async create(menu: Menu): Promise<Menu> {
    return prisma.menu.create({ data: menu });
  }

  async update(id: string, menu: PutMenuDto): Promise<Menu> {
    return prisma.menu.update({ where: { id }, data: menu });
  }

  async delete(id: string): Promise<Menu> {
    return prisma.menu.delete({ where: { id } });
  }
}
