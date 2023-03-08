import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// Value Based
//
// Our mock implementation
// export class MockCoffeesService { }

// @Module({
//   providers: [
//     {
//       provide: CoffeesService,
//       useValue: new MockCoffeesService(), // <-- mock implementation
//     }
//   ]
// })
// export class CoffeesModule {}

// Non-class based provider token
//
// {
//   provide: 'COFFEE_BRANDS', // 👈
//   useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
// },

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
})
export class CoffeesModule {}
