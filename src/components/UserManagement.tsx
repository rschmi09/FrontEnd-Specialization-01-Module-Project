// src/components/UserManagement.tsx

// CRUD operations w/ Firestrore: Display, Update, and Delete
// Create is included in Register.tsx

import { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface User{
    id?: string;    // id is optional, as it will only be available after data is fetched
    name: string;
    age: number;
    address: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newName, setNewName] = useState<string>('');
    const [newAge, setNewAge] = useState<string>('');
    const [newAddress, setNewAddress] = useState<string>('');

    // updateUser Function
    const updateUser = async (
        userId: string | undefined,
        updatedData: Partial<User>
    )  => {
        if (!userId) return;

        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, updatedData);

        //fetchData(); - removed to utilize firestore realtime listener
    };

    // deleteUser Function
    const deleteUser = async (
        userId: string | undefined,
    ) => {
        if (!userId) return;

        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);

        //fetchData(); - removed to utilize firestore realtime listener
    };

    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        
            const dataArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                })) as User[];
        
            setUsers(dataArray);
        });

    // cleanup listener when component unmounts
        return () => unsubscribe();

    // allow all functions to reuse 'fetchData()' - removed to utilize firestore realtime listener
    //useEffect(() => {
        //fetchData();
        
   }, []);

    return (
        <div>

            <h2>Users</h2>
            {users.map((user) => (
                <div
                    style={{
                        border: '2px solid black',
                        margin: '10px'
                    }}
                >
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Address: {user.address}</p>
                    </div>

                    {/* Update User Data */}
                    <input
                        onChange={(e) => setNewName(e.target.value)}
                        type='text'
                        placeholder='Enter new name:'
                    />
                    <button onClick={() => updateUser(user.id, { name: newName})}>
                        Update Name
                    </button>
                
                    <input
                        onChange={(e) => setNewAge(e.target.value)}
                        type='number'
                        placeholder='Enter new age:'
                    />
                    <button onClick={() => updateUser(user.id, { age: Number(newAge)})}>
                        Update Age
                    </button>

                    <input
                        onChange={(e) => setNewAddress(e.target.value)}
                        type='text'
                        placeholder='Enter new address:'
                    />
                    <button onClick={() => updateUser(user.id, { address: newAddress})}>
                        Update Address
                    </button>

                    {/* Delete User Data */}
                    <button
                        style={{ backgroundColor: 'crimson'}}
                        onClick={() => deleteUser(user.id)}>
                            Delete User
                    </button>
                      
                </div>

            ))}

        </div>

    );

};

export default UserManagement;