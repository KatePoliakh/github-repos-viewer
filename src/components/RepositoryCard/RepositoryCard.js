import React from 'react';
import styles from './RepositoryCard.module.css';

const RepositoryCard = ({ name, description, starsCount, url, onDetailsClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <div className={styles.stars}>
          <span>{starsCount}</span>
          <svg
            className={styles.starIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17l-5 3 1.09-6.36L2 9l6.41-.54L12 2l2.59 6.46L21 9l-6.09 4.64L17 20z"
            />
          </svg>
        </div>
      </div>
      <p className={styles.description}>{description}</p>

      {/* Dropdown Menu */}
      <div className={styles.dropdown}>
        <button onClick={() => window.open(url, '_blank')}>See on GitHub</button>
        <button onClick={onDetailsClick}>See Details</button>
      </div>
    </div>
  );
};

export default RepositoryCard;
