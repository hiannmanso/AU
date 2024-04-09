import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from '../services/menu.service';
import { MenuRepository } from '../repositories/menu.repository';
import { ProductRepository } from '../repositories/product.repository';
import { MenuProductRepository } from '../repositories/menuProduct.repository';
import { UnauthorizedException } from '@nestjs/common';
import { Menu, MenuWithProducts } from '../interfaces/menu.interface';
import { PutMenuDto } from '../schemas/menu.schema';

describe('MenuService', () => {
  let menuService: MenuService;
  let menuRepository: MenuRepository;
  let productRepository: ProductRepository;
  let menuProductRepository: MenuProductRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        MenuRepository,
        ProductRepository,
        MenuProductRepository,
      ],
    }).compile();

    menuService = moduleRef.get<MenuService>(MenuService);
    menuRepository = moduleRef.get<MenuRepository>(MenuRepository);
    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    menuProductRepository = moduleRef.get<MenuProductRepository>(
      MenuProductRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      const mockMenus: Menu[] = [
        {
          id: '1',
          name: 'Menu 1',
          type: ['lunch'],
          description: 'Menu 1 desc',
        },
        {
          id: '2',
          name: 'Menu 2',
          type: ['dinner'],
          description: 'Menu 2 desc',
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
      const mockMenu: Menu = {
        id: mockMenuId,
        name: 'Menu 1',
        type: ['lunch'],
        description: 'Menu 1 desc',
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
    it('should return current menu based on time', async () => {
      // Simulate "night" menu for evening time (18h-6h)
      const mockNightMenu: Menu[] = [
        {
          id: '3',
          name: 'Night Menu',
          type: ['dinner'],
          description: 'Night menu desc',
        },
      ];

      jest.spyOn(menuRepository, 'findByType').mockResolvedValue(mockNightMenu);

      const result = await menuService.findCurrentMenu();

      expect(result).toEqual(mockNightMenu);
    });
  });

  describe('create', () => {
    it('should create a new menu with associated products', async () => {
      const mockMenuWithProducts: MenuWithProducts = {
        name: 'New Menu',
        type: ['lunch'],
        description: 'New menu desc',
        productsId: ['1', '2'], // Mock product IDs
      };

      const mockCreatedMenu: Menu = { id: '4', ...mockMenuWithProducts };

      jest.spyOn(menuRepository, 'findByName').mockResolvedValue(null);
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce({ id: '1', name: 'Product 1' } as any);
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce({ id: '2', name: 'Product 2' } as any);
      jest.spyOn(menuRepository, 'create').mockResolvedValue(mockCreatedMenu);

      const result = await menuService.create(mockMenuWithProducts);

      expect(result.menuData).toEqual(mockCreatedMenu);
      expect(result.registerProductsOnMenu.count).toBe(
        mockMenuWithProducts.productsId.length,
      );
    });
  });

  describe('update', () => {
    it('should update a menu with new information', async () => {
      const mockMenuId = '1';
      const mockUpdatedMenu: PutMenuDto = {
        name: 'Updated Menu',
        type: ['lunch'],
        description: 'Updated menu desc',
        productsId: ['3', '4'],
      };

      const mockExistingMenu: Menu = {
        id: mockMenuId,
        name: 'Existing Menu',
        type: ['lunch'],
        description: 'Existing menu desc',
      };

      jest
        .spyOn(menuRepository, 'findById')
        .mockResolvedValue(mockExistingMenu);
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce({ id: '3', name: 'Product 3' } as any);
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce({ id: '4', name: 'Product 4' } as any);
      jest
        .spyOn(menuRepository, 'update')
        .mockResolvedValue({ ...mockExistingMenu, ...mockUpdatedMenu });

      const result = await menuService.update(mockMenuId, mockUpdatedMenu);

      expect(result.updateMenu.name).toBe(mockUpdatedMenu.name);
      expect(result.resultPopulateMenuProduct.count).toBe(
        mockUpdatedMenu.productsId.length,
      );
    });
  });

  describe('delete', () => {
    it('should delete a menu by id', async () => {
      const mockMenuId = '1';
      const mockExistingMenu: Menu = {
        id: mockMenuId,
        name: 'Existing Menu',
        type: ['lunch'],
        description: 'Existing menu desc',
      };

      jest
        .spyOn(menuRepository, 'findById')
        .mockResolvedValue(mockExistingMenu);
      jest
        .spyOn(menuProductRepository, 'deleteByMenuId')
        .mockResolvedValue({ count: 2 });
      jest.spyOn(menuRepository, 'delete').mockResolvedValue(mockExistingMenu);

      const result = await menuService.delete(mockMenuId);

      expect(result.result).toEqual(mockExistingMenu);
      expect(result.deleteProductMenu.count).toBe(2);
    });

    it('should throw UnauthorizedException if menu with given id does not exist', async () => {
      const mockMenuId = '999';

      jest.spyOn(menuRepository, 'findById').mockResolvedValue(null);

      await expect(menuService.delete(mockMenuId)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
