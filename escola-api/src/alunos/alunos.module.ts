import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { alunosController } from "./alunos.controller.js";
import { alunosService } from "./alunos.service.js";
import { Aluno, AlunoSchema } from "./dto/schemas/aluno.schemas.js";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Aluno.name, schema:AlunoSchema
        }])
    ],
    controllers:[alunosController],
    providers:[alunosService],
})
export class AlunosModule {}