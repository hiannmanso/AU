import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
export class PutCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @ValidateIf((o) => !!o.name)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @ValidateIf((o) => !!o.description)
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
}
