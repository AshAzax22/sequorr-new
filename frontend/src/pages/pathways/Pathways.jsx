import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import styles from './Pathways.module.css'
import AccessGate from '../../components/accessGate/AccessGate'

const PATHWAY_DATA = [
    {
        name: "Sunlit Path",
        icon: "☀️",
        description: "A space for those feeling Joyful, Happy, and Full of Life. Share your wins and spread the warmth.",
        mood: "Joy & Elation"
    },
    {
        name: "Quiet Valley",
        icon: "🍃",
        description: "A sanctuary for Peace, Calm, and Neutral reflection. Find serenity in the simple presence of others.",
        mood: "Peace & Serenity"
    },
    {
        name: "Storm Shelter",
        icon: "⛈️",
        description: "A safe harbor for Anger, Frustration, and Vented emotions. Release the pressure without judgment.",
        mood: "Stress & Frustration"
    },
    {
        name: "Reflective Lake",
        icon: "🌊",
        description: "A depth for Sadness, Sorrow, and Quiet Melancholy. Sit together in the stillness of deep feeling.",
        mood: "Sorrow & Reflection"
    },
    {
        name: "Safe Harbor",
        icon: "⚓",
        description: "A firm ground for Anxiety, Fear, and Overwhelmed minds. Anchor yourself with community support.",
        mood: "Anxiety & Overwhelm"
    }
]

const Pathways = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Discovery Pathways</h1>
                    <p className={styles.subtitle}>Community rooms powered by shared emotional resonance. Find where you belong.</p>
                    
                    <AccessGate title="Join a Pathway" subtitle="Sign in to connect with others who are walking the same emotional path as you right now.">
                        <div className={styles.pathwayGrid}>
                            {PATHWAY_DATA.map((path, idx) => (
                                <div 
                                    key={idx} 
                                    className={styles.pathwayCard}
                                    onClick={() => navigate(`/pathway/${encodeURIComponent(path.name)}`)}
                                >
                                    <div className={styles.pathwayIcon}>{path.icon}</div>
                                    <div>
                                        <h2 className={styles.pathwayName}>{path.name}</h2>
                                        <small style={{color: 'var(--primary-green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px'}}>{path.mood}</small>
                                    </div>
                                    <p className={styles.pathwayDesc}>{path.description}</p>
                                    <button className={styles.joinBtn}>Enter Pathway</button>
                                </div>
                            ))}
                        </div>
                    </AccessGate>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Pathways
