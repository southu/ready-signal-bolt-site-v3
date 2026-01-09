import { useNavigate } from 'react-router-dom';
import { ExternalLink, Tag } from 'lucide-react';
import { SearchResult } from '../../services/searchService';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  loading: boolean;
  onResultClick: (url: string) => void;
}

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-green-100 text-green-700',
  'Signals and Features': 'bg-blue-100 text-blue-700',
  'Geographic and Time Grains': 'bg-cyan-100 text-cyan-700',
  'Data Science Treatments': 'bg-amber-100 text-amber-700',
  'APIs and Integrations': 'bg-gray-100 text-gray-700',
  'Free Data Tables': 'bg-teal-100 text-teal-700'
};

export default function SearchResults({ results, query, loading, onResultClick }: SearchResultsProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 animate-pulse">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center">
        <p className="text-gray-600 text-lg mb-2">No results found for "{query}"</p>
        <p className="text-gray-500">Try different keywords or browse categories below</p>
      </div>
    );
  }

  if (!query || results.length === 0) {
    return null;
  }

  const handleResultClick = (url: string) => {
    onResultClick(url);
    navigate(url);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
        </h3>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={result.id}
            onClick={() => handleResultClick(result.url)}
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {result.title}
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-600 mb-2">{result.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[result.category] || 'bg-gray-100 text-gray-700'}`}>
                    {result.category}
                  </span>
                  {result.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs text-gray-500">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
