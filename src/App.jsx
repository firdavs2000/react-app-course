import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './Components/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AddQuestionPageLazy } from './pages/AddQuestionPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wraps all child pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>Forbidden</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy/>} />
          <Route path="/question/:id" element={<QuestionPage/>} />

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;



