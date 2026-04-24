import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import PostForm from '../components/PostForm'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('posts')
        .update(formData)
        .eq('id', id)

      if (error) throw error

      alert('Post atualizado com sucesso!')
      navigate(`/post/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar post:', error)
      setError('Erro ao atualizar o post. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
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
        <p className="text-center text-red-600">{error || 'Post não encontrado'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Editar Post</h1>
        <p className="text-gray-600 mt-2">Atualize o conteúdo do post</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  )
}
