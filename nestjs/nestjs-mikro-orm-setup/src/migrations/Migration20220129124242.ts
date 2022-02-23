import { Migration } from '@mikro-orm/migrations';

export class Migration20220129124242 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null);');
  }

}
