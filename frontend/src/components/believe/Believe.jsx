import React, { useState } from 'react'
import styles from './Believe.module.css'

import Pointer from '../../assets/movement/pointer.svg'
import Option1 from '../../assets/believe/option1.svg'
import Option2 from '../../assets/believe/option2.svg'
import Option3 from '../../assets/believe/option3.svg'
import Option4 from '../../assets/believe/option4.svg'
import Option5 from '../../assets/believe/option5.svg'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import SectionHeader from '../sectionHeader/SectionHeader'

const Believe = () => {
    const believes = [
        {
            title: "Awareness over Guesswork",
            description: "Mental clarity feels more sustainable when it's automated. Seeing your real-time emotional state helps you understand yourself without the pressure of manual logging.",
            image: Option1
        },
        {
            title: "Consistency Over Perfection",
            description: "Long-term wellness isn't built on perfect days or extreme joy. It's built on returning to your authentic self, even when energy is low or anxiety is high.",
            image: Option2
        },
        {
            title: "Mindfulness Should Fit Real Life",
            description: "Life is unpredictable. Some days are calm. Some days are stressful. Sequorr adapts to that rhythm, instantly detecting your state without demanding rigid plans.",
            image: Option3
        },
        {
            title: "Zero Judgment",
            description: "You don't need to be perfectly zen or constantly happy to belong here. Every emotion is valid data. We just help you see it.",
            image: Option4
        },
        {
            title: "Growth Is Personal",
            description: "Progress isn't one-size-fits-all. For some, it's less anxiety. For others, it's deeper self-understanding. Sometimes, it's simply writing down how you feel.",
            image: Option5
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const activeBelief = believes[activeIndex];

    useScrollAnimation();

    return (
        <>
            {/* What We Believe Section */}
            <section className={styles.believeSection}>
                <div className={styles.believeHeader}>
                    <SectionHeader 
                        title="What we believe"
                        description="At Sequorr, we believe understanding your mind shouldn't be a tedious, manual, or lonely process."
                    />
                </div>

                <div className={styles.believeContent}>
                    <div className={styles.believeBlockNav}>
                        {believes.map((belief, index) => (
                            <button
                                key={index}
                                className={`${styles.believeBlockNavBtn} ${activeIndex === index ? styles.active : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {activeIndex === index && (
                                    <img className={styles.believeBlockNavImage} src={Pointer} alt="pointer" />
                                )}
                                {belief.title}
                            </button>
                        ))}
                    </div>

                    <div className={styles.believeBlockContent}>
                        <img className={styles.believeBlockContentImage} src={activeBelief.image} alt={activeBelief.title} />
                        <div className={styles.believeBlockContentOverlay}>
                            <p className={`${styles.believeBlockContentText} reveal`}>{activeBelief.description}</p>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Believe