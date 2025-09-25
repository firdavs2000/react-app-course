import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './Components/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AddQuestionPageLazy } from './pages/AddQuestionPage';
import { EditQuestionPageLazy } from './pages/EditQuestionPage';
import { AuthProvider } from './auth/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { ForbiddenPage } from './pages/ForbiddenPage';
import { ThemeProvider } from './theme/ThemeProvider';

// 🔒 ProtectedRoutes
const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/forbidden"
      state={{ from: location.pathname }}
      replace
    />
  );
};

// 🌍 App Component
const App = () => {
  return (
    <ThemeProvider>       {/* ✅ ThemeProvider butun ilovaga qo‘shilgan */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/question/:id" element={<QuestionPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;




