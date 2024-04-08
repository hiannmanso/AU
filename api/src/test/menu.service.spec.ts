/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { MenuController } from '../controllers/menu.controller';
import { MenuService } from '../services/menu.service';
import { MenuRepository } from '../repositories/menu.repository';
import { Menu } from 'src/interfaces/menu.interface';
import { PatchMenuDto } from 'src/schemas/menu.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('MenuService', () => {
  let menuController: MenuController;
  let menuService: MenuService;
  let menuRepository: MenuRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, MenuRepository],
    }).compile();

    menuController = moduleRef.get<MenuController>(MenuController);
    menuService = moduleRef.get<MenuService>(MenuService);
    menuRepository = moduleRef.get<MenuRepository>(MenuRepository);
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      const mockMenus = [
        { id: '1', name: 'Menu 1', description: 'Description 1', type: 'day' },
        {
          id: '2',
          name: 'Menu 2',
          description: 'Description 2',
          type: 'night',
        },
      ];

      jest.spyOn(menuRepository, 'findAll').mockResolvedValue(mockMenus);

      const result = await menuService.findAll();

      expect(result).toEqual(mockMenus);
    });
  });

  describe('findById', () => {
    it('should return a menu by id', async () => {
      const mockMenuId = '1';
      const mockMenu = {
        id: mockMenuId,
        name: 'Menu 1',
        description: 'Description 1',
        type: 'day',
      };

      jest.spyOn(menuRepository, 'findById').mockResolvedValue(mockMenu);

      const result = await menuService.findById(mockMenuId);

      expect(result).toEqual(mockMenu);
    });

    it('should return null if menu with given id does not exist', async () => {
      const mockMenuId = '999';

      jest.spyOn(menuRepository, 'findById').mockResolvedValue(null);

      const result = await menuService.findById(mockMenuId);

      expect(result).toBeNull();
    });
  });

  describe('findCurrentMenu', () => {
    it('should return the menu for the current time (day)', async () => {
      const mockDate = new Date();
      mockDate.setHours(12);
      const mockDayMenu: Menu = {
        id: '1',
        name: 'Day Menu',
        type: 'day',
        description: 'teste',
      };

      jest
        .spyOn(menuRepository, 'findByType')
        .mockResolvedValueOnce([mockDayMenu]);

      const realDateNow = Date.now;
      Date.now = jest.fn(() => mockDate.getTime());

      const result = await menuService.findCurrentMenu();

      expect(result).toBeDefined();
      expect(result[0].type).toBe('day');

      Date.now = realDateNow;
    });

    it('should return the menu for the current time (night)', async () => {
      const mockDate = new Date();
      mockDate.setHours(22);
      const mockNightMenu: Menu = {
        id: '2',
        name: 'Night Menu',
        type: 'night',
        description: 'teste',
      };

      jest
        .spyOn(menuRepository, 'findByType')
        .mockResolvedValueOnce([mockNightMenu]);

      const realDateNow = Date.now;
      Date.now = jest.fn(() => mockDate.getTime());

      const result = await menuService.findCurrentMenu();

      expect(result).toBeDefined();
      expect(result[0].type).toBe('night');

      Date.now = realDateNow;
    });
  });

  describe('create', () => {
    it('should create a new menu', async () => {
      const mockMenu: Menu = {
        id: '1',
        name: 'New Menu',
        type: 'day',
        description: 'teste',
      };

      jest.spyOn(menuRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(menuRepository, 'create').mockResolvedValue(mockMenu);

      const result = await menuService.create(mockMenu);

      expect(result).toEqual(mockMenu);
      expect(menuRepository.findByName).toHaveBeenCalledWith(mockMenu.name);
      expect(menuRepository.create).toHaveBeenCalledWith(mockMenu);
    });
    it('should throw an exception if the menu already exists', async () => {
      jest.spyOn(menuRepository, 'findByName').mockResolvedValue({
        id: '1',
        name: 'Existing Menu',
        description: 'Description',
        type: 'day',
      });

      const newMenu: Menu = {
        name: 'Existing Menu',
        description: 'Description',
        type: 'day',
      };

      await expect(menuService.create(newMenu)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    it('should update a menu if it exists', async () => {
      const id = '1';
      const mockMenu: Menu = {
        id: '1',
        name: 'Menu 1',
        description: 'Description 1',
        type: 'day',
      };
      const mockMenuPatch: PatchMenuDto = {
        name: 'Updated Menu 1',
        description: 'Updated Description 1',
      };

      jest.spyOn(menuRepository, 'findById').mockResolvedValue(mockMenu);
      jest.spyOn(menuRepository, 'update').mockResolvedValue({
        ...mockMenu,
        ...mockMenuPatch,
      });

      const result = await menuService.update(id, mockMenuPatch);

      expect(menuRepository.update).toHaveBeenCalledWith(id, mockMenuPatch);
      expect(result).toEqual({ ...mockMenu, ...mockMenuPatch });
    });
  });

  describe('delete', () => {
    it('should delete a menu if it exists', async () => {
      const id = '1';
      const mockMenu: Menu = {
        id: '1',
        name: 'Menu 1',
        description: 'Description 1',
        type: 'day',
      };

      jest.spyOn(menuRepository, 'findById').mockResolvedValue(mockMenu);
      jest.spyOn(menuRepository, 'delete').mockResolvedValue(mockMenu);

      const result = await menuService.delete(id);

      expect(menuRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockMenu);
    });
  });
});
