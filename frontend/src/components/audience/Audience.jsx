import styles from './Audience.module.css'
import useScrollAnimation from '../../hooks/useScrollAnimation'

// Import Icons
import beginnersIcon from '../../assets/homeAudience/beginnersIcon.svg'
import hobbyistsIcon from '../../assets/homeAudience/hobbyistsIcon.svg'
import athletesIcon from '../../assets/homeAudience/atheletesIcon.svg'
import everyoneIcon from '../../assets/homeAudience/everyoneIcon.svg'

// Import Background Images
import beginnersBg from '../../assets/homeAudience/beginners.jpeg'
import hobbyistsBg from '../../assets/homeAudience/hobbyists.jpeg'
import athletesBg from '../../assets/homeAudience/atheletes.jpeg'
import everyoneBg from '../../assets/homeAudience/everyone.jpeg'
import SectionHeader from '../sectionHeader/SectionHeader'

const PERSONAS = [
    {
        id: 'beginners',
        title: 'The Curious',
        description: "Just starting your mental wellness journey? We'll help you build emotional awareness, one authentic entry at a time.",
        icon: beginnersIcon,
        backgroundImage: beginnersBg
    },
    {
        id: 'hobbyists',
        title: 'The Busy Mind',
        description: "Balancing work, studies, and life. Sequorr keeps emotional tracking flexible, automated, and effortless.",
        icon: hobbyistsIcon,
        backgroundImage: hobbyistsBg
    },
    {
        id: 'athletes',
        title: 'The Deep Thinker',
        description: "Pushing for profound self-discovery. We provide the privacy and fusion engine to elevate your personal growth.",
        icon: athletesIcon,
        backgroundImage: athletesBg
    },
    {
        id: 'everyone',
        title: 'Everyone',
        description: "No pressure. No manual scales. Just a secure platform that helps you understand yourself every day.",
        icon: everyoneIcon,
        backgroundImage: everyoneBg
    },
];

const Audience = () => {
    useScrollAnimation();
    return (
        <section className={styles.audienceSection}>
            <SectionHeader 
                title="A space for every kind of mind"
                description={<>Not everyone has time for an hour of meditation. Some people just want to understand how they feel.<br />Sequorr is the intelligence for the rest of us.</>}
            />
            <div className={styles.personasGrid}>
                <div className={styles.glowEffect}></div>

                {PERSONAS.map((persona) => (
                    <div key={persona.id} className={styles.personaCard} style={{ backgroundImage: `url(${persona.backgroundImage})` }}>
                        <img className={styles.cardIcon} src={persona.icon} alt={`${persona.title} icon`} />
                        <h2 className={`${styles.cardTitle} reveal`}>{persona.title}</h2>
                        <p className={`${styles.cardDescription} reveal`}>{persona.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Audience