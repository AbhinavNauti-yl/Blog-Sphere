
import ArticleDetailPage from './pages/ArticleDetail/ArticleDetailPage'
import HomePage from './pages/home/HomePage'

import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </>
  )
}

export default App
