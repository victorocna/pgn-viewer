import Menu from './Menu';
import MenuButton from './MenuButton';
import NoSsr from './NoSsr';
import { useTheme } from '../hooks';

const Layout = ({ title, button, children }) => {
  const { theme } = useTheme();
  
  return (
    <NoSsr>
      <div className={`layout-wrapper font-body text-sm min-h-screen flex ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <Menu />
        <main className="main-content max w-full lg:col-span-5 p-4 lg:p-6 xl:px-12 gap-4">
          <div className="header-section flex items-center mb-4">
            <div className="flex flex-1 gap-2">
              <h3 className="page-title text-2xl font-semibold">{title}</h3>
              {button}
            </div>
            <MenuButton />
          </div>
          <div className="content-section grid gap-4">
            <div className="content-card rounded-lg border p-6 shadow-xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </NoSsr>
  );
};

export default Layout;
