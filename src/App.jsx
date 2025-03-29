
import ArticleDetailPage from './pages/ArticleDetail/ArticleDetailPage'
import HomePage from './pages/home/HomePage'

import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/register/RegisterPage'

import {Toaster} from 'react-hot-toast'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path='/register' element = {<RegisterPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
