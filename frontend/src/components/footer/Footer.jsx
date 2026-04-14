import React from 'react'
import styles from './Footer.module.css'

import Insta from '../../assets/footer/insta.svg'
import Facebook from '../../assets/footer/facebook.svg'
import Reddit from '../../assets/footer/reddit.svg'
import X from '../../assets/footer/x.svg'
import Mail from '../../assets/footer/mail.svg'
import JoinButton from '../joinButton/JoinButton'

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            {/* Brand Tagline Section */}
            <div className={styles.marqueeSection}>
                <div className={styles.marqueeContent}>
                    <span>mindfulness <i>//</i></span>
                    <span>privacy <i>//</i></span>
                    <span>AI <i>//</i></span>
                    <span>clarity <i>//</i></span>
                    <span>emotion <i>//</i></span>
                    <span>security <i>//</i></span>
                    <span>reflection <i>//</i></span>
                    {/* Set 2 */}
                    <span>mindfulness <i>//</i></span>
                    <span>privacy <i>//</i></span>
                    <span>AI <i>//</i></span>
                    <span>clarity <i>//</i></span>
                    <span>emotion <i>//</i></span>
                    <span>security <i>//</i></span>
                    <span>reflection <i>//</i></span>
                    {/* Set 3 */}
                    <span>mindfulness <i>//</i></span>
                    <span>privacy <i>//</i></span>
                    <span>AI <i>//</i></span>
                    <span>clarity <i>//</i></span>
                    <span>emotion <i>//</i></span>
                    <span>security <i>//</i></span>
                    <span>reflection <i>//</i></span>
                </div>
            </div>

            <div className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>You don't have to guess your feelings.</h2>
                <p className={styles.ctaText}>
                    Sequorr is building a platform where mental wellness feels automated, private, and insightful.
                </p>
                <JoinButton />
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.legalInfo}>
                    <p className={styles.copyright}>
                        &#169; {new Date().getFullYear()} Sequorr - Built for understanding and privacy.
                    </p>
                </div>

                <div className={styles.socialLinks}>
                    <a href="https://www.instagram.com/sequorr_app/" target="_blank" aria-label="Instagram"><img src={Insta} alt="" /></a>
                    <a href="https://www.facebook.com/sequorr_app/" target="_blank" aria-label="Facebook"><img src={Facebook} alt="" /></a>
                    <a href="https://www.reddit.com/r/SEQUORR/s/mAwBhRq70V" target="_blank" aria-label="Reddit"><img src={Reddit} alt="" /></a>
                    <a href="https://x.com/sequorr_app?s=21" target="_blank" aria-label="X"><img src={X} alt="" /></a>
                    <a href="mailto:contact@sequorr.com" target="_blank" aria-label="Email"><img src={Mail} alt="" /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer