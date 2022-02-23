# Nestjs + MikroORM

Projeto do video [](). Mas se você prefere ler, também pode seguir esse README or ler meu artigo no [Medium](). 

Você irá aprender a criar uma aplicação backend utilizando [Nestjs](https://github.com/nestjs/nest) e o [MikroORM](https://github.com/mikro-orm/mikro-orm) para conectar com um banco de dados.  
Irei assumir que você já possui o **Nodejs** e o **Postgres** instalado.

### Criando projeto Nestjs

Primeiramente precisaremos instalar globalmente o CLI do Nestjs

```bash
npm i -g @nestjs/cli
```

Utilizando o CLI do Nest, você pode criar um novo projeto com o comando `nest new` e o nome do diretório que você gostaria de utilizar. 

```bash
nest new backend
```

Podendo também escolher qual gerenciador de pacotes utilizar.

### Instalando MikroORM

Para usar o MikroORM, precisamos instalar os pacotes *mikro-orm/core*, *mikro-orm/nestjs,* e *mikro-orm/postgresql.*

```bash
npm i @mikro-orm/core @mikro-orm/nestjs @mikro-orm/postgresql
```

Você também pode utilizar outros banco de dados como *mongodb, mysql*, *mariadb ou* *sqlite*, mas recomendo das uma olhada na documentação caso você vá utilizar um banco diferente.

### Configuração da conexão com o banco de dados

Para configurar a conexão com o bando de dados, precisamos configurar o MikroORM no `package.json`, definindo o caminho do arquivo de configuração e definir que estamos utilizando o `ts-node`.

```json
{
	...
	"mikro-orm": {
    "useTsNode": true,
    "configPaths": [
      "./mikro-orm.config.ts",
      "./dist/mikro-orm.config.js"
    ]
  }
}
```

E criar um arquivo de configuração, onde definiremos o parâmetros de conexão com o banco, como a porta, usuário, host, tipo de banco e senha. Também iremos definir um regex para o local onde se localiza nossas entidades e local onde iremos criar nossas migrações de banco.

```ts
import { Options } from '@mikro-orm/core';
import * as path from 'path';

const mikroOrmConfig: Options = {
  port: 5432,
  user: 'postgres',
  host: 'localhost',
  type: 'postgresql',
  dbName: 'postgres',
  password: 'postgres',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: path.resolve(__dirname, './src/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default mikroOrmConfig;
```

Para configurar a conexão com o banco de dados, basta passar utilizar o método “forRoot” nos *imports* do *“AppModule”*

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Criação de módulos

Com a conexão com o banco de dados configurada, podemos criar um módulo para nossa aplicação através do comando “*nest g res*” e o nome do modulo que você gostaria de criar.

```bash
nest g res user
```

Onde “g” significa “*generate*” e o “res” significa “*resource*”.

Vamos escolher a opção “*REST API*”, mas você também pode criar módulos com supporte para GraqhQL, Microserviços e WebSockets. E iremos digitar “y” para gerar os métodos básicos de um *CRUD*.

Na pasta *source* (”*src*”) podemos ver a pasta do modulo que acabamos de criar. Lá teremos nossas entidades, *controllers, services* e tudo que pertencer ao modulo.

Assim como no arquivo `app.module` o modulo gerado será automaticamente importado.

```tsx
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Para definir uma classe como sendo uma entidade do MikroORM, utilizaremos o *decorator* “Entity”.

```tsx
import { Entity } from '@mikro-orm/core';

@Entity()
export class User {}
```

E para definir uma propriedade usaremos o decorator “*Property*”.

```tsx
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @Property()
  username!: string;
}
```

Também é necessário definir uma chave primaria através do decorator “*PrimaryKey*”

```tsx
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;
}
```

Para o MikroORM reconhecer essa entidade, é necessário importa-las utilizando o método “forFeature”.

```tsx
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Configurando Migrations

Antes de conectarmos com o banco de dados, precisaremos criar *Migrations* que criará automaticamente as tabelas no banco de dados a partir de nossas entidades e, para isso, utilizaremos o *C-L-I* do mikro-orm instalando o pacote *mikro-orm/cli* como uma dependência de desenvolvimento. 

```bash
npm i -D @mikro-orm/cli
```

Para criar nossa primeira *migration* podemos criar um *script* no `package.json` para executar o comando `mikro-orm migration:create`

```tsx
{
	...
  "scripts": {
		...
    "migration:create": "mikro-orm migration:create"
  },
}
```

E ao rodarmos o comando `npm run migration:create`  o MikroOrm irá ler o arquivo de configurações, encontrar as entidades e gerar um arquivo dentro de `src/migrations` com o SQL correspondente para gerar as tabelas do banco.

```bash
npm run migration:create
```

Para garantir que as *migrations* sempre sejam executadas e estejam atualizadas, no arquivo `main.ts` podemos pegar a instancia do MikroORM com `app.get` e chamar o método `getMigrator` e `up` que irá executar todas as *migrations* que não ainda não foram executadas.

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mikroOrm = app.get(MikroORM);
  await mikroOrm.getMigrator().up();

  await app.listen(3000);
}
bootstrap();
```

### Executando a aplicação

Podemos executar a aplicação através do comando 

```bash
	npm run start:dev
```

Esse comando irá executar a aplicação em modo de desenvolvimento, e sempre que você salvar algum arquivo, irá reexecutar a aplicação.

### Implementando DTOs

Se olharmos nos *controllers* e *services*, veremos que utilizam D-T-Os no qual precisaremos definir sua propriedades.

No D-T-O de *create,* queremos utilizar as mesmas propriedades de nossa entidade, para isso **podemos estender nossa classe utilizando o `PickType` importado do *nestjs/mapped-types* onde passaremos uma entidade e um array com as propriedades que queremos estender da entidade.

```tsx
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['username']) {}
```

Assim o nosso D-T-O conterá propriedades idênticas da entidade definida e caso o tipo das propriedades mudem ou sejam adicionados novos decorators, o D-T-O também é atualizado.

No D-T-O de *update* a classe já estende do D-T-O de *create* utilizando o `PartialType` , que faz com que todas as propriedades da entidade sejam opcionais.

### Implementando *services* e *repositories*

Agora podemos implementar o *service* e para utilizar o *repository* da nossa entidade no *service* injetaremos no construtor através do *decorator* `InjectRepository` .

```tsx
constructor(
  @InjectRepository(User)
  private readonly userRepository: EntityRepository<User>,
) {}
```

Onde “*private readonly”* define uma propriedade privada da classe que só pode ser lida.

E assim implementaremos os métodos `create`, `findAll`, `findOne`, `update`, e `remove`, que são utilizados no *controller.*

```tsx
async create(createUserDto: CreateUserDto) {
  const user = this.userRepository.create(createUserDto);
  await this.userRepository.persistAndFlush(user);
  return user;
}

findAll() {
  return this.userRepository.findAll();
}

findOne(id: number) {
  return this.userRepository.findOne(id);
}

update(id: number, updateUserDto: UpdateUserDto) {
  return this.userRepository.nativeUpdate({ id }, updateUserDto);
}

async remove(id: number) {
  return this.userRepository.nativeDelete(id);
}
```

### Fazendo requisições para a aplicação

Assim, com a aplicação rodando, podemos mandar uma requisição http para testarmos se os métodos estão funcionando.

```bash
curl -H "Content-Type: application/json" -X POST  -d '{"username": "edu"}'  localhost:3000/user
```