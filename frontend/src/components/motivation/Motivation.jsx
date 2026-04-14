import React, { useState } from 'react'
import styles from './Motivation.module.css'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import Box8Button from '../../assets/motivation/box8button.svg'
import SectionHeader from '../sectionHeader/SectionHeader'
import Stepper, { Step } from '../../components/react-bits/stepper/Stepper'

const Motivation = () => {
    const [activePhase, setActivePhase] = useState('Morning')
    const [activityIndex, setActivityIndex] = useState(0)

    useScrollAnimation();

    const activities = ['Face Scan', 'Journaling', 'Pathways', 'Insights']

    const handleNextActivity = () => {
        setActivityIndex((prev) => (prev + 1) % activities.length)
    }

    const phases = [
        { name: 'Morning', description: 'Kickstart your day with a quick face scan or a morning reflection. Get that early baseline and set the tone for your day.' },
        { name: 'Noon', description: 'A break between classes or work. Log a quick journal entry and see if any stress triggers were detected.' },
        { name: 'Evening', description: 'Wind down your mind. Review your daily emotion score and prepare for a restful night.' }
    ]

    return (
        <>
            {/* Motivation Section */}
            <section className={styles.motivationSection}>
                <SectionHeader 
                    title="Clarity without effort"
                    description={<>Understand your hidden triggers. Log your thoughts naturally.<br />It's not about being perfectly happy — it's about authentic self-awareness.</>}
                />

                <div className={styles.motivationShowcase}>
                    <div className={styles.motivationCard}>
                        <h2 className={`${styles.cardTitle} reveal`}>Consistency Without Friction</h2>
                        <p className={`${styles.cardTagline} reveal`}>You'll feel more self-aware</p>
                        <p className={`${styles.cardDescription} reveal`}>Big realizations start to add up when emotional tracking fits into your life effortlessly.</p>
                        {/* <p className={`${styles.cardHighlightText} reveal`}>Progress, at your pace.</p> */}
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>Insights You Feel</h2>
                        <p className={styles.cardTagline}>It's not just about numbers.</p>
                        <div className={styles.cardBarContainer}>
                            <div className={styles.cardBar}></div>
                            <div className={styles.cardBar}></div>
                            <div className={styles.cardBar}></div>
                            <div className={styles.cardBar}></div>
                            <div className={styles.cardBar}></div>
                        </div>
                        {/* <p className={styles.cardHighlightText}>Growth beyond metrics.</p> */}
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>Your day with Sequorr</h2>
                        <div className={styles.daySchedule}>
                            <div className={styles.dayPhaseNav}>
                                {phases.map((phase) => (
                                    <p
                                        key={phase.name}
                                        className={`${styles.dayPhaseNavItem} ${activePhase === phase.name ? styles.active : ''}`}
                                        onClick={() => setActivePhase(phase.name)}
                                    >
                                        {phase.name}
                                    </p>
                                ))}
                            </div>
                            <div className={styles.dayPhaseNavDescriptionContainer}>
                                <p className={styles.dayPhaseNavDescription}>
                                    {phases.find(p => p.name === activePhase)?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={`${styles.cardTitle} reveal`}>Awareness That Lasts</h2>
                        <p className={`${styles.cardTagline} reveal`}>You'll stay engaged longer</p>
                        <p className={`${styles.cardDescription} reveal`}>Private tracking and continuous AI reflections keep you connected with your own mind.</p>
                        {/* <p className={`${styles.cardHighlightText} reveal`}>Your journey, your rules.</p> */}
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>What's holding you back</h2>
                        {/* <p className={styles.cardTagline}>Lack of motivation</p> */}
                        <Stepper
                            initialStep={1}
                            onStepChange={(step) => {
                                console.log(step);
                            }}
                            onFinalStepCompleted={() => console.log("All steps completed!")}
                            backButtonText="Previous"
                            nextButtonText="Next"
                        >
                            <Step>
                                <p className={styles.cardDescription}>Forgetting to log</p>
                            </Step>

                            <Step>
                                <p className={styles.cardDescription}>Confusing emotions</p>
                            </Step>

                            <Step>
                                <p className={styles.cardDescription}>Fear of privacy leaks</p>
                            </Step>

                            <Step>
                                <p className={styles.cardDescription}>Manual tracking fatigue</p>
                            </Step>
                        </Stepper>

                        {/* <p className={styles.cardHighlightText}>Movement becomes a habit.</p> */}
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>Get your mind clear</h2>
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>Privacy Over Exposure</h2>
                        <p className={styles.cardTagline}>Encrypted data. No cloud video.</p>
                    </div>

                    <div className={styles.motivationCard}>
                        <h2 className={styles.cardTitle}>Explore all modalities</h2>
                        <p className={styles.cardTagline}>Wellness has its own options</p>
                        <div className={styles.activityLoopContainer}>
                            <div className={styles.activityTextContainer}>
                                <p className={styles.activityText}>{activities[activityIndex]}</p>
                            </div>
                            <img
                                src={Box8Button}
                                alt="button"
                                className={styles.activityButton}
                                onClick={handleNextActivity}
                            />
                        </div>
                        {/* <p className={styles.cardHighlightText}>Try your options.</p> */}
                    </div>
                </div>
            </section >
        </>
    )
}

export default Motivation