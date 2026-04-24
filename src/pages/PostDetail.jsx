import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import CommentSection from '../components/CommentSection'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setPost(data)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      setError('Post não encontrado')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este post? Todos os comentários também serão deletados.')) return

    try {
      // Deletar comentários primeiro
      const { error: commentError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', id)

      if (commentError) throw commentError

      // Deletar o post
      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (postError) throw postError

      alert('Post excluído com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Erro ao excluir post:', error)
      alert('Erro ao excluir o post')
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Carregando...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Post não encontrado'}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Botão voltar */}
      <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-flex items-center gap-2">
        ← Voltar
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{formatDate(post.created_at)}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-600">Por: <span className="font-semibold">{post.author}</span></p>
      </div>

      {/* Imagem */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      {/* Conteúdo */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex gap-3">
        <Link
          to={`/editar/${post.id}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
           Editar
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
           Excluir
        </button>
      </div>

      {/* Comentários */}
      <CommentSection postId={id} />
    </div>
  )
}
