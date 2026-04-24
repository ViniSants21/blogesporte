import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/editar/:id" element={<EditPost />} />
      </Routes>
    </Router>
  )
}

export default App
