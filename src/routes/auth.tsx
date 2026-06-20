import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { account, ID, type Models } from '../utils/appwrite';

export const Route = createFileRoute('/auth')({
    component: AuthComponent
});

function AuthComponent() {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function login(e: string, p: string) {
        try {
            await account.createEmailPasswordSession(e, p);
            setUser(await account.get());
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + (error as Error).message);
        }
    }

    async function register() {
        try {
            await account.create(ID.unique(), email, password, name);
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed: ' + (error as Error).message);
        }
    }

    async function logout() {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed: ' + (error as Error).message);
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>Appwrite Authentication</h2>
            <p>{user ? `Logged in as ${user.name}` : 'Not logged in'}</p>
            
            {!user && (
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '8px' }}
                    />
                    <input
                        type="text"
                        placeholder="Name (for registration)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: '8px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="button" onClick={() => login(email, password)} style={{ flex: 1, padding: '8px' }}>
                            Login
                        </button>
                        <button type="button" onClick={register} style={{ flex: 1, padding: '8px' }}>
                            Register
                        </button>
                    </div>
                </form>
            )}
            
            {user && (
                <button type="button" onClick={logout} style={{ padding: '8px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Logout
                </button>
            )}
        </div>
    );
}
