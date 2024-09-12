import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import ProfileInformation from '../ProfileInformation/ProfileInformation';
import RepositoryList from '../RepositoryList/RepositoryList';
import styles from './Profile.module.css';
import Message from '../Message/Message';
import RepositoryDetails from '../RepositoryDetails/RepositoryDetails'; // Import RepositoryDetails

// Define the GraphQL query to get profile and repositories
const GET_PROFILE_AND_REPOSITORIES = gql`
  query GetProfileAndRepositories($login: String!) {
    user(login: $login) {
      avatarUrl
      name
      login
      followers {
        totalCount
      }
      repositories(first: 100, privacy: PUBLIC) {
        nodes {
          id
          name
          description
          url
          stargazerCount
        }
      }
    }
  }
`;

const Profile = ({ username, onDetailsClick }) => {
  const { loading, error, data } = useQuery(GET_PROFILE_AND_REPOSITORIES, {
    variables: { login: username },
    skip: !username, // Skip the query if no username is provided
  });

  const [selectedRepo, setSelectedRepo] = useState(null); // Track selected repository


  const handleDetailsClick = (owner, name) => {
    setSelectedRepo({ owner, name }); // Set the selected repository when "See Details" is clicked
  };

  const handleBackClick = () => {
    setSelectedRepo(null); // Reset the selected repository to go back to the list
  };

  console.log(data); // Add this to inspect the returned data

  if (loading) return <Message text="Loading..." />; // Show loading message
  if (error) return <Message text={`Error: ${error.message}`} />; // Show error message
  if (!data?.user) return <Message text="No data found for the provided username." />; // Show no data message

  const { avatarUrl, name, login, followers, repositories } = data.user;

  return (
    <div className={styles.profileWrapper}>
      <ProfileInformation
        avatarUrl={avatarUrl}
        login={login}
        name={name}
        followersCount={followers.totalCount}
        repositoriesCount={repositories.nodes.length}
      />
      {!selectedRepo ? (
        // Show the list of repositories if no repo is selected
        <RepositoryList repositories={repositories.nodes} onDetailsClick={handleDetailsClick} />
      ) : (
        // Show repository details when a repository is selected
          <RepositoryDetails owner={username} name={selectedRepo.name} onBack={handleBackClick} />
      )}
      </div>
  );
};

export default Profile;
