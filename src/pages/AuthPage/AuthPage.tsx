import React from "react";
import {useState, FormEvent} from 'react';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError} from 'firebase/auth';
import styles from './AuthPage.module.css';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                // Вход
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Успешный вход!');
            } else {
                // Регистрация
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('Успешная регистрация!');
            }
        } catch (err) {
            const authError = err as AuthError;
            // Локализация ошибок
            const errorMessages: { [key: string]: string } = {
                'auth/invalid-credential': 'Неверный email или пароль.',
                'auth/email-already-in-use': 'Этот email уже зарегистрирован.',
                'auth/weak-password': 'Пароль слишком слабый (минимум 6 символов).',
                'auth/invalid-email': 'Некорректный email.',
            };
            setError(errorMessages[authError.code] || authError.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={styles.input}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        className={styles.input}
                        disabled={loading}
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className={styles.toggleButton}
                    disabled={loading}
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;