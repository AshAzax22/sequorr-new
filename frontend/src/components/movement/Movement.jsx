import styles from './Movement.module.css'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import SectionHeader from '../sectionHeader/SectionHeader'

import Pointer from '../../assets/movement/pointer.svg'
import JoinButton from '../joinButton/JoinButton'

const Movement = () => {
    useScrollAnimation();
    return (
        <>
            {/* WorkItem Section */}
            <section className={styles.movementSection}>
                <SectionHeader
                    title="Real emotions, not just emojis"
                    description="Mental wellness isn't just about 'good' and 'bad' days. In Sequorr, every microexpression counts."
                />

                <div className={styles.movementShowcase}>
                    <p className={`${styles.missionHeading} reveal`}>Launching with privacy at its core, Sequorr is designed to grow through private self-discovery, not public sharing.</p>

                    <p className={styles.communityTag}><img src={Pointer} alt="" />morning reflections</p>
                    <p className={styles.communityTag}><img src={Pointer} alt="" />anxiety triggers</p>
                    <p className={styles.communityTag}><img src={Pointer} alt="" />focus blocks</p>
                    <p className={styles.communityTag}><img src={Pointer} alt="" />stress relief</p>
                    <p className={styles.communityTag}><img src={Pointer} alt="" />deep journaling</p>
                    <p className={styles.communityTag}><img src={Pointer} alt="" />daily emotional score</p>

                    <JoinButton />
                </div>
            </section>
        </>
    )
}

export default Movement