import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = ({ title, description }) => {
  return (
    <div className={`${styles.sectionHeader} sectionHeader`}>
      <div className={styles.sectionTitleContainer}>
        <p className={styles.sectionTitleText}>{title}</p>
      </div>

      {description && (
        <div className={styles.sectionDescriptionContainer}>
          <p className={`${styles.sectionDescriptionText} reveal`}>{description}</p>
        </div>
        
      )}
    </div>
  );
};

export default SectionHeader;
