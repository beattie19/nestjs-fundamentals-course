import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  // to create a nested url we can give the @Get decorator a name as a string
  @Get('flavours')
  flavours() {
    return 'all flavours';
  }
}
