import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import AppLayout from './layout/AppLayout';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;