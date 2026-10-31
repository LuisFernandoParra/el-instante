import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/templates/SiteLayout';
import { ArticlePage } from '@/pages/ArticlePage';
import { HomePage } from '@/pages/HomePage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="nota/:slug" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
