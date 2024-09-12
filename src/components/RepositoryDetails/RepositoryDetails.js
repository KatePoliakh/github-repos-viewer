import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import styles from './RepositoryDetails.module.css';

// Define the GraphQL query to fetch the repository's file structure and commit history
const GET_REPO_DETAILS = gql`
  query GetRepoDetails($owner: String!, $name: String!, $path: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $path) {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100) {
              edges {
                node {
                  message
                  committedDate
                  oid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const RepositoryDetails = ({ owner, name, onBack }) => {
  const [fileContent, setFileContent] = useState(null);
  const [view, setView] = useState('files');
  const [path, setPath] = useState('HEAD:');

  const { loading, error, data } = useQuery(GET_REPO_DETAILS, {
    variables: { owner, name, path },
  });
    

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.repository) {
    return <p>No repository data available.</p>;
  }

  const repository = data.repository;
  const files = repository?.object?.entries || [];
  const commits = repository?.defaultBranchRef?.target?.history?.edges || [];

  const handleFileClick = (file) => {
    if (file.type === 'tree') {
      // Update the path to go into the directory
      setPath(`HEAD:${file.name}`);
    } else if (file.type === 'blob' && file.object && file.object.text) {
      setFileContent(file.object.text);
    } else {
      setFileContent('Cannot display this file type or file is empty.');
    }
  };

  const handleBackToRoot = () => {
    setPath('HEAD:');  // Go back to the root of the repository
    setFileContent(null);  // Clear file content when navigating back
  };

  return (
    <div className={styles.detailsWrapper}>
      <button onClick={onBack} className={styles.backButton}>
        Back to repositories
      </button>

      {path !== 'HEAD:' && (
        <button onClick={handleBackToRoot} className={styles.backButton}>
          Back to root directory
        </button>
      )}

      <div className={styles.toggleButtons}>
        <button
          className={`${styles.toggleButton} ${view === 'files' ? styles.active : ''}`}
          onClick={() => setView('files')}
        >
          Show Files
        </button>
        <button
          className={`${styles.toggleButton} ${view === 'commits' ? styles.active : ''}`}
          onClick={() => setView('commits')}
        >
          Show Commits
        </button>
      </div>

      {view === 'files' && (
        <div className={styles.filesSection}>
          <h3>Files</h3>
          {files.length > 0 ? (
            <ul>
              {files.map((file) => (
                <li key={file.name} onClick={() => handleFileClick(file)}>
                  {file.name} ({file.type})
                </li>
              ))}
            </ul>
          ) : (
            <p>No files found.</p>
          )}
        </div>
      )}

      {view === 'commits' && (
        <div className={styles.commitsSection}>
          <h3>Commits</h3>
          {commits.length > 0 ? (
            <ul>
              {commits.map((commit) => (
                <li key={commit.node.oid}>
                  {commit.node.message} - {new Date(commit.node.committedDate).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No commits found.</p>
          )}
        </div>
      )}

      {fileContent && (
        <div className={styles.fileContent}>
          <h3>File Content</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
