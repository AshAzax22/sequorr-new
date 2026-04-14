import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import Logo from '../../assets/navbar/logo.svg';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navRef = React.useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    React.useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav ref={navRef} className={`${styles.navbar} ${isMenuOpen ? styles.navActive : ''}`} aria-label="Main Navigation">
            <div className={styles.navLogo} onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>
                <img src={Logo} alt="Sequorr logo" />
            </div>

            <button
                className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <div
                className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}
                role="navigation"
            >
                <div className={styles.navLink} onClick={() => handleNavigation('/')}>Home</div>
                <div className={styles.navLink} onClick={() => handleNavigation('/dashboard')}>Dashboard</div>
                <div className={styles.navLink} onClick={() => handleNavigation('/journal')}>AI Journal</div>
                <div className={styles.navLink} onClick={() => handleNavigation('/face-scan')}>Face Scan</div>
                <div className={styles.navLink} onClick={() => handleNavigation('/pathways')}>Pathways</div>
            </div>
        </nav>
    )
}

export default Navbar