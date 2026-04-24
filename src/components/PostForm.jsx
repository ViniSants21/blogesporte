import { useState } from 'react'

const CATEGORIES = ['Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Atletismo', 'Esportes Radicais', 'Outros']

export default function PostForm({ initialData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    content: '',
    category: 'Futebol',
    author: '',
    image_url: ''
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório'
    if (!formData.content.trim()) newErrors.content = 'Conteúdo é obrigatório'
    if (!formData.category) newErrors.category = 'Categoria é obrigatória'
    if (!formData.author.trim()) newErrors.author = 'Autor é obrigatório'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Digite o título da notícia"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Conteúdo *</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Escreva o conteúdo completo da matéria"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Categoria *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Autor *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nome do autor"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">URL da Imagem</label>
        <input
          type="url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {formData.image_url && (
          <img 
            src={formData.image_url} 
            alt="Preview" 
            className="mt-3 max-w-xs rounded-lg"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : 'Salvar Post'}
        </button>
      </div>
    </form>
  )
}
