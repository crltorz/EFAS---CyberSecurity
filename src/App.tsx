import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { ScamAlerts } from './pages/ScamAlerts';
import { FactCheck } from './pages/FactCheck';
import { Athena } from './pages/Athena';
import { Emergency } from './pages/Emergency';
import { Quiz } from './pages/Quiz';
import { About } from './pages/About';
import { Evaluation } from './pages/Evaluation';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="scam-alerts" element={<ScamAlerts />} />
          <Route path="fact-check" element={<FactCheck />} />
          <Route path="athena" element={<Athena />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}