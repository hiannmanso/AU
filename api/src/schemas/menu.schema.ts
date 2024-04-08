import { IsNotEmpty, IsString, ValidateIf, IsArray } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  type: string[];

  @IsArray()
  @IsNotEmpty()
  productsId: string[];
}
export class PutMenuDto {
  @IsString({ message: 'Name must be a string' })
  @ValidateIf((o) => !!o.name)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @ValidateIf((o) => !!o.description)
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsArray({ message: 'Type must be a array' })
  @ValidateIf((o) => !!o.type)
  @IsNotEmpty({ message: 'Type cannot be empty' })
  type: string[];

  @IsArray({ message: 'productsId must be a array' })
  @ValidateIf((o) => !!o.type)
  @IsNotEmpty({ message: 'productsId cannot be empty' })
  productsId: string[];
}
