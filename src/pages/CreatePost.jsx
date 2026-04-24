import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import PostForm from '../components/PostForm'

export default function CreatePost() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([formData])
        .select()

      if (error) throw error

      alert('Post criado com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Erro ao criar post:', error)
      setError('Erro ao criar o post. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Criar Novo Post</h1>
        <p className="text-gray-600 mt-2">Compartilhe uma nova notícia sobre esportes</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <PostForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
