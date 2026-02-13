import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResultsPage } from './pages/ResultsPage';
import { AthletesPage } from './pages/AthletesPage';
import { BottomNav } from './components/layout/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
