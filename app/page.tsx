'use client';
import React, { useEffect } from "react";
import Layout from "../components/Layout";

const Home = () => {
    return (
        <Layout>
            <p>This is homepage</p>
            <a
                href="https://www.troubadourgoods.com/products/apex-backpack"
                target="_blank">
                link
            </a>
            {/* <Button /> */}
        </Layout>
    );
}

export default Home;