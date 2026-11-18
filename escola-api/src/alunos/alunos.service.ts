import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoServerError } from "mongodb";

import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { Aluno, AlunoDoc } from "./dto/schemas/aluno.schemas.js";

@Injectable()
export class AlunosService {
    constructor(
        @InjectModel(Aluno.name)
        private alunoModel: Model<AlunoDoc>,
    ) {}

    // CRUD
    // C - CREATE (CRIAR)
    // R - READ (LER/CONSULTAR)
    // U - UPDATE (ATUALIZAR)
    // D - DELETE (APAGAR)

    // C - Cadastrar aluno
    async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
        try {
            const alunoCriado = new this.alunoModel(createAlunoDto);
            return await alunoCriado.save();
        } catch (error: unknown) {
            if (
                error instanceof MongoServerError &&
                error.code === 11000
            ) {
                throw new ConflictException(
                    "Já existe um aluno cadastrado com essa matrícula.",
                );
            }

            throw new InternalServerErrorException(
                "Erro ao processar o cadastro do aluno.",
            );
        }
    }

    // R - Buscar alunos com paginação, filtros e ordenação
    async findPageFilter(
        page: number,
        limit: number,
        nome?: string,
        curso?: string,
        orderBy?: string,
        orderDirection?: "asc" | "desc",
    ) {
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = {
            ativo: true,
        };

        const sort: Record<string, 1 | -1> = {};

        if (nome) {
            filter.nome = {
                $regex: nome,
                $options: "i",
            };
        }

        if (curso) {
            filter.cursos = curso;
        }

        if (orderBy) {
            sort[orderBy] = orderDirection === "desc" ? -1 : 1;
        }

        const [data, total] = await Promise.all([
            this.alunoModel
                .find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec(),

            this.alunoModel.countDocuments(filter).exec(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // R - Buscar um aluno pelo ID
    async findOne(id: string): Promise<Aluno> {
        const aluno = await this.alunoModel
            .findOne({
                _id: id,
                ativo: true,
            })
            .exec();

        if (!aluno) {
            throw new NotFoundException(
                `Aluno com ID ${id} não encontrado.`,
            );
        }

        return aluno;
    }

    // U - Atualizar um aluno
    async update(
        id: string,
        updateAlunoDto: UpdateAlunoDto,
    ): Promise<Aluno> {
        const alunoAtualizado = await this.alunoModel
            .findOneAndUpdate(
                {
                    _id: id,
                    ativo: true,
                },
                updateAlunoDto,
                {
                    new: true,
                    runValidators: true,
                },
            )
            .exec();

        if (!alunoAtualizado) {
            throw new NotFoundException(
                `Aluno com ID ${id} não encontrado.`,
            );
        }

        return alunoAtualizado;
    }

    // D - Excluir aluno logicamente (Soft Delete)
    async remove(id: string): Promise<Aluno> {
    const alunoRemovido = await this.alunoModel
        .findOneAndUpdate(
            { _id: id, ativo: true },
            { $set: { ativo: false } },
            { new: true }
        )
        .exec();

    if (!alunoRemovido) {
        throw new NotFoundException(
            `Aluno com ID ${id} não encontrado ou já removido.`
        );
    }

    return alunoRemovido;
}
    // Restaurar um aluno removido
    async restore(id: string): Promise<Aluno> {
        const alunoRestaurado = await this.alunoModel
            .findOneAndUpdate(
                {
                    _id: id,
                    ativo: false,
                },
                {
                    ativo: true,
                },
                {
                    new: true,
                },
            )
            .exec();

        if (!alunoRestaurado) {
            throw new NotFoundException(
                `Aluno não encontrado para restauração pelo ID ${id}.`,
            );
        }

        return alunoRestaurado;
    }
}