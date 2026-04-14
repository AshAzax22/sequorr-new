import React from 'react';
import styles from './Hero.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Hero = ({
  tagline,
  title,
  subtitle,
  description,
  background,
  actions,
  className = '',
  contentClassName = '',
  sectionId = '',
  children
}) => {
  useScrollAnimation();

  return (
    <section id={sectionId} className={`${styles.heroSection} ${className}`}>
      {background && (
        <div className={styles.heroBackground}>
          {background}
        </div>
      )}

      <div className={`${styles.heroContent} ${contentClassName}`}>
        {tagline && (
          <div className={styles.heroTagline}>
            <p className={styles.taglineText}>{tagline}</p>
          </div>
        )}

        <div className={styles.heroText}>
          {typeof title === 'string' ? (
            <h1 className={styles.heroTitleText}>{title}</h1>
          ) : (
            <div className={styles.heroTitleWrapper}>
              {title}
            </div>
          )}

          {subtitle && <h3 className={styles.heroSubtitle}>{subtitle}</h3>}
          {description && <p className={styles.heroDescription}>{description}</p>}
        </div>

        {actions && (
          <div className={styles.heroButtonGroup}>
            {actions}
          </div>
        )}

        
      </div>
      {children}
    </section>
  );
};

export default Hero;
