import { useState } from 'react';
import { Eye, Code, Bold, Italic, List, Link2, Image, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const insertTag = (openTag: string, closeTag: string = '') => {
    if (!textareaRef) return;
    
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newText = beforeText + openTag + selectedText + (closeTag || openTag.replace('<', '</')) + afterText;
    onChange(newText);
    
    // Focus back and set cursor position
    setTimeout(() => {
      textareaRef.focus();
      const newPosition = start + openTag.length + selectedText.length + (closeTag || openTag.replace('<', '</')).length;
      textareaRef.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading2, label: 'Heading', action: () => insertTag('<h2>', '</h2>') },
    { icon: Bold, label: 'Bold', action: () => insertTag('<strong>', '</strong>') },
    { icon: Italic, label: 'Italic', action: () => insertTag('<em>', '</em>') },
    { icon: List, label: 'List', action: () => insertTag('<ul>\n  <li>', '</li>\n</ul>') },
    { icon: Link2, label: 'Link', action: () => insertTag('<a href="">', '</a>') },
    { icon: Image, label: 'Image', action: () => insertTag('<img src="" alt="', '" />') },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
              title={btn.label}
            >
              <btn.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
              mode === 'edit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code className="w-4 h-4" />
            HTML
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
              mode === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      {mode === 'edit' ? (
        <textarea
          ref={(ref) => setTextareaRef(ref)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[400px] p-4 font-mono text-sm focus:outline-none resize-y"
          spellCheck={false}
        />
      ) : (
        <div className="min-h-[400px] p-4 overflow-auto">
          {value ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className="text-gray-400 italic">No content to preview</p>
          )}
        </div>
      )}
    </div>
  );
}

