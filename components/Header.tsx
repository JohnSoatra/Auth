'use client';
import Routers from '@/constant/routes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
    const { user } = useAuth();
    const router = useRouter();

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
                        flex-1 flex justify-end
                    '>
                    {
                        user === undefined ?
                            <button
                                onClick={() => router.push(Routers.Login)}>
                                Login
                            </button> :
                            <p>logined as: {user.firstName}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;