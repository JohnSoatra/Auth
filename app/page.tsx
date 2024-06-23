'use client';
import Layout from "@/components/Layout";
import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        window.addEventListener('hashchange', () => {
            console.log('hash change');
        }, true)
    }, []);
    return (
        <Layout>
            <p>This is homepage</p>
            <a
                href="https://www.troubadourgoods.com/products/apex-backpack"
                target="_blank">
                link
            </a>
        </Layout>
    );
}

export default Home;