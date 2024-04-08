import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  BodyPutMenuResponse,
  DeleteMenuBody,
  Menu,
  MenuInfo,
} from '../interfaces/menu.interface';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto } from '../schemas/menu.schema';

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

  @Get('current')
  async findCurrentMenu(): Promise<Menu[] | null> {
    return this.menuService.findCurrentMenu();
  }

  @Post()
  async create(@Body() menu: CreateMenuDto): Promise<MenuInfo | null> {
    return this.menuService.create(menu);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() menu: CreateMenuDto,
  ): Promise<BodyPutMenuResponse> {
    return this.menuService.update(id, menu);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteMenuBody> {
    return this.menuService.delete(id);
  }
}
