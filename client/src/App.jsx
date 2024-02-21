import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import PrivacyPolicy from './pages/PrivicyPolicy';
import TermsCondition from './pages/TermsCondition';
import GuestPost from './pages/GuestPost';
import ContactUs from './pages/ContactUs';
import ResetEmailInp from './pages/ResetEmailnp';
import Reset from './pages/Reset';
import CreateVentureX from './pages/CreateVentureX';
import UpdateVentureX from './pages/UpdateVentureX';
import InstitutePage from './pages/InstitutePage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/privicy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-condition' element={<TermsCondition />} />
        <Route path='/blogs' element={<Projects />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/guest-post' element={<GuestPost />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/list-business' element={<CreateVentureX />} />
        <Route path='/update-institute/:postId' element={<UpdateVentureX />} />
        <Route path='/reset-email' element={<ResetEmailInp />} />
        <Route path='/set-new-pass' element={<Reset />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/institute/:instituteSlug' element={<InstitutePage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
