import classnames from 'merge-class-names';
import { useRouter } from 'next/router';
import Link from './Link';

const MenuItem = ({ href, children, level }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Link
      href={href}
      className={classnames(
        'menu-item px-8 py-2 cursor-pointer',
        'no-underline text-sm',
        level === 1 ? 'pl-8' : 'pl-12',
        pathname === href && 'menu-item-active font-semibold'
      )}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
