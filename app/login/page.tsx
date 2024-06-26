'use client';
import React, { useCallback, useState } from 'react';
import { useAuth } from '@/dist';

type InputProps = {
    name: string,
    value: string,
    type: React.HTMLInputTypeAttribute,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
    name,
    value,
    type,
    onChange
}: InputProps) => {
    return (
        <div
            className='
                flex flex-col
            '>
            <label
                htmlFor={name}>
                {name}
            </label>
            <input
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                className='border outline-none px-1'
            />
        </div>
    )
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const onSubmit = useCallback(async (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        const result = await login({
            email,
            password
        });

        if (result.error === false) {
            
        } else {
            alert('error');
            if (result.response) {
                
            }
        }
    }, [email, password]);

    return (
        <div
            className='
                w-full flex flex-col items-center pt-[50px]
            '>
            <form
                className='
                    w-full max-w-[300px] flex flex-col items-center gap-y-[30px] px-8 py-9 border
                '>
                <p>
                    Login Form
                </p>
                <div
                    className='
                        w-full flex flex-col items-center gap-y-[25px]
                    '>
                    <div
                        className='
                            w-full flex flex-col items-stretch gap-y-[20px]
                        '>
                        <Input
                            name='email'
                            type='email'
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                        <Input
                            name='password'
                            type='password'
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='px-2 py-1'
                        style={{
                            border: '1px #d9dde2 solid'
                        }}
                        onClick={onSubmit}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;