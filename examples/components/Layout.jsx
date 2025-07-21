import { Menu, MenuButton } from '.';

const Layout = ({ title, children }) => {
  return (
    <div className="font-body text-sm min-h-screen bg-gray-100 flex">
      <Menu />
      <main className="flex-1 w-full p-4 lg:p-8 xl:px-12">
        <div className="flex items-center mb-12">
          <div className="flex flex-1">
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <MenuButton />
        </div>
        <div className="max-w-full">
          <div className="bg-white rounded-lg border border-gray-300 p-8 shadow-xl min-h-[600px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
