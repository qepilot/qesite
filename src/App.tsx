import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import StartProject from './pages/StartProject'
import Integrations from './pages/Integrations'
import UseCases from './pages/UseCases'
import VsChatGPT from './pages/VsChatGPT'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/vs-chatgpt" element={<VsChatGPT />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
