const Home = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 flex flex-col items-center">
      <header className="w-full max-w-7xl mx-auto px-4 py-12 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Stay Ahead of the <span className="text-blue-600">Curve</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The easiest way to track, save, and manage the top stories from Hacker News. 
          Everything you need in one clean, professional dashboard.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Get Started Free
          </button>
        </div>
      </header>

      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Real-time Updates', desc: 'Get the latest stories as they happen on Hacker News.' },
            { title: 'Smart Bookmarking', desc: 'Save stories to read later with our integrated bookmarking system.' },
            { title: 'Clean Experience', desc: 'No clutter, just the news you care about in a beautiful UI.' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
