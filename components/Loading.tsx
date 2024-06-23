import React from 'react';
import Layout from './Layout';

const Loading = () => {
    return (
        <Layout>
            <div
                className="
                    w-full flex-1 flex items-center justify-center
                ">
                <p
                    className="
                        text-[17px] animate-pulse
                    ">
                    Loading...
                </p>
            </div>
        </Layout>
    )
}

export default Loading;