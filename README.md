# dlibrary-api

Backend do D.Library — uma aplicação de gestão de leituras com recomendações via grafo.

**Stack:** NestJS · TypeScript · PostgreSQL · Neo4j · Redis  
**Deploy:** Fly.io — `https://dlibrary-api.fly.dev` _(em breve)_

---

## Sprint 0 — Fundação do Projeto

> **Status:** ✅ Completo  
> **Repositório:** dlibrary-api

### O que foi construído

No Sprint 0, criamos a base do projeto do zero. Isso incluiu: gerar a estrutura inicial do NestJS, configurar o TypeScript no modo mais rigoroso possível, subir o banco de dados PostgreSQL e o Redis localmente via Docker, conectar a aplicação ao banco usando o TypeORM, e criar o primeiro endpoint real `GET /health` com testes
automatizados. No caminho, resolvemos um problema prático: o PostgreSQL já instalado no Windows ocupava a porta padrão 5432, então movemos o contêiner Docker para a porta 5433.

### Princípio OOP central

O conceito central deste Sprint foi o **IoC Container**. Em vez de criar objetos manualmente, ex: `new Objeto`, você declara o que cada classe precisa, e o Nest resolve e entrega tudo automaticamente na inicialização. Isso evita que uma classe precise conhecer os detalhes de como outra é construída. Além disso, o Sprint introduziu o **SRP(Single Responsibility Principle)** que consiste em: cada classe tem uma única função, o Controller recebe requisições HTTP, o Service contém a lógica, o Repository fala com o banco.

### Ambientes

- **Local:** PostgreSQL e Redis via Docker Compose (porta 5433 e 6379)
- **Produção:** Fly.io Postgres + Redis _(Sprint 10)_

### Decisões Técnicas

| Decisão                  | Alternativa descartada    | Por que esta escolha                            |
| ------------------------ | ------------------------- | ----------------------------------------------- |
| PostgreSQL na porta 5433 | Porta padrão 5432         | Conflito com PostgreSQL nativo do Windows       |
| Neo4j Aura Free          | Neo4j em contêiner Docker | Contêiner excede memória do free tier do Fly.io |
| `DB_HOST=localhost`      | IP fixo 127.0.0.1         | Compatível com WSL2 após ajuste de porta        |

### Como rodar localmente

```bash
docker compose up -d
npm install
npm run start:dev
```

Verificar: `http://localhost:3000/health` deve retornar `{"status":"ok"}`

### Endpoints disponíveis

| Método | Path    | Descrição                 |
| ------ | ------- | ------------------------- |
| GET    | /health | Health check da aplicação |
