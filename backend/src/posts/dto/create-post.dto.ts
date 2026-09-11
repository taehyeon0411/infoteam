import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePostDto {
  @IsIn(["FOUND", "LOST"])
  lost_found: "FOUND" | "LOST";

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  foundLocation: string;

  @IsNotEmpty()
  foundAt: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  storageLocation?: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}
