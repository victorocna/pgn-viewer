import Menu from './Menu';
import NoSsr from './NoSsr';

const Layout = ({ children }) => {
  return (
    <NoSsr>
      <div className="flex min-h-screen bg-tertiary font-body text-sm">
        <Menu />
        {children}
      </div>
    </NoSsr>
  );
};

export default Layout;
