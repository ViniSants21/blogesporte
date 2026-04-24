# 🚀 INICIO RÁPIDO - Blog de Esportes

## Passo 1: Preparar o Ambiente

```bash
# Instalar dependências
npm install
```

## Passo 2: Configurar Supabase

1. **Criar Projeto no Supabase**
   - Acesse: https://supabase.com
   - Faça login ou crie uma conta
   - Clique em "New Project"
   - Escolha um nome, senha e região
   - Aguarde a criação do projeto

2. **Obter Credenciais**
   - Na dashboard do Supabase
   - Vá em: Settings → API
   - Copie a URL do projeto
   - Copie a Anon Key (chave pública)

3. **Configurar .env.local**
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione:
   ```
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
   ```

4. **Criar Tabelas no Banco de Dados**
   - No painel do Supabase, abra "SQL Editor"
   - Clique em "+ New Query"
   - Cole o script SQL abaixo integralmente

## Script SQL para Criar Tabelas

```sql
-- Criar tabela de posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Criar tabela de comentários
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Criar tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

## Passo 3: Executar a Aplicação

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

## Passo 4: Teste a Aplicação

1. **Criar um Post**
   - Clique em "+ Novo Post"
   - Preencha os campos obrigatórios
   - Clique em "Salvar Post"

2. **Visualizar Posts**
   - Volte para a Home
   - Veja o novo post na lista

3. **Comentar**
   - Clique em "Leia mais" no post
   - Role para baixo até "Comentários"
   - Preencha nome e mensagem
   - Clique em "Enviar Comentário"

4. **Editar/Deletar**
   - Na página do post
   - Clique em "✏️ Editar" ou "🗑️ Excluir"

## Troubleshooting

### Erro: "URL vazia" ou "Chave não definida"
```
Solução: Verifique se .env.local está preenchido corretamente e reinicie o servidor
```

### Posts não aparecem
```
Solução: 
1. Verifique se as tabelas foram criadas
2. No Supabase, vá em: SQL Editor → Verifique se as tabelas existem
3. Abra o console do navegador (F12) e procure por erros
```

### Erro de CORS
```
Solução: Isso indica problema na URL do Supabase. Verifique se está correta.
```

## Recursos Úteis

- [Documentação React](https://react.dev)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com)
- [Documentação React Router](https://reactrouter.com)

## Próximos Passos (Desafios Extras)

- [ ] Adicionar autenticação com Supabase Auth
- [ ] Implementar upload de imagens com Supabase Storage
- [ ] Adicionar paginação
- [ ] Implementar filtro por data
- [ ] Adicionar rating/likes em posts
- [ ] Permitir edição de comentários
- [ ] Implementar notificações em tempo real
- [ ] Adicionar dark mode

---

**Boa sorte! 🚀**
