'use client';

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileFooterItem from "./MobileFooterItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const isOpen = useConversation();

  if (isOpen) {
    return null;
  }

  return( 
    <div
      className="
      fixed
      justify-between
      bottom-0
      w-full
      flex
      z-40
      items-center
      bg-white
      border-t-[1px]
      lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileFooterItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          onClick={route.onClick}
          active={route.active}
        />
      ))}   
    </div>
  )
}

export default MobileFooter;