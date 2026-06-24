import { useState, useEffect } from 'react';

export function useYouTubeData(channelId = 'UCybVuyrbtdTxwUJe0xRcLCf') {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Use an RSS-to-JSON proxy to dynamically fetch latest YouTube videos from the channel ID
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
        const data = await res.json();
        
        if (data.status === 'ok' && data.items) {
          setVideos(data.items);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Failed to fetch YouTube videos", err);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVideos();
  }, [channelId]);

  return { videos, isLoading };
}
