import React from 'react';
import styles from './ProfileInformation.module.css';

const ProfileInformation = ({ avatarUrl, login, name, followersCount, repositoriesCount }) => {
  return (
    <div className={styles.profileInfo}>
      <img src={avatarUrl} alt={`${login}'s avatar`} className={styles.avatar} />
      <h1 className={styles.login}>{login}</h1>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{followersCount}</span>
          <span className={styles.statLabel}>followers</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{repositoriesCount}</span>
          <span className={styles.statLabel}>repositories</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
