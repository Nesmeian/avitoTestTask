import { Board } from '@/pages/Board';
import { Boards } from '@/pages/Boards';
import { Issues } from '@/pages/Issues';
import { Main } from '@/components/layout/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
export const AppRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/boards" replace />} />

    <Route path="/" element={<Main />}>
      <Route index element={<Navigate to="/boards" replace />} />

      <Route path="boards">
        <Route index element={<Boards />} />
        <Route path=":id" element={<Board />} />
      </Route>
      <Route path="issues" element={<Issues />} />
    </Route>
  </Routes>
);
