# 🏨 CRUD de Hóspedes — Sistema de Reserva de Hotel

Projeto acadêmico de um sistema de gerenciamento de hóspedes para um hotel, desenvolvido com **Java Spring Boot** no backend e **Next.js** no frontend.

---

## 📁 Estrutura do Projeto

```
Reserva-Hotel/
├── backend/    → API REST em Java com Spring Boot
└── frontend/   → Interface web em Next.js + Tailwind CSS
```

---

## ✅ Funcionalidades

- **RF0101** — Cadastrar hóspede
- **RF0102** — Alterar cadastro de hóspede
- **RF0103** — Inativar hóspede
- **RF0104** — Consultar hóspedes com filtros por nome e CPF

### Regras de negócio aplicadas

- Todos os dados obrigatórios validados (RN0201)
- CPF único no sistema (RN0202)
- Formato de e-mail validado (RN0211)

---

## 🖥️ Tecnologias

**Backend**
- Java 17
- Spring Boot 3.2.5
- Spring Data JPA
- Spring Validation
- Banco de dados H2 (in-memory)
- Arquitetura: Controller → Fachada → Strategy → DAO

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/download.cgi)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (recomendado)

---

### Backend

1. Abra a pasta `backend/` no IntelliJ IDEA
2. Aguarde o Maven baixar as dependências (Maven Reload)
3. Execute a classe `HotelApplication.java`

O servidor sobe em **http://localhost:8080**

> Console do banco H2 disponível em: http://localhost:8080/h2-console  
> JDBC URL: `jdbc:h2:mem:hoteldb` | Usuário: `sa` | Senha: *(vazio)*

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em **http://localhost:3000** e automaticamente se comunica com o backend na porta 8080.

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/hospedes` | Lista todos os hóspedes (filtros: `?nome=` `?cpf=`) |
| `POST` | `/api/hospedes` | Cadastra novo hóspede |
| `PUT` | `/api/hospedes/{id}` | Altera dados do hóspede |
| `DELETE` | `/api/hospedes/{id}` | Inativa o hóspede |

---

## 📋 Dados do hóspede

| Campo | Obrigatório |
|-------|-------------|
| Nome completo | ✅ |
| CPF | ✅ |
| Data de nascimento | ✅ |
| E-mail | ✅ |
| Telefone | ✅ |
| Logradouro | ✅ |
| Número | ✅ |
| CEP | ✅ |
| Bairro | ✅ |
| Cidade | ✅ |
| Estado | ✅ |
| Complemento | ❌ |