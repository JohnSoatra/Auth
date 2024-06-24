'use client';
import { useAuth } from "@/auth/context/AuthContext";
import Layout from "@/components/Layout";
import { usePathname } from "next/navigation";
import React, { useEffect, useLayoutEffect, useMemo } from "react";

const Home = () => {
    const { profile } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const work = async () => {
            const a = await profile();

            console.log(a);
        }
        work();
    }, [pathname]);
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