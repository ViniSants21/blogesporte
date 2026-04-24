# ❓ FAQ - Blog de Esportes

## Como Configurar o Projeto?

### 1. Configuração do Supabase

**Passo 1**: Acesse [supabase.com](https://supabase.com)
- Faça login ou crie uma conta gratuita
- Clique em "New Project"
- Configure nome do projeto, senha forte e região mais próxima
- Aguarde a criação (~2 minutos)

**Passo 2**: Copie as Credenciais
- No painel do seu projeto, vá para **Settings** → **API**
- Em "Project URL", copie a URL completa
- Em "Anon public", copie a chave pública
- Guarde essas informações com segurança

**Passo 3**: Crie o Banco de Dados
- No painel do Supabase, abra **SQL Editor**
- Clique em "+ New Query"
- Cole o conteúdo completo do arquivo `database.sql`
- Clique em "Run"
- Aguarde a execução (deve completar sem erros)

### 2. Configuração Local

**Passo 1**: Copie o arquivo .env.example
```bash
cp .env.example .env.local
```

**Passo 2**: Edite .env.local
- Abra o arquivo `.env.local`
- Substitua `sua_url_aqui` pela URL do Supabase
- Substitua `sua_anon_key_aqui` pela Chave Anônima
- Salve o arquivo

**Passo 3**: Reinicie o servidor
```bash
# Encerre o servidor (Ctrl+C)
# Execute novamente
npm run dev
```

## Erros Comuns e Soluções

### ❌ Erro: "Cannot read property 'from' of undefined"
**Causa**: Credenciais do Supabase incorretas ou não definidas

**Solução**:
1. Verifique se `.env.local` existe
2. Verifique se `VITE_SUPABASE_URL` está correto
3. Verifique se `VITE_SUPABASE_ANON_KEY` está correto
4. Reinicie o servidor

### ❌ Erro: "Failed to parse URL"
**Causa**: URL do Supabase inválida

**Solução**:
1. Copie novamente a URL do Supabase
2. Confirme se começa com `https://`
3. Confirme se contém `.supabase.co`

### ❌ Erro: "relations "posts" does not exist"
**Causa**: Tabelas não foram criadas no banco de dados

**Solução**:
1. Acesse o SQL Editor do Supabase
2. Cole e execute o script de `database.sql`
3. Recarregue a página da aplicação

### ❌ Posts não aparecem após criar
**Causa**: Possível erro de carregamento ou conectividade

**Solução**:
1. Abra o console do navegador (F12 → Console)
2. Procure por mensagens de erro
3. Verifique a aba "Network" para ver requisições
4. Verifique se as linhas foram inseridas no Supabase (abra Data Editor → posts)

### ❌ Imagens não carregam
**Causa**: URL da imagem inválida ou domínio bloqueado

**Solução**:
1. Verifique se a URL começa com `https://`
2. Tente colar a URL no navegador diretamente
3. Use imagens de CDNs públicos como:
   - unsplash.com
   - pexels.com
   - pixabay.com

### ❌ Erro ao deletar post
**Causa**: Comentários vinculados ao post

**Solução**:
- A aplicação já trata isso automaticamente (deleta comentários primeiro)
- Se ainda assim falhar, verifique as políticas de RLS no Supabase

## Como Fazer Uploads de Imagens?

### Opção 1: Usar URL Externa (Atual)
A aplicação já funciona com URLs externas. Use:
- Hospede a imagem online
- Cole a URL no campo "URL da Imagem"
- A imagem será exibida automaticamente

### Opção 2: Upload com Supabase Storage (Extra)
Para implementar upload de arquivos:

1. No Supabase, crie um bucket:
   - Vá para **Storage** → **Create New Bucket**
   - Nome: `posts-images`
   - Deixe público (true)

2. Modifique `PostForm.jsx`:
```javascript
// Adicione handler para upload
const handleImageUpload = async (file) => {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('posts-images')
    .upload(fileName, file)
  
  if (data) {
    const publicUrl = supabase.storage
      .from('posts-images')
      .getPublicUrl(fileName).data.publicUrl
    return publicUrl
  }
}
```

## Como Adicionar Autenticação?

### 1. Habilitar Autenticação no Supabase
- Vá para **Authentication** → **Providers**
- Ative "Email" (já vem habilitado)

### 2. Criar Componente de Login
```javascript
// Exemplo simples
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
}
```

3. Proteger Rotas
- Use `useEffect` para verificar se usuário está autenticado
- Redirecione para login se não estiver

## Performance - Como Otimizar?

### 1. Paginação
```javascript
// Adicione limite ao SELECT
.select('*', { count: 'exact' })
.range(0, 9) // Primeiros 10 posts
```

### 2. Lazy Loading
```javascript
import { lazy, Suspense } from 'react'

const PostDetail = lazy(() => import('./PostDetail'))

// Use assim:
<Suspense fallback={<Loading />}>
  <PostDetail />
</Suspense>
```

### 3. Caching
```javascript
// Adicione ao PostForm
const [cachedPosts, setCachedPosts] = useState({})

// Salve em localStorage
localStorage.setItem('posts', JSON.stringify(posts))
```

## Segurança - Como Proteger?

### 1. Row Level Security (RLS)
A aplicação já tem RLS básico configurado. Para produção:

```sql
-- Apenas admin pode editar/deletar
CREATE POLICY "Only admin can edit" ON posts
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin')

-- Apenas usuário pode comentar
CREATE POLICY "Users can comment" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id)
```

### 2. Variáveis de Ambiente
- Nunca exponha chaves no código
- Use `.env.local` (gitignore já está configurado)
- Para produção, use secrets do host (Vercel, Netlify, etc)

### 3. Validação
- A aplicação já valida campos
- Adicione validação no backend (Supabase)

## Deploy - Como Colocar em Produção?

### Vercel (Recomendado)
```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel

# 4. Configure variáveis de ambiente na dashboard
# Vá em Settings → Environment Variables
# Adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
```

### Netlify
```bash
# 1. Instale Netlify CLI
npm i -g netlify-cli

# 2. Faça login
netlify login

# 3. Deploy
netlify deploy --prod

# 4. Configure em Site Settings → Build & Deploy → Environment
```

### GitHub Pages
```bash
# 1. Modifique vite.config.js
export default {
  base: '/seu-repo/'
}

# 2. Build
npm run build

# 3. Configure GitHub Pages para usar `/dist`
```

## Como Testar a Aplicação?

### Teste Manual Completo
1. **Criar Post**
   - [ ] Acesse `/criar`
   - [ ] Preencha todos os campos
   - [ ] Veja se volta para home com novo post

2. **Buscar Post**
   - [ ] Digite no buscador
   - [ ] Verifique se filtra por título/autor

3. **Filtrar por Categoria**
   - [ ] Clique em uma categoria
   - [ ] Verifique se mostra apenas daquela categoria

4. **Editar Post**
   - [ ] Clique "Leia mais"
   - [ ] Clique "Editar"
   - [ ] Modifique campos
   - [ ] Clique "Salvar"

5. **Deletar Post**
   - [ ] Clique "Leia mais"
   - [ ] Clique "Excluir"
   - [ ] Confirme
   - [ ] Verifique se sumiu da listagem

6. **Comentar**
   - [ ] Abra um post
   - [ ] Preencha nome e comentário
   - [ ] Veja se aparece embaixo

7. **Deletar Comentário**
   - [ ] Clique "Excluir" no comentário
   - [ ] Confirme
   - [ ] Verifique se sumiu

## Links Úteis

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação React Router](https://reactrouter.com/en/main)

---

**Dúvidas não respondidas?** Verifique o console do navegador (F12) para mensagens de erro detalhadas!
