'use client';
import React, { useEffect } from "react";
import api from "@/util/api";
import { Cookies, useCookies } from "next-client-cookies";
import useFetch from "@/hook/useFetch";
import { ResponseProduct } from "@/typings";

const Buttons: {
    text: string,
    onClick: (evt: React.MouseEvent, cookie: Cookies) => void,
}[] = [
    {
        text: 'Login',
        onClick: () => {
            const work = async () => {
                const response = await fetch(api('login'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: 'soatra@mail.com',
                        password: 'abc'
                    })
                });

                const data = await response.json();

                console.log(data);
            }
    
            work();
        }
    },
    {
        text: 'Get Product',
        onClick: (_, cookie) => {
            const work = async () => {
                const accessToken = cookie.get('accessToken');

                if (accessToken !== undefined) {
                    const response = await fetch(api('product'), );
                    const data = await response.json();
    
                    console.log(data);
                }
            }

            work();
        }
    }
]

const Home = () => {
    const cookie = useCookies();
    const data = useFetch<ResponseProduct>({
        endpoint: api('product'),
        refreshEndpoint: api('refresh'),
        init: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: '1',
                email: 'soatra@mail.com',
                accessToken: cookie.get('accessToken')
            })
        }
    });

    return (
        <div className="p-10 flex flex-col items-center gap-y-[20px]">
            {
                Buttons.map((btn, index) =>
                    <button
                        key={index}
                        className="border p-2"
                        onClick={(evt) => btn.onClick(evt, cookie)}>
                        {btn.text}
                    </button>
                )
            }
            <div className="pt-10">
                data = {data ? JSON.stringify(data) : 'fetching...'}
            </div>
        </div>
    );
}

export default Home;