import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import LearnPage from './pages/LearnPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App