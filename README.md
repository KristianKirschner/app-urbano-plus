# Urbano +
Projeto feito como parte da disciplina Projeto Integrador V com o professor Thiago

---

# Frontend (React Native com Expo)

## Acessar o projeto
```bash
cd mobile
```

## Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do diretório `mobile/` com o seguinte conteúdo:
```env
GOOGLE_MAPS_API_KEY=a-chave-que-ta-no-zap
```

## Instalar dependências
```bash
npm install
```

## Iniciar o projeto
```bash
npx expo start
```

---

# Backend (Spring Boot)

## Acessar o projeto
```bash
cd backend
```

## Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `backend/` com o seguinte conteúdo:

```env
JWT_SECRET=minha-chave-secreta-com-mais-de-32-caracteres-aqui
```

> * A chave deve ter no mínimo 32 caracteres para funcionar corretamente.

## Gerar o build (JAR)
```bash
mvn clean package
```

O arquivo `.jar` será gerado em:
```
target/
```

---

# Docker (Backend + Banco de Dados)

## Subir containers
```bash
docker compose up --build
```

---

# Endpoints prontos (por enquanto)

## Auth
| Método | Rota | Descrição | Bearer Token | Role |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/users` | Cadastro de novo usuário | Não | — |
| `POST` | `/login` | Autenticação e geração de token | Não | — |
| `GET` | `/me` | Detalhes do usuário autenticado | Sim | Qualquer |

## Ocorrências
| Método | Rota | Descrição | Bearer Token | Role |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/occurrences` | Lista ocorrências aprovadas e não expiradas | Sim | Qualquer |
| `GET` | `/occurrences/{id}` | Detalhes de uma ocorrência | Sim | Qualquer |
| `GET` | `/occurrences/{id}/comments` | Lista comentários de uma ocorrência | Sim | Qualquer |
| `GET` | `/occurrences/my` | Lista ocorrências do usuário autenticado | Sim | Qualquer |
| `POST` | `/occurrences` | Reportar nova ocorrência com fotos | Sim | Cidadão |
| `POST` | `/occurrences/{id}/reopen` | Reabrir ocorrência expirada | Sim | Cidadão |
| `POST` | `/occurrences/{id}/comments` | Adicionar comentário em uma ocorrência | Sim | Cidadão |
| `GET` | `/occurrences/admin?status=` | Lista ocorrências por status (pending, rejected, expired) | Sim | Admin |
| `PATCH` | `/occurrences/{id}/approve` | Aprovar ocorrência | Sim | Admin |
| `PATCH` | `/occurrences/{id}/reject` | Rejeitar ocorrência com motivo | Sim | Admin |
| `DELETE` | `/occurrences/{id}/comments/{commentId}` | Remover comentário inapropriado | Sim | Admin |
