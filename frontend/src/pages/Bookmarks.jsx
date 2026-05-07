const Bookmarks = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Your Bookmarks
        </h1>
        <p className="text-gray-400">All your saved stories in one place.</p>
        {/* Bookmarked stories list placeholder */}
      </div>
    </div>
  );
};

export default Bookmarks;
