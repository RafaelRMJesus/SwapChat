'use client';

import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void;
}

const AuthSocialButton = (props: AuthSocialButtonProps) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="
            inline-flex
            w-full
            justify-center
            roundend-md
            bg-white
            px-4
            py-2
            text-gray-500
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            hover:bg-gray-50
            focus-outline-offset-0">
                <props.icon />
            </button>



    )
}

export default AuthSocialButton;