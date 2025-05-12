import ArticleDetailPage from "./pages/ArticleDetail/ArticleDetailPage";
import HomePage from "./pages/home/HomePage";

import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";

import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/profilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import ManagePost from "./pages/admin/screens/post/ManagePost";
import EditPost from "./pages/admin/screens/post/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import BlogPage from "./pages/Blog/BlogPage";
import AdminProtected from "./pages/admin/components/AdminProtected";
import PricingSection from './pages/Pricing/PricingSection'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/pricing" element={<PricingSection />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          
          {/* <Route path="users" element={<Users />} /> */}
          {/* protected with admin route only admin can access these routes */}
          <Route path="users" element={<AdminProtected><Users/></AdminProtected>} />

          <Route path="categories" element={<AdminProtected><Categories /></AdminProtected>} />
          <Route path="categories/editCategory/:id" element={<AdminProtected><EditCategories /></AdminProtected>} />

          <Route path="post" element={<AdminProtected><ManagePost /></AdminProtected>} />
          <Route path="post/editPost/:slug" element={<EditPost />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
