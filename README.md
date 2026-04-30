# Urbano +
Projeto feito como parte da disciplina Projeto Integrador V com o professor Thiago


# Frontend (React Native com Expo)

## Acessar o projeto

```bash
cd mobile
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

## Gerar o build (JAR)

```bash
mvn clean package -DskipTests
```

O arquivo .jar será gerado em:

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
# Endpoints prontos  (por enquanto)

| Método | Rota | Descrição | Bearer Token |
| :--- | :--- | :--- | :--- |
| `POST` | `/users` | Cadastro de novo usuário | Não |
| `POST` | `/login` | Autenticação e geração de token | Não |
| `GET` | `/me` | Detalhes do usuário autenticado | Sim |
