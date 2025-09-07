# Pão dos Pobres Backend

## ✨ Características

- **Arquitetura Limpa**: Separação clara entre domínio, aplicação e infraestrutura
- **NestJS**: Framework moderno e robusto para Node.js
- **Prisma ORM**: Type-safe database toolkit com PostgreSQL
- **Swagger/OpenAPI**: Documentação automática da API
- **Docker**: Containerização com PostgreSQL
- **TypeScript**: Tipagem estática para maior segurança
- **Jest**: Testes unitários e e2e
- **ESLint + Prettier**: Padronização de código
- **Validação**: Class-validator para validação de dados

## 📁 Estrutura do Projeto

src/
├── application/ # Camada de aplicação
│ ├── dtos/ # Data Transfer Objects
│ ├── use-cases/ # Casos de uso da aplicação
│ └── utils/ # Utilitários da aplicação
├── domain/ # Camada de domínio
│ ├── adapters/ # Interfaces e adaptadores
│ ├── entities/ # Entidades do domínio
│ └── repositories/ # Interfaces dos repositórios
└── infra/ # Camada de infraestrutura
├── commons/ # Componentes comuns
├── config/ # Configurações da aplicação
├── controllers/ # Controladores HTTP
├── integrations/ # Integrações externas
├── mappers/ # Mapeadores de dados
├── modules/ # Módulos NestJS
└── repositories/ # Implementações dos repositórios

## 🛠️ Tecnologias

- **Backend**: NestJS 11
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5.16.2
- **Documentação**: Swagger + Scalar API Reference
- **Testes**: Jest
- **Containerização**: Docker & Docker Compose
- **Linting**: ESLint + Prettier

# 🚀 Como Usar

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Yarn

### Instalação

1. **Clone o repositório**

```bash
git clone <seu-repositorio>
cd example-project
```

2. **Instale as dependências**

```bash
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

4. **Suba o banco de dados**

```bash
docker-compose up -d
```

5. **Execute as migrações**

```bash
yarn prisma migrate dev
```

6. **Inicie o servidor de desenvolvimento**

```bash
yarn start:dev
```

### Scripts Disponíveis

- `yarn start:dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o projeto
- `yarn start:prod` - Inicia o servidor em produção
- `yarn test` - Executa os testes
- `yarn test:e2e` - Executa testes end-to-end
- `yarn lint` - Executa o linter
- `yarn format` - Formata o código

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação da API em:

- **Swagger UI**: `http://localhost:3000/docs`
- **API Reference**: Interface moderna e interativa

## 🏗️ Arquitetura

Este projeto segue os princípios da **Clean Architecture**:

### Camadas

1. **Domain**: Contém as regras de negócio e entidades
2. **Application**: Orquestra os casos de uso
3. **Infrastructure**: Implementa detalhes técnicos (HTTP, banco, etc.)

### Benefícios

- **Independência de frameworks**: O domínio não depende de NestJS
- **Testabilidade**: Fácil de testar cada camada isoladamente
- **Manutenibilidade**: Mudanças em uma camada não afetam outras
- **Flexibilidade**: Pode trocar tecnologias sem afetar o domínio

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes em modo watch
yarn test:watch

# Testes com cobertura
yarn test:cov

# Testes end-to-end
yarn test:e2e
```

## 🐳 Docker

### Desenvolvimento

```bash
# Subir apenas o banco
docker-compose up -d

```

## 🔧 Configuração

### Variáveis de Ambiente

```env
DATABASE_URL="postgresql://docker:docker@localhost:5433/pao-dos-pobres-database"
PORT=3000
```

### Banco de Dados

- **Host**: localhost
- **Porta**: w
- **Usuário**: docker
- **Senha**: docker
- **Database**: pao-dos-pobres-database

