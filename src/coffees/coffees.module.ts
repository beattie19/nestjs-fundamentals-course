import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';

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

// Class based
//
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}
// {
//   provide: ConfigService,
//   useClass:
//     process.env.NODE_ENV === 'development'
//       ? DevelopmentConfigService
//       : ProductionConfigService,
// },

// Factory based
//
// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy', 'nescafe'];
//   }
// }
//
// {
//   provide: 'COFFEE_BRANDS',
//   useFactory: () => ['buddy brew', 'nescafe']
// }

// Async provider
//
// provide: 'COFFEE_BRANDS',
// // Note "async" here, and Promise/Async event inside the Factory function
// // Could be a database connection / API call / etc
// // In our case we're just "mocking" this type of event with a Promise
// useFactory: async (connection: Connection): Promise<string[]> => {
//   // const coffeeBrands = await connection.query('SELECT * ...');
//   const coffeeBrands = await Promise.resolve([
//     'buddy brew',
//     'nescafe',
//     'mock',
//   ]);
//   return coffeeBrands;
// },
// inject: [Connection],
// },

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
})
export class CoffeesModule {}
