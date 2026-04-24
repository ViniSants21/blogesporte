# 🎯 GUIA DE INÍCIO - PRÓXIMOS PASSOS

Bem-vindo ao **Blog de Esportes**! Aqui está o que você precisa fazer agora.

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Criar Conta no Supabase
- Acesse: https://supabase.com
- Clique em "Sign Up"
- Use email ou GitHub

### 2️⃣ Criar Novo Projeto
- Clique em "New Project"
- Nome: `blog-esportes`
- Escolha região mais próxima
- Configure senha forte
- Aguarde criação (2-3 minutos)

### 3️⃣ Obter Credenciais
1. Vá em **Settings** (engrenagem)
2. Clique em **API**
3. Copie a **URL**
4. Copie a **Anon Key**
5. Guarde em um lugar seguro

### 4️⃣ Criar Banco de Dados
1. No Supabase, abra **SQL Editor**
2. Clique em **New Query**
3. Abra o arquivo `database.sql` deste projeto
4. Cole tudo no editor
5. Clique **Run**
6. Aguarde a conclusão ✅

### 5️⃣ Configurar Projeto Local
1. Abra o arquivo `.env.local`
2. Substitua `sua_url_aqui` pela URL do Supabase
3. Substitua `sua_anon_key_aqui` pela Anon Key
4. Salve o arquivo

### 6️⃣ Executar Aplicação
```bash
npm run dev
```

Abra: http://localhost:5173

## ✨ Teste a Aplicação

Agora que está rodando, teste cada funcionalidade:

### Criar Post
1. Clique em **"+ Novo Post"**
2. Preencha:
   - Título: "Meu primeiro post"
   - Conteúdo: "Este é o conteúdo do post"
   - Categoria: Selecione uma
   - Autor: Seu nome
   - Imagem: (deixe em branco ou cole uma URL)
3. Clique **"Salvar Post"**
4. Você deve voltar para home com o novo post

### Listar e Buscar
1. Na Home, você vê todos os posts
2. Digite no buscador: nome do post ou autor
3. Veja os posts filtrados

### Filtrar por Categoria
1. Clique em um botão de categoria
2. Veja apenas posts daquela categoria
3. O número ao lado mostra quantos posts tem

### Visualizar Detalhes
1. Clique em **"Leia mais →"** em qualquer post
2. Veja o conteúdo completo e a imagem
3. Veja a seção de comentários

### Comentar
1. Na página de detalhes, role para baixo
2. Veja "COMENTÁRIOS (0)" ou mais
3. Preencha seu nome e comentário
4. Clique **"Enviar Comentário"**
5. Seu comentário aparece na lista

### Editar Post
1. Na página de detalhes, clique **"✏️ Editar"**
2. Modifique os campos desejados
3. Clique **"Salvar Post"**
4. Volta para detalhes com dados atualizados

### Deletar Post
1. Na página de detalhes, clique **"🗑️ Excluir"**
2. Confirme a exclusão
3. Volta para home (post removido)

## 📚 Documentação

Aqui estão os arquivos de documentação:

| Arquivo | Para quem? | Leia quando... |
|---------|-----------|---|
| **README.md** | Devs em geral | Quer entender o projeto |
| **SETUP.md** | Iniciantes | Precisa configurar tudo |
| **database.sql** | Admins BD | Quer criar tabelas |
| **FAQ.md** | Todos | Tem dúvidas |
| **ARQUITETURA.md** | Devs | Quer entender o fluxo |
| **CHECKLIST.md** | QA/Tester | Quer testar |

## 🐛 Se Algo Não Funcionar

### Posts não aparecem
```
1. Abra https://supabase.com → seu projeto
2. Vá em "Editor" → "posts"
3. Veja se tem dados lá
4. Se não, volte ao passo "Criar Banco de Dados"
```

### Erro "URL vazia" no console
```
1. Verifique se .env.local existe
2. Verifique se VITE_SUPABASE_URL está preenchido
3. Reinicie o servidor (npm run dev)
```

### Imagens não carregam
```
1. Verifique se a URL é válida (abra no navegador)
2. Tente usar uma URL de um CDN público
3. Exemplo: https://unsplash.com/photos/...
```

## 🎨 Personalizar

### Mudar Cores
Edite `src/styles/globals.css` e veja o Tailwind CSS docs

### Mudar Categorias
Edite o array em:
- `src/components/PostForm.jsx` (linha ~6)
- `src/pages/Home.jsx` (linha ~6)

### Adicionar mais campos
1. Modifique a tabela no Supabase
2. Atualize `PostForm.jsx`
3. Atualize componentes que exibem dados

## 🚀 Deploy (Colocar Online)

### Vercel (Mais Fácil)
```bash
npm i -g vercel
vercel login
vercel
```

Depois configure as variáveis de ambiente na dashboard.

### Netlify
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Configure em Settings → Pages
```

## 📱 Versão Mobile

A aplicação funciona perfeitamente em:
- ✅ Smartphone (teste em F12 → Responsive)
- ✅ Tablet (paisagem e retrato)
- ✅ Desktop (qualquer tamanho)

## ❓ Dúvidas?

1. Leia **FAQ.md** para problemas comuns
2. Verifique o console (F12 → Console) para erros
3. Veja os comentários no código

## 📊 Estrutura Resumida

```
Você escreve em:             Supabase armazena em:
  Home → busca                  posts (tabela)
  CreatePost → novo             posts (insert)
  PostDetail → comentário       comments (insert)
  EditPost → edita              posts (update)
  Delete → remove               posts (delete)
```

## ✅ Checklist do Usuário

```
☑ Criei conta no Supabase
☑ Criei projeto no Supabase
☑ Copiei URL e Anon Key
☑ Preenchi .env.local
☑ Executei database.sql
☑ Rodei npm run dev
☑ Testei criar post
☑ Testei adicionar comentário
☑ Tudo funcionou! 🎉
```

## 🎓 Para Aprender Mais

Depois que estiver funcionando, você pode:
- [ ] Ler código dos componentes
- [ ] Adicionar autenticação
- [ ] Implementar upload de imagens
- [ ] Adicionar paginação
- [ ] Fazer deploy online

## 💡 Dicas Úteis

1. **Sempre reinicie o servidor** após editar `.env.local`
2. **Use URLs HTTPS** para imagens
3. **Teste em mobile** com F12 (tela pequena)
4. **Salve antes** de editar dados importantes
5. **Backup do .env.local** em lugar seguro

---

**Pronto para começar? Execute `npm run dev` e aproveite! 🚀**

Qualquer dúvida, veja FAQ.md ou console do navegador (F12).
