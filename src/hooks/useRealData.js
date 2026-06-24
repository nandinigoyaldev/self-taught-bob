import { useState, useEffect } from 'react';

export function useRealData(username = 'nandinigoyaldev') {
  const [data, setData] = useState({
    name: 'Loading...',
    bio: 'Loading...',
    avatar: 'https://github.com/ghost.png',
    followers: 0,
    following: 0,
    location: '',
    company: '',
    repos: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const json = await res.json();
        
        setData({
          name: json.name || json.login,
          bio: json.bio || 'No bio available',
          avatar: json.avatar_url,
          followers: json.followers,
          following: json.following,
          location: json.location || '',
          company: json.company || '',
          repos: json.public_repos,
          isLoading: false,
          error: null
        });
      } catch (err) {
        setData(prev => ({ ...prev, isLoading: false, error: err.message }));
      }
    }
    
    fetchData();
  }, [username]);

  return data;
}
