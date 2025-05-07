# Click Beard Backend

## Descrição

O Click Beard Backend é uma API RESTful para gerenciamento de barbearias, oferecendo funcionalidades como agendamento de serviços, gestão de barbeiros e clientes.

## Tecnologias Principais

### Framework & Runtime

- **Bun**: Runtime JavaScript de alta performance
- **TypeScript**: Superset tipado de JavaScript
- **Elysia**: Framework web rápido e tipado

### Banco de Dados & ORM

- **Prisma**: ORM moderno para TypeScript
- **SQLite**: Banco de dados relacional (desenvolvimento)

### Autenticação & Segurança

- **JWT**: Autenticação baseada em tokens
- **Bun Password**: Hash seguro de senhas

### Documentação & Logging

- **Swagger**: Documentação automática da API
- **Logysia**: Sistema de logging

## Requisitos

- Bun (runtime JavaScript)
- Node.js (versão compatível com as dependências)

## Configuração do Ambiente

1. Clone o repositório
2. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="seu-segredo-jwt"
   FRONTEND_URL="http://localhost:5173"
   PORT="3000"
   ```

## Como Executar Localmente

1. Instale as dependências:
   ```bash
   bun install
   ```

2. Configure o banco de dados:
   ```bash
   bun db:generate
   bun db:pull
   bun db:migrate
   bun db:seed
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   bun dev
   ```

4. Acesse a documentação da API:
   ```
   http://localhost:3000/swagger
   ```

## Scripts Disponíveis

- `bun dev`: Inicia o servidor de desenvolvimento com hot-reload
- `bun start`: Inicia o servidor em modo produção
- `bun build`: Compila o TypeScript para produção
- `bun db:generate`: Gera o cliente Prisma
- `bun db:pull`: Sincroniza o schema do banco de dados
- `bun db:migrate`: Executa as migrações do banco de dados
- `bun db:seed`: Popula o banco com dados iniciais
- `bun db:studio`: Abre o Prisma Studio para gerenciamento do banco

## Estrutura do Projeto

- `/src`: Código fonte da aplicação
  - `/database`: Configuração e conexão com o banco de dados
  - `/models`: Definições de tipos e modelos
  - `/plugins`: Plugins
  - `/routes`: Rotas da API
  - `/services`: Lógica de negócio
- `/prisma`: Schema e migrações do banco de dados
