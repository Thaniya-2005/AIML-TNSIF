import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BmiCalculatorModal from './components/BmiCalculatorModal';

import Home from './pages/Home';
import About from './pages/About';
import Predict from './pages/Predict';
import Result from './pages/Result';
import History from './pages/History';
import Contact from './pages/Contact';

function App() {
  const [isBmiOpen, setIsBmiOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar onOpenBmi={() => setIsBmiOpen(true)} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />

      <BmiCalculatorModal
        isOpen={isBmiOpen}
        onClose={() => setIsBmiOpen(false)}
      />
    </div>
  );
}

export default App;
