# 🚀 Aula 15 — Tratamento de Erros e Status Code no NestJS

> Desenvolvimento de uma API utilizando **NestJS**, trabalhando com **tratamento de erros**, **Status Codes HTTP**, validação de parâmetros e registro de informações com **Logger**.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **TypeScript** | Desenvolvimento da aplicação |
| **Node.js** | Ambiente de execução |
| **NestJS** | Desenvolvimento da API |
| **Thunder Client** | Testes das requisições HTTP |

---

## 📚 Tópicos estudados

- ⚠️ Tratamento de erros
- 🚨 Exceções HTTP
- 📊 Status Codes
- 🔎 Validação de parâmetros
- 🛣️ Rotas dinâmicas
- 🔍 Busca de produtos por ID
- 📝 `Logger`
- ❌ `BadRequestException`
- 🔎 `NotFoundException`
- 🌐 Requisições HTTP

---

## 🎯 Objetivos

Nesta aula, o objetivo foi compreender como realizar o **tratamento de erros em uma API NestJS**, utilizando exceções HTTP e diferentes Status Codes de acordo com cada situação.

Ao final da atividade, foi possível:

- Criar uma rota dinâmica para buscar produtos;
- Trabalhar com parâmetros recebidos pela URL;
- Validar o ID informado na requisição;
- Utilizar `BadRequestException`;
- Utilizar `NotFoundException`;
- Trabalhar com diferentes Status Codes HTTP;
- Utilizar o `Logger` do NestJS;
- Testar diferentes situações utilizando o Thunder Client.

---

## 💻 Desenvolvimento

Foi desenvolvida uma API de produtos utilizando **NestJS**.

Durante a implementação, foi criada uma rota dinâmica para realizar a busca de um produto através do seu ID:

```http
GET /produtos/:id