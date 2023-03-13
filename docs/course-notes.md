- [NestJS Official Course](#nestjs-official-course)
- [Chapter 1](#chapter-1)
  - [Intro](#intro)
  - [Installation](#installation)
  - [Structure](#structure)
- [Chapter 2](#chapter-2)
  - [Running in Development mode](#running-in-development-mode)
  - [Scaffolding Controller](#scaffolding-controller)
  - [Route Parameters](#route-parameters)
  - [Handling Request body/payload](#handling-request-bodypayload)
  - [Response Status Codes](#response-status-codes)
  - [Handle update and delete requests](#handle-update-and-delete-requests)
  - [Pagination with Query Params](#pagination-with-query-params)
  - [Create Basic Service](#create-basic-service)
  - [Send User-Friendly Error Messages](#send-user-friendly-error-messages)
  - [**Encompass Business-Domain in Modules**](#encompass-business-domain-in-modules)
  - [**Introduction to Data Transfer Objects**](#introduction-to-data-transfer-objects)
  - [**Validate Input Data with Data Transfer Objects**](#validate-input-data-with-data-transfer-objects)
  - [****Handling Malicious Request Data****](#handling-malicious-request-data)
  - [****Auto-transform Payloads to DTO instances****](#auto-transform-payloads-to-dto-instances)
- [Chapter 3](#chapter-3)
  - [Running PostgresSQL](#running-postgressql)
  - [Introducing the TypeORM Module](#introducing-the-typeorm-module)
  - [Creating a TypeORM Entity](#creating-a-typeorm-entity)
  - [**Using Repository to Access Database**](#using-repository-to-access-database)
  - [Create Relation between two Entities](#create-relation-between-two-entities)
    - [There are three types of relations:](#there-are-three-types-of-relations)
  - [**Retrieve Entities with their Relations**](#retrieve-entities-with-their-relations)
  - [**Using Cascading Inserts and Updates**](#using-cascading-inserts-and-updates)
  - [Adding Pagination](#adding-pagination)
  - [Use Transactions](#use-transactions)
  - [Adding Indexes to Entities](#adding-indexes-to-entities)
  - [Setting up Migrations](#setting-up-migrations)
- [Chapter 4](#chapter-4)
  - [Understanding Dependency Injection](#understanding-dependency-injection)
  - [Control NestJS Module Encapsulation](#control-nestjs-module-encapsulation)
  - [Diving into Custom Providers](#diving-into-custom-providers)
    - [Value based providers](#value-based-providers)
    - [**Non-class-based Provider Tokens**](#non-class-based-provider-tokens)
    - [Class Providers](#class-providers)
    - [Factory Providers](#factory-providers)
    - [**Leverage Async Providers**](#leverage-async-providers)
    - [Create a Dynamic Module](#create-a-dynamic-module)
    - [Control Providers Scope](#control-providers-scope)
    - [**Diving Deeper Into Request-Scoped Providers**](#diving-deeper-into-request-scoped-providers)
- [Chapter 5](#chapter-5)
  - [**Introducing the Config Module**](#introducing-the-config-module)
  - [Custom Environment File Paths](#custom-environment-file-paths)
  - [Schema Validation](#schema-validation)
  - [**Using the Config Service**](#using-the-config-service)
  - [**Custom Configuration Files**](#custom-configuration-files)
  - [**Configuration Namespaces and Partial Registration**](#configuration-namespaces-and-partial-registration)
  - [**Asynchronously Configure Dynamic Modules**](#asynchronously-configure-dynamic-modules)
- [Chapter 6 - Other Building Blocks by Example](#chapter-6---other-building-blocks-by-example)
  - [**Introducing More Building Blocks**](#introducing-more-building-blocks)
  - [**Understanding Binding Techniques**](#understanding-binding-techniques)
  - [**Catch Exceptions with Filters**](#catch-exceptions-with-filters)
  - [**Protect Routes with Guards**](#protect-routes-with-guards)
  - [**Using Metadata to Build Generic Guards or Interceptors**](#using-metadata-to-build-generic-guards-or-interceptors)
  - [**Add Pointcuts with Interceptors**](#add-pointcuts-with-interceptors)
  - [Interceptors make it possible for us to:](#interceptors-make-it-possible-for-us-to)
  - [**Handling Timeouts with Interceptors**](#handling-timeouts-with-interceptors)
  - [**Creating Custom Pipes**](#creating-custom-pipes)
  - [**Bonus: Add Request Logging with Middleware**](#bonus-add-request-logging-with-middleware)
  - [**Bonus: Create Custom Param Decorators**](#bonus-create-custom-param-decorators)
- [Chapter 7 - Generating OpenAPI Specification](#chapter-7---generating-openapi-specification)
  - [Introducing the Swagger Module](#introducing-the-swagger-module)
  - [**Enabling CLI Plugin**](#enabling-cli-plugin)
  - [**Decorating Model Properties**](#decorating-model-properties)
  - [Add Example Responses](#add-example-responses)
  - [Using Tags to Group Resources](#using-tags-to-group-resources)
- [Testing](#testing)
  - [Introduction to Jest](#introduction-to-jest)
  - [**Getting Started with Test Suites**](#getting-started-with-test-suites)
    - [How are they different?](#how-are-they-different)
  - [**Adding Unit Tests**](#adding-unit-tests)
  - [Diving into e2e tests](#diving-into-e2e-tests)
  - [**Creating our First e2e Test**](#creating-our-first-e2e-test)
  - [**Implementing e2e Test Logic**](#implementing-e2e-test-logic)

# NestJS Official Course

Nest building blocks can be:

```
Globally-scoped,
Controller-scoped,
Method-scoped,
And (the bonus 4th one) Param-scoped which as we said, is available to Pipes only.

```

<br><br>
# Chapter 1

## Intro

NestJS tackles complicated set up issues with services like express by creating an abstraction or overall framework around Node.JS - This ensures a more simple set up and set of guardrails.

OotB - Scalable - loosley coupled - testable, maintainable.

Express is the default http framework used with NestJS but Fastify or others can be used instead though may require using other custom libraries to make it work.

## Installation

Install Node

Install NestJS globally - npm i -g @nestjs/cli

Confrim install nest --version

## Structure

Main.ts is the entrypoint where the app is bootstrapped.

What is AppModule? - the root modules contains everything required to ensure the app runs.

What is inside app controller? A controller is just another class but it has the @Controller decorator.

Will will learn how functionality can be split into modules allowing better resusability

<br><br>
# Chapter 2

## Running in Development mode

`npm run start:dev`

App will compile as we make changes and save. It rebuilds and restarts the server.

## Scaffolding Controller

`nest g co`

`nest generate controller`

`nest g co --no-spec` - controller without test

`nest generate controller modules/abc`  - for custom location

This automatically creates a controller and corresponding test file.

The controller was automatically added to the AppModule.

Controller decorator will route requests to a specific controller action.

## Route Parameters

```jsx
/* CoffeesController FINAL CODE */
import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

	//Here we have opted to directly retrive the id, but it's
	// possible to swap out 'id' for 'params' and use 'param.id'
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }
}
```

## Handling Request body/payload

```jsx
/* CoffeesController FINAL CODE */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }
}
```

If you only want a specific value from the body you can provide a string as an argument to the Body decorator. NOTE that fields that are not specified are not validated.

```jsx
// {
//     "name": "old florisa",
//     "brand": "Buddy brew"
// }

@Post()
  create(@Body('name') body) {
    return body;  
  }

// Will rerturn 'old florisa'
```

## Response Status Codes

The below is an example of how to use this for a static return value on the controller action. 

```jsx
/* 
  💡 BEST PRACTICE 💡
  
  HttpCode decorator 
  HttpStatus Enum usage example
  
  (Both from @nestjs/common)
*/

import { /* ... */ HttpStatus, HttpCode } from '@nestjs/common';

@Post()
@HttpCode(HttpStatus.GONE) // 👈
create(@Body() body) {
    // ...
}

/* 
  @Res() param decorator
  Using underlying platform Response objects (from Express.js or Fastify)
  
  🚨 Remember to use this with caution (as our code can become platform-dependent)
*/
import { /* ... */ Res } from '@nestjs/common';

@Get()
findAll(@Res() response) { 
  // Express.js example using status() and send() methods 
  response.status(200).send(‘This action returns all coffees’);
```

The second approach where we inject the Response object can be useful and allows more control around things like status code and header, but the downside is that you may lose features that depend on Nest standard response handling such as interceptors and httpcode decorator.

## Handle update and delete requests

`Put` request replaces the entire resource so we need to pass the entire object.

`Patch` only needs the fields that need to change as a partial change.

```jsx
/* CoffeesController FINAL CODE */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
```

## Pagination with Query Params

```jsx
@Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
  }
```

We want to use pagination because it’s possible to return massive data sets when will have a negative impact on request loading.

We want to use path params to indentify a specific resource while we want to use query params to filter or sort the resource:

## Create Basic Service

Scaffolding

`neset g s` 

`nest generate service`

Will create the service file and corresponding test and the service to the providers array of the  closest module. 

Services are used to separate business logic from controllers and allows reusability

The main idea of providers is to inject dependencies. To inject a provider we can simply use constructors. ************Nest handles dependency injection for us.************

```jsx
constructor(private readonly coffeeService: CoffeesService)
```

`private` allows declaring and intialising the service immediately and making it only accessible in the class itself.

`readonly` is more of a best practice and ensure that we are not modifying the class but only accessing things from it.

`:CoffeeService` is used because NestJS uses the type to resolve the dependency.

```jsx
import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find(item => item.id === +id);
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}

/* Coffee Entity FINAL CODE */
export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}

/* CoffeesController FINAL CODE */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
```

## Send User-Friendly Error Messages

We have a few options available to us:

- Throw an HTTP exception
- use a library specific response object
- create interceptors and and leverage exception filters

NestJS automatically catches not specified exceptions with the  built-in exception layer. It’s user friendly too.

```jsx
/* CoffeesService FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
```

## **Encompass Business-Domain in Modules**

An ideal architecture should comprise of multiple modules that each contain a specific set of functionality.

A NestJS modules is simple a class that uses the `@Module` decorator. A module decorator takes a sungke object whose properties describe the module and all of it’s context.

Nest Modules contain 4 main things:

- ***controllers*** - Which you can think of as our API Routes, that we want this module to instantiate.
- ***exports*** Here we can list providers within this current module that should be made available anywhere this module is imported
- ***imports*** Just as we saw in the AppModule, the imports Array gives us the ability to list *OTHER* modules that THIS module requires. Any exported providers of these imported modules are now fully available here as well.
- ***providers*** Here we’re going to list our services that need to be instantiated by the
Nest injector. Any providers here will be available only within “THIS”
module itself, unless added to the exports array we saw above.

```jsx
// Generate a Nest Module with the Nest CLI
nest g module {name}
// shorthand: nest g mo {name}

/* CoffeesModule FINAL CODE */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({ 
  controllers: [CoffeesController],
  providers: [CoffeesService] 
})
export class CoffeesModule {}
```

## **Introduction to Data Transfer Objects**

Also known as a DTO.

Object that is used to encapsulate data and send it from one application to another.

Create interfaces for inputs and outputs within our system.

They are simple objects that have no logic or anything that needs tested.

Entities and DTO’s may be very similar and even seem redundant (at this point as least, it will differ more when working with real entities).

```jsx
//
 * Generate a DTO class with the Nest CLI
 * --no-spec (no test file needed for DTO's)
//
nest g class coffees/dto/create-coffee.dto --no-spec

/* CreateCoffeeDto */
export class CreateCoffeeDto {
  readonly name: string;
  readonly brand: string;
  readonly flavors: string[];
}

/* UpdateCoffeeDto */
export class UpdateCoffeeDto {
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
```

## **Validate Input Data with Data Transfer Objects**

The **ValidationPipe** provides a convenient way of enforcing validation rules for all incoming client payloads. You can specify these rules by using simple annotations in your DTO!

With the validation in place if a request hits the endpoint with an invalid property, the application will automatically respond with a 400 BadRequest code.

Example failed response when flavours wasn’t provided:

```jsx
{
    "statusCode": 400,
    "message": [
        "each value in flavors must be a string"
    ],
    "error": "Bad Request"
}
```

```jsx
// Apply the ValidationPipe globally in our main.ts file
app.useGlobalPipes(new ValidationPipe());

// Install needed dependencies
npm i class-validator class-transformer 

// Implement validation rules in our CreateCoffeeDto
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}

// Install @nestjs/mapped-types 
npm i @nestjs/mapped-types

/* UpdateCoffeeDto - FINAL CODE  */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```

PartialType is great because it will return the type but with all of the properties set to optional. **************It also inherits all of the validation rules applied by the decorators.**************

It also add the `@isOptional()` rule to each field.

## ****Handling Malicious Request Data****

By whitelisting acceptable properties, any property NOT included in the whitelist will be automatically stripped.

```jsx
/* Enabling "whitelist" feature of ValidationPipe */
app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 👈
}));

/* Throw errors when non-whitelisted properties are found */
app.useGlobalPipes(new ValidationPipe({
   forbidNonWhitelisted: true, // 👈
   whitelist: true,
}));
```

Example

Passing the following:

```jsx
{
    "name": "old florisa",
    "brand": "Buddy brew",
    "flavors": ["apple"],
    "flav": "incorrect"
}
```

returned the object with the extra field stripped out.

After `forbidNonWhitelisted` is provided the following error was provided:

```jsx
{
    "statusCode": 400,
    "message": [
        "property flav should not exist"
    ],
    "error": "Bad Request"
}
```

## ****Auto-transform Payloads to DTO instances****

If `transform` is set to false in the ValidationPipe, when we receive the body object in the request we only have a regular javascript object (this can be validated using an `instanceOf` check)

When set to true, the type of the object will be correctly set as the DTO. Also, the autotransform feature also performs primitive type conversions for things like numbers and booleans.

```jsx
// Enabling auto transform feature of ValidationPipe
app.useGlobalPipes(
  new ValidationPipe({
    transform: true, // 👈
  }),
);
```

<br><br>
# Chapter 3

## Running PostgresSQL

Postgres is performant and free.

Docker setup

```jsx
/* YAML docker-compose.yml configuration file */
version: "3"
services:
  db:
    image:  postgres
    restart: always 
    ports:
      - "5432:5432"
    environment:
       POSTGRES_PASSWORD: pass123

// Start containers in detached / background mode
docker-compose up -d

// Stop containers
docker-compose down
```

## Introducing the TypeORM Module

ORM - object relational mapper

This allows us to interact with the database in a typesafe and simple manner, increasing productivity.

It works with many db types.

```jsx
// Install neccessary TypeORM dependencies
npm install @nestjs/typeorm typeorm pg

/* AppModule - FINAL CODE */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Creating a TypeORM Entity

An entity represents the relationship between a class the the database table.

Entities have the `@Entity` decorator. Auto syncronisation can ensure that tables are created from entities.

If there isn’t a `nullable` property added then the field will be required.

The use of `forFeature()` registers TypeORM in the child module. `forRoot` is normally only registered once, but every other module iwll use `forFeature` when registering entities.

```jsx
/* Coffee Entity - FINAL CODE */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}

/* CoffeesModule - FINAL CODE */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}

/*
Generated Coffee table in PostgreSQL Database

+-------------+--------------+----------------------------+
|                          coffee                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name   	    | varchar      |                            |
| brand       | varchar      |                            |
| flavors     | json         |                            |
+-------------+--------------+----------------------------+
*/
```

## **Using Repository to Access Database**

TypeORM supports the repository design pattern. This means that each entity created, has it’s own repo.

There are useful method provided.

`preload` creates a new entity based on the object passed into it. It will look for an existing db entity and retrieves it. The extra values passed in replace the originals. It will return undefined if not found.

```jsx
/* 
 CoffeesService - FINAL CODE
 Implementing TypeORM "Repository"
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
```

## Create Relation between two Entities

**Relations** are associations established between two or more tables, based on 
common fields from each table, often involving primary and foreign keys.

### There are three types of relations:

**One-to-one**

The first are one-to-one relations. In these relations every row in the 
primary table has one - and only one associated row in the foreign 
table. In TypeOrm, we define these types of relations with the 
@OneToOne() decorator.

**One-to-many or Many-to-one** relations

For
 these relations - every row in the primary table has one or more 
related rows in the foreign table. In TypeOrm, we define these types of 
relations with the  @OneToMany() and @ManyToOne() decorators.

**Many-to-many** relations

This is when every row in the primary table has many related rows in the 
foreign table, and every record in the foreign table has many related 
rows in the primary table. In TypeOrm, we define these types of 
relations with the  @ManyToMany() decorator.

```jsx
/* Coffee Entity - FINAL CODE */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees, // what is "coffee" within the Flavor Entity 
  ) // 👈
  flavors: string[];
}

/* Flavor Entity - FINAL CODE */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

/* Because Coffee is the owner in the relationship - there is no need for JoinTable here */ 
  @ManyToMany( 
    type => Coffee,
    coffee => coffee.flavors, // what is "flavor" within the Coffee Entity 
  ) // 👈
  coffees: Coffee[];
}
```

## **Retrieve Entities with their Relations**

In the previous lesson - we removed the “flavors” JSON column (including all of its data) and created a “relation” - which now gives us a total of 3 tables in our database:

- coffee - which represents coffees,
- flavor - which represents flavors,
- and coffee_flavors_flavor which represents the coffee-flavor many to many relation.

So now that we set up our relation in the previous lesson - how can we make sure our endpoints retrieve all the associated data?

**Note: Relations are not eagerly loaded by default. We need to be explicit about the relations we want to be resolved.**

```jsx
/** 
 * Passing in find options to TypeORM, in our case we need to 
 * pass "relations" with an Array of Strings 
  
 * For example: 
 */
return this.coffeeRepository.find({
  relations: {
    flavors: true, // 👈
  },
});

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
```

## **Using Cascading Inserts and Updates**

The alternative to using cascading inserts would require, in our example, that a flavour must be created first and then a coffee can be created afterwards referencing the new flavour.

```jsx
/* Coffee Entity - Enabling Cascading inserts */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true, // 👈 or optionally just insert or update ['insert']
    },
  )
  flavors: Flavor[];
}

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { 
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ where: { name } }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
```

## Adding Pagination

We can test this by `localhost:3000/coffees?limit=1&offset=2`

```jsx
// Using the Nest CLI let’s create this DTO by entering (in your terminal)
nest g class common/dto/pagination-query.dto --no-spec

/* PaginationQueryDto */
export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}

/* main.ts - useGlobalPipes addition */
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

/** 
 * CoffeesService
 * skip/take additions to findAll() 
 */
findAll(paginationQuery: PaginationQueryDto) {
  const { limit, offset } = paginationQuery;
  return this.coffeeRepository.find({
    relations: {
      flavors: true,
    },
    skip: offset, // 👈
    take: limit, // 👈
  });
}
```

## Use Transactions

There are options to use Nest Scoped providers and Interceptors to automatically wrap every write query in a transaction but this is not covered here.

We replace `EventEntity` with `Event` as we do not want the word entity in the database table name.

```jsx
coffee// Using the Nest CLI let’s create this Event Entity by entering
nest g class events/entities/event.entity --no-spec

/* Event */
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @Column()
  name: string; 

  @Column('json')
  payload: Record<string, any>;
}

/** 
 *  CoffeesService - constructor dependency injection 
 * 
 */
 
// ... other imports
import { Entity } from '../events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(private readonly connection: Connection) {}
}

/* CoffeesService - recommendCoffee() addition */
async recommendCoffee(coffee: Coffee) {
  const queryRunner = this.connection.createQueryRunner();
  
  await queryRunner.connect();
  await queryRunner.startTransaction(); 
  try {
    coffee.recommendations++;
    
    const recommendEvent = new Event();
    recommendEvent.name = 'recommend_coffee';
    recommendEvent.type = 'coffee';
    recommendEvent.payload = { coffeeId: coffee.id };
  
    await queryRunner.manager.save(coffee); 
    await queryRunner.manager.save(recommendEvent);
    
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}
```

## Adding Indexes to Entities

Indexes are special lookup tables that our database search engine ca use to speed up data retrieval. If there a particular field that we want to query on frequently, this might be a good candidate for being indexed.

```jsx
/** 
 * To help speed up this search, we can define an index on the “name” column 
 * using the @Index decorator. 
 */
@Index() // <--
@Column()
 name: string;
 
// Composite index that contains Multiple columns
@Index(['name', 'type']) // <-- 
export class Event {}
```

## Setting up Migrations

Migrations are handled by TypeORM and not NestJs. As such we are not able to leverage dependency injection and other nest specific features for our database migrations.

In changing the name from `name` to `title` we will lose any data that existed, at least locally. Migrations will allow us to ensure that we don’t lose any data when making updates. This is especially important for production.

`up` is for any changes we want to make.

`down` is used for undo/rollback.

From below we can see how we can create a migration manually, but also automatically using the CLI to capture differences in the Entities.

Note: Ensure that you don’t have `npm run start:dev` because it automatically builds and updates the data

```jsx
/* typeorm-cli.config.ts */
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [],
});

// Creating a TypeOrm Migration
npx typeorm migration:create src/migrations/CoffeeRefactor
// CoffeeRefactor being the NAME we are giving "this" migration

/* src/migrations/... file */
public async up(queryRunner: QueryRunner): Promise<any> {
  await queryRunner.query(
    `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
  );
}

public async down(queryRunner: QueryRunner): Promise<any> {
  await queryRunner.query(
    `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
  );
}

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */
 
// Compile project first 
npm run build

// Run migration(s) 
npx typeorm migration:run -d dist/typeorm-cli.config

// REVERT migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config

// Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
```

<br><br>
# Chapter 4

## Understanding Dependency Injection

NestJS handles resolving a lot of the resolving of dependencies for us.

3 key steps:

- The `@Injectable` decorator declares that a class can be handled by the Nest container
- This decorator marks the service class as a `Provider`
- In a controller, for example, when we create the constructor `constructor(private readonly coffeeService: CoffeeService){}` we are telling Nest to inject that provider so we can use it.
- Nest also knows it a provider because we’ve used it in our CoffeesModule, which registers this provider with the Nest IoC -  `providers: [CoffeeService]`

Services are set a Singleton by default in Nest. If there is no class found then Nest will instantiate it, cache it and return it, otherwise if it exists it will just return it from cache.

It all happens via application bootstrapping. It will create a dependency graph.

The normal `@Module` decorator has a field providers that in our case uses an array `[CoffeeService]` - however this is just syntactic sugar for `{provide: CoffeeService, useClass: CoffeeService}` which highlights we a token that we provide for a specific class. This is the most common use case so it primarily used for convenience.

## Control NestJS Module Encapsulation

You can think of exported providers being your modules “public interface” or API.

All modules encapsulate their providers by default. That means that if you want ot use them in another module, we must explicitly define them as exported.

This is why we needed to add `exports: [CoffeesService],` the Coffees module. Otherwise, our Coffee-rating modules wouldn’t be able to use it and provide an error message of:

`Nest can't resolve dependencies of the CoffeeRatingService (?). Please make sure that the argument CoffeesService at index [0] is available in the CoffeeRatingModule context.`

```jsx
// Nest CLI - Generate a new CoffeeRatingModule
nest g mo coffee-rating

// Nest CLI - Generate a new CoffeeRatingService 
nest g s coffee-rating
```

## Diving into Custom Providers

**Example advanced use-cases where we might need Custom Providers:**

1. Creating a custom instance of our provider instead of having Nest instantiate the class for us
2. Or let’s say we want to reuse an existing class in a second dependency
3. How about if we want to override a class with a mock version for testing
4. And lastly, what if we want to use a **Strategy Pattern** in which we can provide an abstract class and interchange the real
implementation (or actual class that is to be used) based on different
conditions

### Value based providers

```jsx
// Our mock implementation
export class MockCoffeesService { }

@Module({
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(), // <-- mock implementation
    }
  ]
})
export class CoffeesModule {}
```

### **Non-class-based Provider Tokens**

It is best practice to define tokens in a different file that can be used throughout the application. Using the const as a token instead of a string ensure we can change this value in one place and makes that code more resilient to changes.

```jsx
// String-valued token
{
  provide: 'COFFEE_BRANDS', // 👈
  useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
},

// Injecting string-valued token into CoffeesService
@Injectable()
export class CoffeesService {
  constructor(@Inject('COFFEE_BRANDS') coffeeBrands: string[]) {}
}

/* coffees.constants.ts File */
export const COFFEE_BRANDS = 'COFFEE_BRANDS';
```

### Class Providers

```jsx
// "useClass" syntax example
{
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
},
```

### Factory Providers

This allows us to create providers dynamically. 

Factory providers can inject other providers.

```jsx
// "useFactory" syntax example
{
  provide: 'COFFEE_BRANDS',
  useFactory: () => ['buddy brew', 'nescafe']
}
```

### **Leverage Async Providers**

Sometimes when our application bootstraps, we need to delay the entire process until one or more aync tasks have completed.

i.e we might not want to receive any requests until the database connection has been established.

This can help deal with potential race conditions in our code in relation to starting the application.

```jsx
// Asynchronous "useFactory" (async provider example)
{
  provide: 'COFFEE_BRANDS',
  // Note "async" here, and Promise/Async event inside the Factory function 
  // Could be a database connection / API call / etc
  // In our case we're just "mocking" this type of event with a Promise
  useFactory: async (connection: Connection): Promise<string[]> => {
    // const coffeeBrands = await connection.query('SELECT * ...');
    const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    return coffeeBrands;
  },
  inject: [Connection],
},
```

### Create a Dynamic Module

Static modules cannot have their providers be configured by a module that is consuming it.

If we have a general purpose module that needs to handle differently based on different settings.

```jsx
/*
  👉👉👉 NOTE: If you are following along with this course and going to keep this dynamic module...
  
  ⭐⭐⭐⭐ ️️Make sure you pass in "username" and "password".
*/

// Generate a DatabaseModule
nest g mo database

// Initial attempt at creating "CONNECTION" provider, and utilizing useValue for values */
{
  provide: 'CONNECTION',
  useValue: new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432
  }).initialize(),
}

// Creating static register() method on DatabaseModule
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {  }
}

// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new DataSource(options), 
        }
      ]
    }
  }
}

/*
  👉👉👉 NOTE: If you are following along with this course and going to keep this dynamic module...
  
  ⭐⭐⭐⭐ ️️Make sure you pass in "username" and "password".
*/

// Utilizing the dynamic DatabaseModule in another Modules imports: []
imports: [
  DatabaseModule.register({ // 👈 passing in dynamic values
    type: 'postgres',
    host: 'localhost',
    // 👇👇👇👇 Make sure these are included 👇👇👇
    // 👇👇👇👇 Make sure these are included 👇👇👇
    // 👇👇👇👇 Make sure these are included 👇👇👇
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  })
]
```

### Control Providers Scope

Nest does not following the Request/Response cycle like in some other languages i.e PHP/Symfony.

It is possible for a provider to have a request based lifetime for a certain desired behavior. i.e not singleton.

The lifetime of a provider is the lifetime of the application.

Other scopes are `transient` and `request-scoped` lifetimes.

- transient providers are not shared across consumers.
    - each consumer that injects a transient provider will recieve a new dedicated instance of that provider.
- For the request scope, the instance is garbage collected after the request has finished processing.

```jsx
// Scope DEFAULT - This is assumed when NO Scope is entered like so: @Injectable() */
@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {}

// -------------

/** 
 * Scope TRANSIENT 
  
 * Transient providers are NOT shared across consumers. 
 * Each consumer that injects a transient provider 
 * will receive a new, dedicated instance of that provider. 
 */
@Injectable({ scope: Scope.TRANSIENT })
export class CoffeesService {}

// Scope TRANSIENT with a Custom Provider
{
  provide: 'COFFEE_BRANDS',
  useFactory: () => ['buddy brew', 'nescafe'],
  scope: Scope.TRANSIENT // 👈
}

// -------------

/**
 * Scope REQUEST 

 * Request scope provides a new instance of the provider 
 * exclusively for each incoming request. 
 */
@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {}
```

### **Diving Deeper Into Request-Scoped Providers**

The scopes bubble up the injection chain, which means that if the CoffeesController depends on the CoffeesService which is a Request scope, it implicitly becomes a Request scope.

Request scoped providers may have an impact on the performance of your applications.

```jsx
// Injecting the ORIGINAL Request object
@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {
  constructor(@Inject(REQUEST) private request: Request) {} // 👈
}
```

<br><br>
# Chapter 5

## **Introducing the Config Module**

It’s a common best practice in the Node.js community to store these configuration variables as a part of the environment - in the Node.js global process.env object.

NestJS Config module helps make working with these environment variables, even simpler.

The config module is going to merge key/value pairs from the .env file with environment variables assigned to process.env storing the result in a private structure that we can access anywhere in our application via a ConfigService class.

```jsx
// Install @nestjs/config
npm i @nestjs/config

// .env file in root directory
DATABASE_USER=postgres
DATABASE_PASSWORD=pass123
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost

// Make sure .env file is in .gitignore file and NOT tracked by git */
# Env
*.env

/* AppModule updated to use process.env variables */
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
}),
```

## Custom Environment File Paths

By default the previous exercise automatically looks for a .env file at the root of the application.

```jsx
/**
 * To specify another path for this file, 
 * let’s pass in an options object into the forRoot() method 
 * and set the envFilePath property like so:
   
 * In this example, we’re looking instead for a .environment file.
 */
ConfigModule.forRoot({
  envFilePath: '.environment’,
});

/** 
 * Have ConfigModule *ignore* .env files 
 * Useful when using Provider UI's such as Heroku, etc (and they handle all ENV variables)
 */
ConfigModule.forRoot({
  ignoreEnvFile: true,
});
```

## Schema Validation

It is best practice to thrown an Exception during application start up if any required environment variables have not been provided or if the do not meet certain validation rules.

With Joi, you can define an object schema and validate Javascript objects against it.

By default, all schema keys are considered optional.

Note that to trigger a Nest application reload, we must save a TS file.  The Nest CLI doesn’t watch for changes .env files by default.

```jsx
// Install neccessary dependencies
$ npm install @hapi/joi
$ npm install --save-dev @types/hapi__joi

// Use Joi validation
ConfigModule.forRoot({
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
  }),
}),
```

## **Using the Config Service**

ConfigService doesn’t need `forRoot` or similar because we’ve already it to app.module.ts and it only needs to be done once.

All environment variables are `string` by default. ConfigService service won’t perform any typecasting. Ensure typecasting is being done earlier.

```jsx
/* Utilize ConfigService */
import { ConfigService } from '@nestjs/config';

constructor(
  private readonly configService: ConfigService, // 👈
) {}

/* Accessing process.env variables from ConfigService */
const databaseHost = this.configService.get<string>('DATABASE_HOST');
console.log(databaseHost);
```

## **Custom Configuration Files**

This approach allow nested objects that can represent groups of related variables like the database values.

How can we used appConfig without our classes? We can use the ConfigService that we’ve previously used. The `get` method doesn’t just allow accessing via key, but also via nested objects.

This approach could become unwieldy as the application becomes larger as there is no type-safety/interence and we’ll have lots of magic strings.

Configuration namespaces are used to tackle some of these shortcomings.

```jsx
/* /src/config/app.config.ts File */
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});

/* Setting up "appConfig" within our Application */
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig], // 👈
    }),
  ],
})
export class AppModule {}

// ---------

/**
 * Grabbing this nested property within our App 
 * via "dot notation" (a.b)
 */
const databaseHost = this.configService.get('database.host', 'localhost');
```

## **Configuration Namespaces and Partial Registration**

The ConfigModule allows us to define and load multiple custom configuration files, with nested objects and access these variables via the provided ConfigService.

The `registerAs` function lets us register a namespaced configuration object under the ‘key’ passed as our first argument.

Using `forFeature` to register the config values allows us the benefit of registering very close/in the domain.

When dealing with situations where typesafety is important, it is best practice to inject the entire namespace configuration object directly. 

Each namespace configuration exposes a ‘key’ property, which we can use in order to inject the entire object to any class, registered within the Nest container. 

ConfigType is a helper Type provided out of the box, which infers the return type of our function. 

```jsx
/* /src/coffees/coffees.config.ts File */
export default registerAs('coffees', () => ({ // 👈
  foo: 'bar', // 👈
}));

/* Partial Registration of coffees namespaced configuration */
@Module({
  imports: [ConfigModule.forFeature(coffeesConfig)], // 👈
})
export class CoffeesModule {}

// ---------
// ⚠️ sub optimal ways of retrieving Config ⚠️

/* Grab coffees config within App */
const coffeesConfig = this.configService.get('coffees');
console.log(coffeesConfig);

/* Grab nested property within coffees config */
const foo = this.configService.get('coffees.foo');
console.log(foo);

// ---------
// 💡 Optimal / Best-practice 💡

constructor(
  @Inject(coffeesConfig.KEY)
  private coffeesConfiguration: ConfigType<typeof coffeesConfig>, 
) {
  // Now strongly typed, and able to access properties via:
  console.log(coffeesConfiguration.foo); 
}
```

## **Asynchronously Configure Dynamic Modules**

It is always best practice for our applications to be deterministic.

The forRootAsync will be loaded after every other module registered is resolved, and as such there will be no issues regarding import order (in the example moving `TypeOrmModule.forRoot` above ConfigModule broke the build. 

```jsx
/* forRootAsync() */
TypeOrmModule.forRootAsync({ // 👈
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
}),
```

<br><br>
# Chapter 6 - Other Building Blocks by Example

## **Introducing More Building Blocks**

In NestJS, we have 4 additional building blocks (for features), that we haven’t showcased yet - these are:

- Exception filters
    - Responsible for handling and processing unhandled exceptions that might occur in our app.
    - They let us control the flow and content of any specific responses we send back to the client
- Pipes
    - Useful for transformation - taking input and transforming to desired output
    - validation - meaning to evaluate input data and if valid - let it pass though the pipe unchange, otherwise throw and exception
- Guards
    - Determine if a given request meets certain criteria, like authentication, authorization, roles, ACLs etc. If conditions are met then the request will be able to access the route.
- & Interceptors
    - Allow you to bind logic before or after method execution.
    - transform result returned from method
    - extend method behavior
    - even, override a method in some circumstances.

## **Understanding Binding Techniques**

Nest building blocks can be:

- Globally-scoped,
- Controller-scoped,
- Method-scoped,
- And (the bonus 4th one) Param-scoped which as we said, is available to Pipes only.

Each one does not override the other but layers each one on top so we need to be careful when implement. Example if you set a global scope, any other you might add will double up

We currently use ValidationPipe on the top level outside of the context of any Nest module and such we can’t inject any dependencies here.

APP_PIPE is a special token provided by the Nest core package. This lets Nest Instantiate the ValidationPipe with the scope of the AppModule and once created registers it as a global pipe. There is a special token for each other building block.

It is best practice to apply filter using classes rather than instances whenever possible. This reduces memory usage since nest can easily reuse instances of the same class across the entire module.

Param-based scopes are particularly useful when the validation logic concerns only one specific parameter

## **Catch Exceptions with Filters**

When an exception is not handled by our application, it is automatically caught by this layer which sends the appropriate user friendly response.

`switchToHttp` gives us access to the native in-flight Request or Response object.

```tsx
    const ctx = host.switchToHttp
```

```jsx
// Generate Filter with Nest CLI 
nest g filter common/filters/http-exception

// Catch decorator
@Catch(HttpException)

/* HttpExceptionFilter final code */
import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
```

## **Protect Routes with Guards**

In the below example we use `process.env.API_KEY` but it would be preferable to use `ConfigService`

```jsx
// Generate ApiKeyGuard with Nest CLI
nest g guard common/guards/api-key

// Apply ApiKeyGuard globally
app.useGlobalGuards(new ApiKeyGuard());

/* ApiKeyGuard code */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === process.env.API_KEY;
  }
}
```

## **Using Metadata to Build Generic Guards or Interceptors**

The main goal here is to determine if the route being called is public or not.

Nest provides the opportunity to add metadata to using the `@SetMetadata` decorator. It takes 2 params: a key pair value.

While `@SetMetadata('isPublic', true)` can work, we probably want our own custom decorator so we can easily reuse elsewhere and gives type safely.

The reflector class allows us to retrieve metadata with a specific context.

`@getHandler()` retrieves metadata for the method, `@getClass()` will provide class related metadata.

```jsx
/* public.decorator.ts FINAL CODE */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/* ApiKeyGuard FINAL CODE */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
```

## **Add Pointcuts with Interceptors**

This technique aims to increase modularity by allowing the separation of cross-cutting concerns.

## Interceptors make it possible for us to:

- bind extra logic before or after method execution
- transform the result returned from a method
- transform the exception thrown from a method
- extend basic method behavior
- or even completely overriding a method - depending on a specific condition (for example: doing something like caching various responses)

Note: RxJS is a powerful alternative to Promises or callbacks. (but not covered in this course)

The `tap` operator invokes an anonymous logging function upon graceful termination of the Observable stream. But `tap` doesn’t otherwise interfere with the response cycle at all.

The `data` argument of the arrow function that we passed into the `tap` operator here is in fact ****the response**** sent back from the route handler. Basically think of this as whatever comes back from our endpoint.

The `map` operator takes a value from the stream and returns a modified one.

This approach shows some of the benefits of interceptors like passing down version numbers, analytics tracking etc. 

We were able to make changes without changing any underlying code.

```jsx
// Generate WrapResponseInterceptor with Nest CLI 
nest g interceptor common/interceptors/wrap-response

/* WrapResponseInterceptor FINAL CODE */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(map(data => ({ data })));
  }
}

// Apply Interceptor globally in main.ts file
app.useGlobalInterceptors(new WrapResponseInterceptor());
```

## **Handling Timeouts with Interceptors**

Another technique useful for Interceptors is to **extend** the basic function behavior by applying RxJS operators to the response stream.

To help us learn about this concept by example - let’s imagine that we need to handle **timeouts** for all of our route requests.

When an endpoint does not return anything after a certain period of time, we
 need to terminate the request, and send back an error message.

`catchError()` operator allows us to catch all exceptions that occurred within the stream.

```jsx
/* Generate TimeoutInterceptor with Nest CLI */
nest g interceptor common/interceptors/timeout

/* Apply TimeoutInterceptor globally in main.ts file */

app.useGlobalInterceptors(
  new WrapResponseInterceptor(), 
  new TimeoutInterceptor(), // 👈
);

/* Add manual timeout to force timeout interceptor to work */
await new Promise(resolve => setTimeout(resolve, 5000));

/* TimeoutInterceptor FINAL CODE */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
```

## **Creating Custom Pipes**

**Pipes have two typical use cases:**

- **Transformation**: where we transform input data to the desired output
- & **validation**: where we evaluate input data and if valid, simply pass it through
unchanged. If the data is NOT valid - we want to throw an exception.

In both cases, pipes operate on the arguments being processed by a controller’s route handler.

NestJS triggers a pipe just **before** a method is invoked.

Pipes also receive the arguments meant to be passed on to the method. Any transformation or validation operation takes place at **this** time - afterwards the route handler is invoked with any (potentially) transformed arguments.

`value` - the input value of the currently processed argument before it is received by our route handling method.

`metadata` - the metadata of the currently processed argument

Whatever is returned from this function ****************completely overwrites**************** the previous value of the argument.

```jsx
// Generate ParseIntPipe with Nest CLI
nest g pipe common/pipes/parse-int

/* ParseIntPipe FINAL CODE */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
```

## **Bonus: Add Request Logging with Middleware**

Middleware functions have access to the request and response objects, and are not 
specifically tied to any method, but rather to a specified route **PATH**.

Middleware is a function that is called *******before******* the route handler and any other building blocs are processed. This inclided Interceptors, Guards and Pipes.

**Middleware functions can perform the following tasks:**

- executing code
- making changes to the request and the response objects.
- ending the request-response cycle.
- Or even calling the **next** middleware function in the call stack.

When working with middleware, if the current middleware function does not END the request-response cycle, it **must** call the next() method, which passes control to the next middleware function.

Otherwise, the request will be left hanging - and never complete.

Function middleware is **********stateless,********** it cannot inject dependencies and doesn’t have access to the Nest containers.

On the other hand. Class Middleware can rely on external dependencies and inject providers registered in the same module scope.

```jsx
// Generate LoggingMiddleware with Nest CLI
nest g middleware common/middleware/logging

// Apply LoggingMiddleware in our AppModule 
consumer
  .apply(LoggingMiddleware)
  .forRoutes(‘*’);

/* LoggingMiddleware FINAL CODE */
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('Hi from middleware!');
    
    res.on('finish', () => console.timeEnd('Request-response time'));
    next(); 
  }
}
```

## **Bonus: Create Custom Param Decorators**

Decorators are simply functions that apply logic.

NestJS already provides a lot OOTP like `@Param,@Body` etc.

```jsx
// Using the Protocol decorator
@Protocol(/* optional defaultValue */)

/* @Protocal() decorator FINAL CODE */
import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
```

<br><br>
# Chapter 7 - Generating OpenAPI Specification

## Introducing the Swagger Module

In these next lessons we’ll be looking at how we can integrate and automatically generate OpenAPI documentation for our NestJS applications.

We’ll be taking advantage of all the latest tools, and Nest plugins to help automate and simplify every aspect of the process.

One of the best ways to document our application is to use the OpenAPI specification. The OpenAPI specification is a language-agnostic definition format used to describe **RESTful APIs**.

An OpenAPI document allows us to describe our entire API, including:

- Available operations (endpoints)
- Operation parameters: Input and output for each operation
- Authentication methods
- Contact information, license, terms of use and other information.
- … and much more ...

`SwaggerModule.setup('api', app, document);`

`'api'` - The route path to mount the swagger ui to \

`app` - The application instance

`document` the object just instantiated by `SwaggerModule.createDocument`

With just the below information, we are likely missing a lot of useful information when we visit `[localhost:3000/api](http://localhost:3000/api)`. This will be addressed later.

```jsx
/**
 * Installing @nestjs/swagger
 * & Swagger UI for Express.js (which our application uses)
 * 💡 Note: If your application is using Fastiy, install `fastify-swagger` instead
 */
npm install --save @nestjs/swagger swagger-ui-express

// Setting up Swagger document 
const options = new DocumentBuilder()
  .setTitle('Iluvcoffee')
  .setDescription('Coffee application')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);

/** 
 * With the App running (npm run start:dev if not)
 * To view the Swagger UI go to:
 * http://localhost:3000/api
 */
```

## **Enabling CLI Plugin**

Whilst we have types provided in the codebase, it’s not enough to automatically generate the OpenAPI schemas out of the box.

Typescripts metadata reflection ststem has several limitation which make it impossible to, for instance, determine what properties a class consists of or recognise whether a given property is optional or required. Some of this can be addressed at compilation time.

You can provide all of the Swagger decorators manually or add specific decorators wherever you need to override the base functionality provided by the plugin (the latter is recommended)

Switching from `import { PartialType } from '@nestjs/mapped-types';` to  `import { PartialType } from '@nestjs/swagger';` helps achieve the same functionality, while instructing swagger that these are all, in fact, optional properties.

```jsx
/**
 * Add the @nestjs/swagger plugin to our application
 * nest-cli.json
 */
"compilerOptions": {
  "deleteOutDir": true,
  "plugins": ["@nestjs/swagger/plugin"] // 👈
}
```

## **Decorating Model Properties**

This adds extra information to the SwaggerUI

```jsx
// Fixing PartialType for Swagger
import { PartialType } from '@nestjs/swagger';

/**
 * @ApiProperty decorator useful to *override* 
 * information automatically inferred from the @nestjs/swagger plugin
 */
@ApiProperty({ description: 'The name of a coffee.' })
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/97df3f01-9205-4807-8a5c-6f48420d6548/Untitled.png)

## Add Example Responses

The below example isn’t particularly useful in our use-case. However, it’s important note that we have full control over Swagger and how documenting how documenting different API response can be beneficial in many circumstances.

```jsx
/**
 * Setting different API Responses for Swagger UI
 * (long version)
*/
@ApiResponse({ status: 403, description: 'Forbidden.' })

/* short-hand versions are available as well */
@ApiForbiddenResponse({ description: 'Forbidden.' })
```

## Using Tags to Group Resources

```jsx
/**
 * Swagger Tags decorator.
 * 💡 Note: Can also be done on an individual method-level if needed as well!
 */
@ApiTags('coffees')
class CoffeesController {}
```

# Testing

## Introduction to Jest

With NestJS, we can use any testing framework we prefer. However, it can be quite tedious to set everything up.

Luckily for us - Nest provides a built-in integration with the **Jest** testing framework, out-of-the-box - so we don’t have to do anything to get started!

```jsx
// For unit tests
npm run test 

// For unit tests + collecting testing coverage
npm run test:cov

// For e2e tests
npm run test:e2e
```

## **Getting Started with Test Suites**

In this lesson we'll be focusing mainly on tips & tricks, showcasing some best practices, and going over how we can add and manage tests in our NestJS applications.

---

**Unit Tests**

For unit tests In NestJS, it’s a common practice to keep the spec files in the same folder as the application source code files that they test.

Each controller, provider, service, etc. should have its own dedicated test file. The test file extension **must be** (dot).spec.ts (this is so that integrated test tooling can identify it as a test file with test suites).

---

**End-to-End (e2e) Tests**

For e2e tests, these files are typically located in a dedicated `test` directory by default. e2e tests are typically grouped into separate files by the feature or functionality that they test. The file extension must be (dot).e2e-spec.ts.

---

### How are they different?

While unit tests focus on individual classes and functions…e2e tests are great for high-level validation of the entire system. e2e testing covers the interaction of classes and modules at a more 
aggregate level -- closer to the kind of interaction that end-users will have with the production system.

In the basic test setup with `createTestingModule` at a very high level, we can see that we’re instantiating some type of module by compiling a test module and then utilising this module to get a hold of the CoffeesService.

Then it looks like we are storing it with a service variable to be used within our individual tests inside of the describe block.

The Test class is useful for providing an application execution context that essentially mocks the full Nest runtime, but it gives you gooks that make it easy to manage class instances and do things like mocking and overriding aspects of you application.

The Test class has a createTestingModule method that takes a module metadata object as it’s argument. The same object we pass into our module decorators.

An important thing to note is the compile method. This method bootstraps the module with its dependencies, similar to the way we bootstrap our application in our main.ts file with NestFactory.create(). It returns a TestModule instance that gives us a few helpful methods.

**Note:** If you need to retrieve Request Scoped or Transient Scoped providers, use the resolve method here instead of `get`

`it` stands for `individual test`

```jsx
beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });
```

```jsx
// Run a unit test for a -specific- file pattern
npm run test:watch -- coffees.service

// Basic / empty "Mocks" for Entities in our CoffeesService 
providers: [
  CoffeesService,
  { provide: DataSource, useValue: {} },
  { provide: getRepositoryToken(Flavor), useValue: {} }, // 👈
  { provide: getRepositoryToken(Coffee), useValue: {} }, // 👈
]
```

## **Adding Unit Tests**

In this video, let’s figure out how we can test the “findOne” method.

One problem we’ll notice is that the “findOne” method uses “coffeeRepository.findOne” inside of it, so we’ll have to make sure to mock this repository method for our test to run properly.

```jsx
/* 
  coffees-service.spec.ts - FINAL CODE
*/
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
```

## Diving into e2e tests

End-to-End testing (aka e2e), covers the interaction of classes and modules at a more aggregate level -- closer to the kind of interaction that our end-users will have with the production system.

These follow somewhat of a similar format to the unit tests suites.

This time we are calling `createNestApplication` method to instantiate an actual Nest runtime environment.

Instead of creating a service like we did in our unit test, we are saving a reference to the **running application** in the ****app**** variable sso we can use it to simulate http requests. 

`supertest` is an npm package that provides a high-level abstraction for testing HTTP applications.

It is best to use `beforeAll` when running e2e tests as you likely only want to instantiate the application once.

In our test, using `AppModule` isn’t really that great because it will instaniate the whole application including all controllers, providers, enhancers, configurations.

```jsx
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

The above occurred when the database connection was not closed.

```jsx
// Run e2e tests
npm run test:e2e

/* 
  app.e2e-spec.ts - FINAL CODE 
*/
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
```

## **Creating our First e2e Test**

Grouping our applications functionality into Modules is strongly recommended as an effective way to organize our components. For most applications, the resulting architecture will employ multiple modules, each encapsulating a  closely related set of capabilities.

Because of this encapsulated organization, this allows us to test each feature independently by importing a specific module (that we want to test) into our TestingModule.

In this lesson, we’ll be testing the “Coffees” feature we worked on 
throughout this course, and test some of the CRUD endpoints we provided in it so far.

---

**💡 IMPORTANT NOTE**

Sometimes when errors happen within npm scripts (such as the tests we're running inside test:e2e), post hooks won't run!

**You have a few options here, when these errors happen, you can:**

1) Manually run the `posttest:e2e` hook when Jest errors happen (to make sure your database gets removed)

2)
 Use a library like `npm-run-all` (npm i --D npm-run-all) and use the 
--continue-on-error flag to make sure everything still runs, moving the 
"post" hook into an npm script to run, like so:

*"pretest:e2e": "docker-compose up -d test-db",*

*"run:jest": "jest --config ./test/jest-e2e.json",*

*"test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",*

*"test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"*

```jsx
// Run e2e tests for a -specific- file pattern
npm run test:e2e -- coffees

/* 💡💡 IMPORTANT NOTE 💡💡
  Sometimes when errors happen within npm scripts (such as the tests we're 
  running inside test:e2e), post hooks won't run! 
  
  You have a few options here, when these error happen, you can:
  
  1) Manually run the `posttest:e2e` hook.
  
  2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use 
     the --continue-on-error flag to make sure everything still runs, moving the "post" hook
     into an npm script to be ran
     
  For example:
  
  "pretest:e2e": "docker-compose up -d test-db",
  "run:jest": "jest --config ./test/jest-e2e.json",
  "test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",
  "test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"
*/

/*
  docker-compose.yml - FINAL CODE 
*/
version: "3"

services:
  db:
    image: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: pass123
  test-db:
    image: postgres
    restart: always
    ports:
      - "5433:5432" # 👈 Note the 5433 port (since we are using 5432 for our regular db)
    environment:
      POSTGRES_PASSWORD: pass123

/*
 package.json pre & post hook additions
*/

"pretest:e2e": "docker-compose up -d test-db",
"posttest:e2e": "docker-compose stop test-db && docker-compose rm -f test-db"

/* 
  test/coffees/coffees.e2e-spec.ts - FINAL CODE 
*/
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
```

## **Implementing e2e Test Logic**

**💡 WARNING!**
 If you're using **Jest >= v27**
, instead of using *jasmine*
 helpers, you should use the *expect*
 object. For example, instead of using the *jasmine.objectContaining()*
 helper, use the *expect.objectContaining()*
.

In the previous lesson, we created a boilerplate for our test, and even set up a test database for all our future e2e tests!

In this lesson, let’s focus on adding real logic to all of our “todo” e2e 
tests, and ensure that our CRUD coffees routes work as intended!