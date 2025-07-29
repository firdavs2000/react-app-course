import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './Components/MainLayout/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wraps all child pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/forbidden" element={<div>Forbidden</div>} />
          <Route path="/addquestion" element={<div>Add Question</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;



