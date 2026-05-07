import { useState, useEffect } from 'react';
import api from '../api/axios';
import StoryCard from '../components/StoryCard';
import { Loader2, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/stories/bookmarks');
      setStories(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (storyId, isBookmarked) => {
    if (!isBookmarked) {
      setStories((prev) => prev.filter((s) => s._id !== storyId));
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Saved Stories</h1>
            <p className="text-gray-500 mt-1">Manage and read your bookmarked Hacker News stories.</p>
          </div>
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-gray-500">Loading your bookmarks...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
            {error}
          </div>
        ) : stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Heart size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No bookmarks yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm text-center">
              Stories you bookmark will appear here for easy access later.
            </p>
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Discover Stories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {stories.map((story) => (
              <StoryCard 
                key={story._id} 
                story={story} 
                isBookmarkedInitial={true}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
