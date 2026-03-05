// src/components/Login.tsx

import { useState } from 'react';
import type { FormEvent } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Successful!')
        }   catch (err: unknown) {
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError('An unexpected error occured.');
            }
        }   
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logged out')
        }   catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Logout error:', err.message);
            } else {
                console.error('Unexpected logout error');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />    

                <button type='submit'>Login</button>  
                {error && <p>{error}</p>}        
            </form>

            <button onClick={handleLogout}>Logout</button>
        
        </>
    );

};

export default Login;
