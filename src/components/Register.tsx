// src/components/Register.tsx

import { useState } from 'react';
import type { FormEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';


const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // firestore 'user' document
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp()    // uses firestore timestamp, not user's
            });

            alert('Registration successful!');

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occured.');
            }
        }
    }

    return (
        <form onSubmit={handleRegister}>
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

            <button type='submit'>Register</button>
            {error && <p>{error}</p>}
        </form>
    );

};

export default Register;