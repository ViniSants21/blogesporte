-- Script SQL para criar todas as tabelas do Blog de Esportes
-- Execute este script no SQL Editor do Supabase

-- ============================================
-- TABELA: POSTS
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- TABELA: COMMENTS
-- ============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- TABELA: USERS (Opcional para futuro)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- ============================================
-- POLÍTICAS DE RLS (Row Level Security)
-- COMENTÁRIO: Para desenvolvimento, pode usar públicas
-- Para produção, considere criar políticas mais restritivas
-- ============================================

-- Habilitar RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para leitura
CREATE POLICY "Posts são acessíveis por todos (SELECT)" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Comentários são acessíveis por todos (SELECT)" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Posts podem ser criados por todos (INSERT)" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Posts podem ser atualizados por todos (UPDATE)" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Posts podem ser deletados por todos (DELETE)" ON posts
  FOR DELETE USING (true);

CREATE POLICY "Comentários podem ser criados por todos (INSERT)" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Comentários podem ser deletados por todos (DELETE)" ON comments
  FOR DELETE USING (true);

-- ============================================
-- DADOS DE EXEMPLO (Opcional - para testes)
-- ============================================

-- Descomentar as linhas abaixo para adicionar dados de exemplo

/*
INSERT INTO posts (title, content, category, author, image_url) VALUES
(
  'Brasil vence Argentina na final da Copa',
  'Em uma partida emocionante, a seleção brasileira conquistou seu terceiro título consecutivo da Copa América. O jogo foi decidido nos pênaltis, após um empate de 1-1 durante os 90 minutos. Neymar marcou o gol da vitória na série de pênaltis.',
  'Futebol',
  'João Silva',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500'
),
(
  'Novo recorde no salto em altura',
  'O atletismo viu um novo recorde mundial ser estabelecido ontem à noite. O atleta conquistou a marca de 2.47 metros, quebrando o recorde anterior de 15 anos. Isso marca um momento histórico para o esporte.',
  'Atletismo',
  'Maria Santos',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500'
),
(
  'Basquete: NBB tem nova temporada',
  'A nova temporada da NBB começou com dois jogos emocionantes. O destaque ficou para a participação dos novos talentos brasileiros. As equipes estão se preparando para os próximos confrontos.',
  'Basquete',
  'Carlos Oliveira',
  'https://images.unsplash.com/photo-1546519638-68711109d298?w=500'
);
*/

-- Fim do script
