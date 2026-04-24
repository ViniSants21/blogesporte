import { Link } from 'react-router-dom'

export default function PostCard({ post, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {post.image_url && (
        <img 
          src={post.image_url} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{formatDate(post.created_at)}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {post.content}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Por: {post.author}</p>
          <Link 
            to={`/post/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Leia mais →
          </Link>
        </div>
      </div>
    </div>
  )
}
