'use client';
import React from 'react';
import Link from 'next/link';
import Routes from '../routes';
import { useAuth } from '../lib/AuthContext';
import { usePathname } from 'next/navigation';

const Buttons: {
    title: string,
    link: string
}[] = [
    {
        title: 'Home',
        link: Routes.Home
    },
    {
        title: 'User',
        link: Routes.User
    },
    {
        title: 'Admin',
        link: Routes.Admin
    },
    {
        title: 'Login',
        link: '/login'
    },
];

const Header = () => {
    const { user, logout } = useAuth();
    const pathName = usePathname();

    return (
        <div
            className='
                w-full flex justify-center fixed top-0 left-0 bg-gray-100/80 backdrop-blur-sm z-10
            '>
            <div
                className='
                    w-full relative max-w-[78rem] h-[70px] flex items-center gap-x-2.5 px-2.5 py-1.5
                    md:gap-x-5 md:py-2 md:px-5
                    lg:gap-x-10 lg:px-10
                '>
                <div
                    className='
                        flex-1 flex gap-x-[20px] px-[10px]
                    '>
                    {
                        Buttons.map((each, index) =>
                            <Link
                                key={index}
                                href={each.link}
                                className={`
                                    underline-offset-4
                                    hover:underline
                                    ${pathName === each.link && 'underline'}
                                `}>
                                {each.title}
                            </Link>
                        )
                    }
                </div>
                {
                    user !== undefined &&
                    <button
                        className='text-red-600 px-2 py-1'
                        style={{
                            border: '1px solid'
                        }}
                        onClick={logout}>
                        Logout
                    </button>
                }
                <div
                    className='
                        flex justify-end
                    '>
                    {
                        user === undefined ?
                            <Link
                                href={Routes.Login}>
                                Login
                            </Link> :
                            <p>logined as: {user.firstName}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;