import { useMemo }  from 'react';
import { usePathname } from 'next/navigation';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      href: '/conversations',
      label: 'Conversations',
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      href: '/users', 
      label: 'Users',
      icon: HiUsers,
      active: pathname === '/users'
    }, 
    {
      href: '#',
      label: 'Logout',
      icon: HiArrowLeftOnRectangle,
      onClick: () => signOut(),
    },
  ], [pathname, conversationId]);
    return routes;
}

export default useRoutes;