'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface MobileFooterItemProps {
  href:string,
  icon: any,
  onClick?:() => void,
  active?: boolean,
}
const MobileFooterItem: React.FC<MobileFooterItemProps> = ({
  href,
  icon: Icon,
  onClick,
  active,
}) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link 
      href={href}
      onClick={handleClick}
      className={clsx(`
        flex
        group
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
      active && 'bg-gray-100 text-black'
      )}
      >
      <Icon className='h-6 w-6'/>
    </Link>
  )
}

export default MobileFooterItem;