// src/controllers/menu.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Menu } from '../interfaces/menu.interface';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto, PatchMenuDto } from 'src/schemas/menu.schema';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Menu | null> {
    return this.menuService.findById(id);
  }

  @Get('now')
  async findMenuNow(): Promise<Menu | null> {
    return this.menuService.findMenuNow();
  }

  @Post()
  async create(@Body() menu: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(menu);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() menu: PatchMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(id, menu);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
