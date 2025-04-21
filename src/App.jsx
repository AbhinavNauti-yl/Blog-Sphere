
import ArticleDetailPage from './pages/ArticleDetail/ArticleDetailPage'
import HomePage from './pages/home/HomePage'

import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/register/RegisterPage'

import {Toaster} from 'react-hot-toast'
import LoginPage from './pages/login/LoginPage'
import ProfilePage from './pages/profile/profilePage'
import AdminLayout from './pages/admin/AdminLayout'
import Admin from './pages/admin/screens/Admin'
import Comment from './pages/admin/screens/Comment'
import ManagePost from './pages/admin/screens/post/ManagePost'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path='/register' element = {<RegisterPage />} />
        <Route path='/login' element = {<LoginPage />} />
        <Route path='/profile' element = {<ProfilePage />} />
        <Route path='/admin' element = {<AdminLayout />}>
          <Route index element= {<Admin />} />
          <Route path='comment' element= {<Comment />} />
          <Route path='post' element= {<ManagePost />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
