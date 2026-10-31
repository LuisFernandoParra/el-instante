import { Outlet, useMatch } from 'react-router-dom';
import { CoreWorkFooter } from '@/components/organisms/CoreWorkFooter';
import { Footer } from '@/components/organisms/Footer';
import { Masthead } from '@/components/organisms/Masthead';
import { Navbar } from '@/components/organisms/Navbar';
import { site, ui } from '@/data';
import { useRouteFocus } from '@/hooks/useRouteFocus';

export function SiteLayout() {
  const isHome = useMatch('/') !== null;
  const mainRef = useRouteFocus<HTMLElement>();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only z-30 bg-papel p-2 focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
      >
        {ui.a11y.skipToContent}
      </a>
      <Masthead name={site.name} isHome={isHome} />
      <Navbar />
      <main id="contenido" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <CoreWorkFooter />
    </div>
  );
}
