import { SearchSuggestion } from '../../services/searchService';
import { ChevronRight } from 'lucide-react';

interface SearchAutocompleteProps {
  suggestions: SearchSuggestion[];
  onSelect: (url: string, title: string) => void;
  visible: boolean;
}

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-green-100 text-green-700',
  'Signals and Features': 'bg-blue-100 text-blue-700',
  'Geographic and Time Grains': 'bg-cyan-100 text-cyan-700',
  'Data Science Treatments': 'bg-amber-100 text-amber-700',
  'APIs and Integrations': 'bg-gray-100 text-gray-700',
  'Free Data Tables': 'bg-teal-100 text-teal-700'
};

export default function SearchAutocomplete({ suggestions, onSelect, visible }: SearchAutocompleteProps) {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion.url, suggestion.title)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium truncate group-hover:text-amber-600 transition-colors">
                {suggestion.title}
              </p>
              <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium mt-1 ${categoryColors[suggestion.category] || 'bg-gray-100 text-gray-700'}`}>
                {suggestion.category}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
