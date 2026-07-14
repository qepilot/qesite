import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import StartProject from './pages/StartProject'
import Integrations from './pages/Integrations'
import UseCases from './pages/UseCases'
import VsChatGPT from './pages/VsChatGPT'
import About from './pages/About'
import ForQAEngineers from './pages/ForQAEngineers'
import ForEngineeringManagers from './pages/ForEngineeringManagers'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/vs-chatgpt" element={<VsChatGPT />} />
          <Route path="/about" element={<About />} />
          <Route path="/for-qa-engineers" element={<ForQAEngineers />} />
          <Route path="/for-engineering-managers" element={<ForEngineeringManagers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
