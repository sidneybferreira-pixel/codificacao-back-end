import { Module } from '@nestjs/common';
import { ProdutorController } from './produtos/produtos.controller.js';

@Module({
  imports: [],
  controllers: [ProdutorController],
  providers: [],
})
export class AppModule {}
