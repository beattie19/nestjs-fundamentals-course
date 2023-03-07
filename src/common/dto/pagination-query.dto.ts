import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  //   @Type(() => Number)
  // This is not longer needed due to the type being converted with this setting in the ValidationPipe
  //   transformOptions: {
  //     enableImplicitConversion: true,
  //   },
  limit: number;

  @IsPositive()
  @IsOptional()
  offset: number;
}
