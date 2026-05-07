import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, totalPages, onPageChange, loading }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || loading}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="text-sm font-medium text-gray-700">
        Page <span className="text-blue-600">{page}</span> of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || loading}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
