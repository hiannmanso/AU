import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
export class PatchMenuDto {
  @IsString({ message: 'Name must be a string' })
  @ValidateIf((o) => !!o.name)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsString({ message: 'Description must be a string' })
  @ValidateIf((o) => !!o.description)
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description?: string;

  @IsString({ message: 'Type must be a string' })
  @ValidateIf((o) => !!o.type)
  @IsNotEmpty({ message: 'Type cannot be empty' })
  type?: string;
}
