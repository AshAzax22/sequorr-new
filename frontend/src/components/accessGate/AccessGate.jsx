import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import styles from './AccessGate.module.css';
import JoinButton from '../joinButton/JoinButton';

const AccessGate = ({ children, title = "Protected Feature", subtitle = "Sign in to access your private insights." }) => {
    const { user } = useAuth();
    const { openAuthModal } = useModal();

    if (user) {
        return children;
    }

    const skeletons = [1, 2, 3, 4, 5, 6];

    return (
        <div className={styles.gateWrapper}>
            {/* HERO PROMPT SECTION */}
            <div className={styles.heroSection}>
                <motion.div 
                    className={styles.promptBox}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className={styles.premiumBadge}>Member Access Only</span>
                    <h2 className={styles.gateTitle}>{title}</h2>
                    <p className={styles.gateSubtitle}>{subtitle}</p>
                    <div className={styles.ctaRow}>
                        <JoinButton>Sign In / Register</JoinButton>
                    </div>
                    <p className={styles.gateNote}>Your data is processed locally and stays private.</p>
                </motion.div>
            </div>

            {/* SKELETON PREVIEW WITH FADING OVERLAY */}
            <div className={styles.previewContainer}>
                <div className={styles.skeletonGrid}>
                    {skeletons.map((i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImage}></div>
                            <div className={styles.skeletonContent}>
                                <div className={styles.skeletonTitle}></div>
                                <div className={styles.skeletonMeta}></div>
                            </div>
                            <motion.div 
                                className={styles.shimmer}
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.fadingOverlay}></div>
            </div>
        </div>
    );
};

export default AccessGate;
