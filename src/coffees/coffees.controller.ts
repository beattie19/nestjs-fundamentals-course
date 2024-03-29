import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { SetMetadata } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocal.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Applies to all routes
// @UsePipes(ValidationPipe)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeeService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // Applies to only this route
  // @UsePipes(ValidationPipe)

  // Custom public decorator
  // @Public()

  // Swagger - two ways to do the same thing
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })

  @Public()
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  async findAll(
    // @Protocol() protocol: string,
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // Arbitrarily set timeout longer than the TimeoutInterceptor
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('protocol', protocol);

    return this.coffeeService.findAll(paginationQuery);
  }

  // to create a nested url we can give the @Get decorator a name as a string
  @Get('flavours')
  flavours() {
    return 'all flavours';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.coffeeService.findOne(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body) {
  //   return this.coffeeService.create(body);
  // }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  // Validation pipe only applied to body, not id.
  //   update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeeService.remove(id);
  }
}
