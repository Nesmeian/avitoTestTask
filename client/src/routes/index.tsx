import { Board } from '@/pages/Board';
import { Boards } from '@/pages/Boards';
import { Issues } from '@/pages/Issues';
import { MainPage } from '@/routes/mainPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<MainPage />}>
        <Route index element={<Boards />} />
        <Route path=":id" element={<Board />} />
      </Route>
      <Route index path="/issues" element={<Issues />} />
    </Routes>
  </BrowserRouter>
);
