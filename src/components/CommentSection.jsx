import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ author: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.author.trim()) newErrors.author = 'Nome é obrigatório'
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author: formData.author,
            message: formData.message
          }
        ])

      if (error) throw error

      setFormData({ author: '', message: '' })
      fetchComments()
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

      if (error) throw error
      fetchComments()
    } catch (error) {
      console.error('Erro ao excluir comentário:', error)
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

  return (
    <div className="mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Comentários</h2>
        <p className="text-gray-600 mb-6">
          {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
        </p>

        {/* Formulário de novo comentário */}
        <form onSubmit={handleSubmit} className="mb-8 pb-8 border-b">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Seu Nome *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite seu nome"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Seu Comentário *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Deixe seu comentário aqui..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Enviando...' : 'Enviar Comentário'}
          </button>
        </form>

        {/* Lista de comentários */}
        {loading ? (
          <p className="text-gray-500 text-center py-4">Carregando comentários...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{comment.author}</p>
                    <p className="text-gray-500 text-sm">{formatDate(comment.created_at)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Excluir
                  </button>
                </div>
                <p className="text-gray-700 mt-2">{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
