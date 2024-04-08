import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  // @IsArray()
  // @IsNotEmpty()
  // menuIds: string[];
}
export class PutProductDto {
  @IsString({ message: 'Name must be a string' })
  @ValidateIf((o) => !!o.name)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @ValidateIf((o) => !!o.description)
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsString({ message: 'Image must be a string' })
  @ValidateIf((o) => !!o.image)
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image: string;

  @IsNumber()
  @ValidateIf((o) => !!o.price)
  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @IsString()
  @ValidateIf((o) => !!o.categoryId)
  @IsNotEmpty({ message: 'categoryId cannot be empty' })
  categoryId: string;

  // @IsArray()
  // @ValidateIf((o) => !!o.menuType)
  // @IsNotEmpty({ message: 'menuIds cannot be empty' })
  // menuIds?: string[];
}
