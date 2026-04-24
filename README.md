# 📰 Blog de Esportes - React + Vite + Supabase

Uma aplicação web completa para gerenciamento de um blog de esportes com operações CRUD (Create, Read, Update, Delete) implementadas usando React, Vite como bundler e Supabase como backend.

## 🎯 Funcionalidades

### ✅ Implementadas
- **CRUD de Posts**: Criar, visualizar, editar e deletar notícias esportivas
- **Sistema de Comentários**: Adicionar, visualizar e deletar comentários em posts
- **Busca e Filtros**: Buscar posts por título ou autor
- **Filtro por Categoria**: Filtrar posts por modalidade esportiva
- **Contador de Posts**: Visualizar quantidade de posts por categoria
- **Interface Responsiva**: Design mobile, tablet e desktop
- **Validação de Formulários**: Campos obrigatórios e feedback visual
- **Navegação com React Router**: Gerenciamento de rotas intuitivo
- **Estados de Carregamento**: Feedback visual durante operações assíncronas

### 🔧 Tecnologias

- **Frontend**: React 18 + Vite
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estilização**: Tailwind CSS
- **Roteamento**: React Router v6
- **Cliente Supabase**: @supabase/supabase-js

## 📋 Requisitos do Sistema

- Node.js 16+ e npm
- Conta no [Supabase](https://supabase.com)
- Git (opcional)

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd blogesporte
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Supabase

#### 3.1 Criar Banco de Dados

Acesse [https://supabase.com](https://supabase.com) e crie um novo projeto.

#### 3.2 Criar Tabelas

No painel do Supabase, abra o SQL Editor e execute o seguinte script:

```sql
-- Tabela de Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela de Comentários
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela de Usuários (Opcional)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Índices para melhor performance
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
```

#### 3.3 Configurar Credenciais

1. No painel do Supabase, vá para **Settings** → **API**
2. Copie a **URL** e a **Anon Key**
3. Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 4. Executar a Aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Navbar.jsx           # Barra de navegação
│   ├── PostCard.jsx         # Card individual de post
│   ├── PostForm.jsx         # Formulário para criar/editar posts
│   └── CommentSection.jsx   # Seção de comentários
├── pages/
│   ├── Home.jsx             # Página inicial com lista de posts
│   ├── CreatePost.jsx       # Página para criar novo post
│   ├── PostDetail.jsx       # Página com detalhes do post
│   └── EditPost.jsx         # Página para editar post
├── lib/
│   └── supabaseClient.js    # Configuração do cliente Supabase
├── styles/
│   └── globals.css          # Estilos globais
├── App.jsx                  # Componente principal com rotas
└── main.jsx                 # Ponto de entrada
```

## 📖 Como Usar

### Criar um Post
1. Clique em "+ Novo Post" na navbar
2. Preencha todos os campos obrigatórios
3. Opcionalmente, adicione uma URL de imagem
4. Clique em "Salvar Post"

### Visualizar Posts
- A página inicial exibe todos os posts em cards
- Use o buscador para procurar por título ou autor
- Use os botões de categoria para filtrar posts

### Editar um Post
1. Clique em "Leia mais" em um post
2. Clique no botão "✏️ Editar"
3. Modifique os dados desejados
4. Clique em "Salvar Post"

### Deletar um Post
1. Vá para o post que deseja deletar
2. Clique no botão "🗑️ Excluir"
3. Confirme a exclusão

### Comentar em um Post
1. Abra um post
2. Preencha seu nome e mensagem
3. Clique em "Enviar Comentário"
4. Seu comentário aparecerá na seção de comentários

## 🎨 Customizações

### Adicionar Novas Categorias
Edite o array `CATEGORIES` em `src/components/PostForm.jsx` e `src/pages/Home.jsx`

### Mudar Cores
Modifique os valores de cores Tailwind nos componentes ou configure o tema em `tailwind.config.js`

### Adicionar Campos Extras
1. Modifique a tabela no Supabase
2. Atualize o componente `PostForm.jsx`
3. Atualize as páginas que exibem posts

## 🔒 Segurança

- Use Row Level Security (RLS) no Supabase para controlar acesso aos dados
- Adicione autenticação para apenas administradores editarem/deletarem posts
- Nunca compartilhe suas chaves do Supabase no GitHub

## 📱 Responsividade

A aplicação é responsiva e funciona em:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (até 767px)

## 🚀 Desafios Extras Implementáveis

Você pode expandir este projeto com:

- [ ] Autenticação de usuários com Supabase Auth
- [ ] Upload de imagens usando Supabase Storage
- [ ] Paginação de posts
- [ ] Filtro por data
- [ ] Rating/Likes em posts
- [ ] Edição de comentários
- [ ] Notificações em tempo real
- [ ] Dark mode

## 🐛 Troubleshooting

### Erro: "Supabase URL não está definida"
- Verifique se o arquivo `.env.local` existe e está preenchido corretamente
- Reinicie o servidor de desenvolvimento

### Posts não aparecem
- Verifique se as tabelas foram criadas no Supabase
- Confirme se você tem acesso de leitura nas tabelas
- Verifique o console do navegador para erros

### Imagens não carregam
- Verifique se a URL é válida e acessível
- Tente usar imagens de um CDN público

## 📝 Script SQL Completo

Para facilitar, aqui está o script SQL para criar todas as tabelas de uma vez:

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

-- Habilitar RLS (segurança)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público (opcional - para desenvolvimento)
CREATE POLICY "Posts são acessíveis por todos" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Comentários são acessíveis por todos" ON comments
  FOR SELECT USING (true);
```

## 📞 Contato e Suporte

Para dúvidas, sugestões ou relatórios de bugs, abra uma issue no repositório.

## 📄 Licença

Este projeto é de código aberto e disponível sob a licença MIT.

---

**Desenvolvido com ❤️ usando React + Vite + Supabase**
