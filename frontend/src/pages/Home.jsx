import { useState, useEffect } from 'react';
import api from '../api/axios';
import StoryCard from '../components/StoryCard';
import Pagination from '../components/Pagination';
import { Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/stories?page=${page}&limit=12`);
      setStories(response.data.stories);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load stories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    try {
      await api.post('/scrape');
      if (page === 1) fetchStories();
      else setPage(1);
    } catch (err) {
      console.error('Scraping failed');
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [page]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Top Stories</h1>
            <p className="text-gray-500 mt-1">Curated from the Hacker News community.</p>
          </div>
          
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {scraping ? (
              <Loader2 className="animate-spin text-blue-600" size={20} />
            ) : (
              <RefreshCw size={20} className="text-blue-600" />
            )}
            <span>{scraping ? 'Syncing...' : 'Sync Latest'}</span>
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-gray-500">Loading your feed...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
            {error}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No stories found. Try syncing latest news!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {stories.map((story) => (
                <StoryCard 
                  key={story._id} 
                  story={story} 
                  isBookmarkedInitial={user?.bookmarks?.includes(story._id)}
                />
              ))}
            </div>

            <Pagination 
              page={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
