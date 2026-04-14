
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Logo from '../../assets/navbar/wordmark.svg'
import styles from './Home.module.css'

import DarkVeil from '../../components/react-bits/darkVeil/DarkVeil'
import FitBoxOne from '../../assets/about/aboutFitness/first.jpeg'
import FitBoxTwo from '../../assets/about/aboutFitness/second.jpeg'
import FitBoxThree from '../../assets/about/aboutFitness/third.jpeg'
import FitBoxFour from '../../assets/about/aboutFitness/fourth.jpeg'
import Believe from '../../components/believe/Believe'
import Audience from '../../components/audience/Audience'
import Movement from '../../components/movement/Movement'
import Motivation from '../../components/motivation/Motivation'
import Footer from '../../components/footer/Footer'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import JoinButton from '../../components/joinButton/JoinButton'
import SectionHeader from '../../components/sectionHeader/SectionHeader'
import Hero from '../../components/hero/Hero'
import SEO from '../../components/seo/SEO'

const Home = () => {
    const navigate = useNavigate();

    useScrollAnimation();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Sequorr",
        "url": "https://sequorr.com",
        "logo": "https://sequorr.com/logo.svg",
        "sameAs": [
            "https://twitter.com/sequorr",
            "https://instagram.com/sequorr"
        ]
    };

    return (
        <>
            <SEO 
                title="Understand your mind. Track your emotions." 
                description="A mental wellness platform powered by AI to automatically detect your emotional state without the manual logging."
                url="https://sequorr.com"
            >
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </SEO>
            <Navbar />
            <div className={styles.pageContainer}>
                {/* Hero section */}
            <Hero 
            className={styles.featuresHeroSection}  
                background={
                    <DarkVeil
                        hueShift={112}
                        noiseIntensity={0}
                        scanlineIntensity={0}
                        speed={1.9}
                        scanlineFrequency={0}
                        warpAmount={0}
                    />
                }
                tagline="Understand your mind. Track your emotions."
                title={<img src={Logo} alt="Sequorr" />}
                description="A multi-modal mental wellness platform powered by AI that detects your emotional state."
                actions={
                    <>
                        <JoinButton />
                        
                    </>
                }
            >
                <div className={styles.featuresAnimationContainer}>
                    <div className={styles.featuresAnimation}></div>
                    <div className={styles.cssTextRing} style={{ '--total': 39 }}>
                        {Array.from("ai emotion tracking · privacy first · ").map((char, index) => (
                            <span key={index} style={{ '--index': index }}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </div>
                </div>
            </Hero>


            {/* Bento */}
            <section className={styles.aboutSection}>
                <SectionHeader 
                    title="Beyond Manual Logging. True Emotional AI."
                    description="Sequorr brings face and text emotion detection together so you can understand your feelings automatically."
                />

                <div className={styles.aboutBentoGrid}>
                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemOne}`}>
                        <h1 className={`${styles.aboutBentoTitle} reveal`}>Real-Time Face Scan</h1>
                        <p className={`${styles.aboutBentoDescription} reveal`}>Analyze your facial expressions locally in the browser. Completely private, no video leaves your device.</p>
                    </div>

                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemTwo}`}>
                        <h1 className={`${styles.aboutBentoTitle} reveal`}>AI Journaling</h1>
                        <p className={`${styles.aboutBentoDescription} reveal`}>Write your thoughts. Our AI detects text sentiment and emotional triggers instantly.</p>
                    </div>

                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemThree}`}>
                        <h1 className={`${styles.aboutBentoTitle} reveal`}>The Fusion Engine.</h1>
                        <p className={`${styles.aboutBentoDescription} reveal`}>We fuse modalities to calculate your Daily Emotion Score automatically.</p>
                    </div>

                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemFour}`}>
                        <button 
                            className={styles.aboutBentoButton} 
                            onClick={() => { window.scrollTo(0, 0); navigate('/pathways'); }}
                        >
                            Explore Pathways
                        </button>
                    </div>

                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemFive}`}>
                        <h1 className={`${styles.aboutBentoTitle} reveal`}>Privacy First.</h1>
                        <p className={`${styles.aboutBentoDescription} reveal`}>All biometric data is abstracted to vectors. Your raw data is never tracked or shared.</p>
                    </div>

                    <div className={`${styles.bentoItem} ${styles.aboutBentoItemSix}`}>
                        <h1 className={`${styles.aboutBentoTitle} reveal`}>Understand yourself.</h1>
                        <p className={`${styles.aboutBentoDescription} reveal`}>Join early and experience a new era of mental wellness tracking.</p>
                        <JoinButton />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.aboutFitnessSection}>
                <div className={styles.aboutFitnessHeader}>
                    <SectionHeader 
                        title="The Problem with Mood Trackers"
                        description="Most apps rely entirely on you remembering to log your mood honestly."
                    />
                </div>

                <div className={styles.fitnessContent}>
                    <div className={`${styles.fitnessBlock} ${styles.fitnessBlock1}`}>
                        <div className={styles.fitnessTextContent}>
                            <h1 className={`${styles.fitnessBlockTitle} reveal`}>The Manual Logging Flaw</h1>
                            <p className={`${styles.fitnessBlockText} reveal`}>
                                Traditional mental wellness apps require you to tap an emoji.<br />
                                But people forget. We underreport.<br />
                                Sometimes, we don't even recognize what we're feeling.
                            </p>
                            <p className={`${styles.fitnessBlockText} reveal`}>
                                These systems miss the hidden signals:<br />
                                Facial microexpressions.<br />
                                The tone in your writing.
                            </p>
                        </div>
                        <div className={styles.fitnessMediaContent}>
                            <img src={FitBoxOne} alt="box1" className={styles.fitnessImage} />
                        </div>
                    </div>

                    <div className={`${styles.fitnessBlock} ${styles.fitnessBlock2}`}>
                        <div className={styles.fitnessMediaContent}>
                            <img src={FitBoxTwo} alt="boxTwo" className={styles.fitnessImage} />
                        </div>
                        <div className={styles.fitnessTextContent}>
                            <h1 className={`${styles.fitnessBlockTitle} reveal`}>Privacy-First Inference</h1>
                            <p className={`${styles.fitnessBlockText} reveal`}>
                                Capturing biometric data requires extreme trust.<br />
                                That's why our emotional analysis happens directly on your device.</p>
                            <p className={`${styles.fitnessBlockText} reveal`}>Sequorr never transmits video or images to the cloud. Only an anonymized emotion vector reaches our servers. Your journals are encrypted at rest.</p>
                        </div>
                    </div>

                    <div className={`${styles.fitnessBlock} ${styles.fitnessBlock3}`}>
                        <div className={styles.fitnessTextContent}>
                            <h1 className={`${styles.fitnessBlockTitle} reveal`}>The Fusion Engine</h1>
                            <p className={`${styles.fitnessBlockText} reveal`}>
                                Single-modality analysis isn't enough to capture human emotion.<br />
                                We fuse facial signals and text sentiment using dynamic weighting algorithms.</p>
                            <p className={`${styles.fitnessBlockText} reveal`}>This reduces noise and calculates a highly accurate Daily Emotion Score.</p>
                        </div>
                        <div className={styles.fitnessMediaContent}>
                            <img src={FitBoxThree} alt="boxThree" className={styles.fitnessImage} />
                        </div>
                    </div>

                    <div className={`${styles.fitnessBlock} ${styles.fitnessBlock4}`}>
                        <div className={styles.fitnessMediaContent}>
                            <img src={FitBoxFour} alt="fitBoxFour" className={styles.fitnessImage} />
                        </div>
                        <div className={styles.fitnessTextContent}>
                            <h1 className={`${styles.fitnessBlockTitle} reveal`}>Actionable Wellness</h1>
                            <p className={`${styles.fitnessBlockText} reveal`}>
                                Tracking is only the first step.<br />
                                Sequorr detects emotional drift and suggests<br />
                                personalized wellness activities to help you recenter.<br />
                                Because understanding leads to healing.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Believe Section */}
            <Believe />

            {/* Audience Section */}
            <Audience />

            {/* Movement Section */}
            <Movement />

            {/* Motivation Section */}
            <Motivation />



            {/* Footer Section */}
            <Footer />
            </div>

        </>
    )
}

export default Home