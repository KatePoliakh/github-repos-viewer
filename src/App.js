import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Message from './components/Message/Message';
import RepositoryDetails from './components/RepositoryDetails/RepositoryDetails';

function App() {
  const [username, setUsername] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSearch = (query) => {
    setUsername(query.trim());

    setSelectedRepo(null);
  };

  const handleDetailsClick = (owner, repoName) => {
    setSelectedRepo({ owner, repoName });
  };

  return (
    <ApolloProvider client={client}>
      <Header onSearch={handleSearch} />
      {/* Show the start message when there's no username */} 
      {!username && !selectedRepo && <Message text="Please enter a username to search for repositories." />}
      
      {username && !selectedRepo && <Profile username={username} onDetailsClick={handleDetailsClick} />}
      {selectedRepo && (
        <RepositoryDetails owner={selectedRepo.owner} name={selectedRepo.repoName} />
      )}
    </ApolloProvider>
  );
}

export default App;
