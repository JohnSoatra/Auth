import React from 'react';
import Header from './Header';

type Props = {
    children: React.ReactNode,
    fromTop?: boolean
}

const Layout = ({ children }: Props) => {
    return (
        <div
            className='w-full min-h-[100vh] flex flex-col'>
            <Header />
            <div className='h-[70px]'></div>
            { children }
            <div className='flex-1'></div>
        </div>
    );
}
 
export default Layout;
