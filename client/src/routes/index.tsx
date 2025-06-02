import { Board } from '@/pages/BoardItem';
import { Boards } from '@/pages/Boards';
import { Tasks } from '@/pages/Tasks';
import { Main } from '@/components/layout/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '@/pages/notFoundPage';
export const AppRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/boards" replace />} />

    <Route path="/" element={<Main />}>
      <Route index element={<Navigate to="/boards" replace />} />

      <Route path="boards">
        <Route index element={<Boards />} />
        <Route path=":id" element={<Board />} />
      </Route>

      <Route path="issues" element={<Tasks />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
