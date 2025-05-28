import { useLocation } from 'react-router-dom';

export default function GetCurrentPath() {
  const location = useLocation();

  return location.pathname.split('/').filter(Boolean);
}
