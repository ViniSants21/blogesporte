import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">⚽</div>
            <h1 className="text-xl font-bold text-gray-800">BlogEsporte</h1>
          </Link>
          
          <div className="flex gap-4 items-center">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Home
            </Link>
            <Link 
              to="/criar" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              + Novo Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
