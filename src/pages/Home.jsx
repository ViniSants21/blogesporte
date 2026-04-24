import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import PostCard from '../components/PostCard'

const CATEGORIES = ['Todos', 'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Atletismo', 'Esportes Radicais', 'Outros']

export default function Home() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [categoryCounts, setCategoryCounts] = useState({})

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, selectedCategory])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
      
      // Contar posts por categoria
      const counts = {}
      data?.forEach(post => {
        counts[post.category] = (counts[post.category] || 0) + 1
      })
      setCategoryCounts(counts)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(search) ||
        post.author.toLowerCase().includes(search)
      )
    }

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }

  const handleDeletePost = async (postId) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return

    try {
      const { error: commentError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', postId)

      if (commentError) throw commentError

      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (postError) throw postError

      fetchPosts()
    } catch (error) {
      console.error('Erro ao excluir post:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Buscador */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filtro de categorias */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por Categoria</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
              {category !== 'Todos' && categoryCounts[category] && (
                <span className="ml-2 text-sm">({categoryCounts[category]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Carregando posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum post encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
