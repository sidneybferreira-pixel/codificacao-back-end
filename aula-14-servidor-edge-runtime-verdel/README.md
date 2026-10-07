# 🚀 Aula 14 — Servidor Edge Runtime com Vercel

> Desenvolvimento de uma função HTTP utilizando **Edge Runtime** e a plataforma **Vercel**.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **TypeScript** | Desenvolvimento da função |
| **Vercel** | Execução e hospedagem |
| **Edge Runtime** | Ambiente de execução da função |
| **HTTP / JSON** | Comunicação e retorno de dados |

---

## 📚 Tópicos estudados

- ⚡ Edge Runtime
- ☁️ Funções Serverless
- 🌐 Requisições HTTP
- 📦 Respostas em JSON
- 📊 Status HTTP
- 🕐 Medição do tempo de execução
- 🚀 Execução de funções na Vercel

---

## 🎯 Objetivos

Nesta aula, o objetivo foi compreender o funcionamento do **Edge Runtime** e desenvolver uma função capaz de receber uma requisição HTTP e retornar informações em formato JSON.

Ao final da atividade, foi possível:

- Criar uma função utilizando o Edge Runtime;
- Trabalhar com requisições e respostas HTTP;
- Retornar dados estruturados em JSON;
- Configurar o status da resposta;
- Definir o tipo de conteúdo retornado;
- Medir o tempo de execução da função;
- Conhecer o funcionamento de aplicações executadas pela Vercel.

---

## 💻 Desenvolvimento

Foi criada uma função utilizando a configuração:

```ts
export const config = {
    runtime: 'edge',
};