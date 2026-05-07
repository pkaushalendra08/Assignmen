import { ExternalLink, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import api from '../api/axios';

const StoryCard = ({ story, onBookmarkToggle, isBookmarkedInitial }) => {
  const { user, updateBookmarks } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // Hacker News absolute timestamp in 'title' looks like: "2024-05-07T12:00:00 1715083200"
    // We split by space to get the ISO part and clean it up
    const cleanDateString = dateString.split(' ')[0];
    const date = new Date(cleanDateString);
    
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    return dateString;
  };

  const handleBookmark = async () => {
    if (!user) {
      alert('Please login to bookmark stories');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/stories/${story._id}/bookmark`);
      setIsBookmarked(response.data.bookmarked);
      updateBookmarks(response.data.bookmarks);
      
      if (onBookmarkToggle) {
        onBookmarkToggle(story._id, response.data.bookmarked);
      }
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {story.points} points
          </span>
          <button
            onClick={handleBookmark}
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            } disabled:opacity-50 cursor-pointer`}
          >
            <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors break-words">
          {story.title}
        </h3>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">by {story.author}</span>
            <span className="text-xs">{formatDate(story.postedAt)}</span>
          </div>
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
