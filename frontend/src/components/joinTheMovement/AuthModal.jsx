import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthModal.module.css';
import { toast } from 'react-hot-toast';
import Logo from '../../assets/navbar/wordmark.svg';
import { logEvent } from '../../utils/analytics';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const ICONS = {
    beginners: (
        <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9904 0L17.9523 12.1353L25.9808 22.5L12.9904 20.7295L5.72205e-06 22.5L8.0285 12.1353L12.9904 0Z" fill="currentColor"/>
        </svg>
    ),
    hobbyists: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0L19.0514 10.9486L30 15L19.0514 19.0514L15 30L10.9486 19.0514L0 15L10.9486 10.9486L15 0Z" fill="currentColor"/>
        </svg>
    ),
    athletes: (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2659 0L17.6336 10.3647H28.5317L19.7149 16.7705L23.0826 27.1353L14.2659 20.7295L5.44909 27.1353L8.8168 16.7705L2.09808e-05 10.3647H10.8982L14.2659 0Z" fill="currentColor"/>
        </svg>
    ),
    everyone: (
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9904 0L15.8551 10.0381L25.9807 7.5L18.7198 15L25.9807 22.5L15.8551 19.9619L12.9904 30L10.1256 19.9619L-2.47955e-05 22.5L7.26087 15L-2.47955e-05 7.5L10.1256 10.0381L12.9904 0Z" fill="currentColor"/>
        </svg>
    ),
    morning: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.125 4.875C7.49365 4.49573 8.47485 3 9 3M9 3C9.52515 3 10.5064 4.49573 10.875 4.875M9 3V7.5" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.7726 7.97681L12.7119 9.03753" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M2.25 12.75H3.75" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M4.22754 7.97668L5.2882 9.03733" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M15.75 12.75H14.25" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M15.75 15H2.25" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M12 12.75C12 11.0932 10.6568 9.75 9 9.75C7.34314 9.75 6 11.0932 6 12.75" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
        </svg>
    ),
    noon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 9C12.75 11.071 11.071 12.75 9 12.75C6.92893 12.75 5.25 11.071 5.25 9C5.25 6.92893 6.92893 5.25 9 5.25C11.071 5.25 12.75 6.92893 12.75 9Z" stroke="currentColor" strokeWidth="1.125"/>
            <path d="M9 1.5V2.625M9 15.375V16.5M14.3031 14.3035L13.5076 13.5079M4.49195 4.49195L3.69645 3.69645M16.5 9H15.375M2.625 9H1.5M14.3035 3.69653L13.5079 4.49203M4.49231 13.508L3.69682 14.3035" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
        </svg>
    ),
    evening: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.125 5.625C7.49365 6.00427 8.47485 7.5 9 7.5M9 7.5C9.52515 7.5 10.5064 6.00427 10.875 5.625M9 7.5V3" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.7726 7.97681L12.7119 9.03753" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M2.25 12.75H3.75" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M4.22754 7.97668L5.2882 9.03733" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M15.75 12.75H14.25" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M15.75 15H2.25" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
            <path d="M12 12.75C12 11.0932 10.6568 9.75 9 9.75C7.34314 9.75 6 11.0932 6 12.75" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
        </svg>
    )
};

const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal } = useModal();
    const { login, register } = useAuth();
    
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset state when modal closes
    useEffect(() => {
        if (!isAuthModalOpen) {
            document.body.style.overflow = 'auto'; 
            const timer = setTimeout(() => {
                setIsLogin(true);
                setName('');
                setEmail('');
                setPassword('');
            }, 300);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [isAuthModalOpen]);

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            let success = false;
            if (isLogin) {
                success = await login(email, password);
            } else {
                success = await register(name, email, password);
            }

            if (success) {
                toast.success(isLogin ? 'Welcome back!' : 'Account created!');
                closeAuthModal();
            } else {
                toast.error('Authentication failed. Please check your credentials.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={closeAuthModal}>
            <motion.div
                layout
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
                <button className={styles.closeButton} onClick={closeAuthModal} aria-label="Close modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <header className={styles.header}>
                    <img src={Logo} alt="Sequorr" className={styles.logo} />
                </header>

                <main className={styles.body}>
                    <div className={styles.authContainer}>
                        <h1 className={styles.mainTitle}>
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </h1>
                        <p className={styles.description}>
                            Access your private Sequorr insights and emotional analytics.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {!isLogin && (
                                <div className={styles.inputWrapper}>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className={styles.emailInput}
                                    />
                                </div>
                            )}
                            <div className={styles.inputWrapper}>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.emailInput}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={styles.emailInput}
                                />
                            </div>
                            
                            <button className={styles.btnPrimary} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <p className={styles.footerNote} onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                        </p>
                    </div>
                </main>
            </motion.div>
        </div>
    );
};


export default AuthModal;
