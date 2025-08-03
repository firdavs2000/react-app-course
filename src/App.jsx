import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './Components/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wraps all child pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>Forbidden</div>} />
          <Route path="/addquestion" element={<div>Add Question</div>} />
          <Route path="/question/:id" element={<div>Question Page</div>} />

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;



