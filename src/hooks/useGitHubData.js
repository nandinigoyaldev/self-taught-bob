import { useState, useEffect } from 'react';

export function useGitHubData(username) {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, isLoading, error };
}
