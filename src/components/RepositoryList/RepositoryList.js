import React from 'react';
import RepositoryCard from '../RepositoryCard/RepositoryCard'; 
import styles from './RepositoryList.module.css'; 
import { useState } from 'react';

const RepositoryList = ({ username, repositories, onDetailsClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const repositoriesPerPage = 5;

  if (!repositories || repositories.length === 0) {
    return <p>No repositories found.</p>;
  }

  const indexOfLastRepo = currentPage * repositoriesPerPage;
  const indexOfFirstRepo = indexOfLastRepo - repositoriesPerPage;
  const currentRepositories = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(repositories.length / repositoriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.repositoryList}>
      <h2 className={styles.heading}>Repositories</h2>
      <ul className={styles.repositories}>
        {repositories.map((repository) => (
          <RepositoryCard 
          key={repository.id} 
          name={repository.name} 
          description={repository.description} 
          starsCount={repository.stargazerCount} 
          url={repository.url} 
          onDetailsClick={() => onDetailsClick(username, repository.name)} 
          />
        ))}
      </ul>
      
    </div>
  );
};

export default RepositoryList;
