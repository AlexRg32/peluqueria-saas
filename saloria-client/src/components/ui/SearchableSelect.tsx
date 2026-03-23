import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Option {
  value: string | number;
  label: string;
  subLabel?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  icon?: React.ElementType;
  className?: string;
  required?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  label,
  error,
  icon: Icon,
  className,
  required
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => 
    options.find(opt => opt.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const searchLower = search.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchLower) || 
      (opt.subLabel && opt.subLabel.toLowerCase().includes(searchLower))
    );
  }, [options, search]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearch('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
  };

  return (
    <div className={cn("relative space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
          {Icon && <Icon size={14} className="text-brand-primary" />}
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full cursor-pointer transition-all",
          "bg-white rounded-xl border border-slate-200",
          "hover:border-slate-300",
          isOpen && "ring-2 ring-brand-primary/20 border-brand-primary shadow-sm",
          error && "border-rose-500 ring-rose-500/10"
        )}
      >
        <div className="flex items-center px-4 py-3 min-h-[50px]">
          {Icon && !label && <Icon className="mr-3 text-slate-400" size={18} />}
          
          <div className="flex-1 overflow-hidden">
            {selectedOption ? (
              <div className="flex flex-col truncate">
                <span className="text-slate-900 font-medium truncate">{selectedOption.label}</span>
                {selectedOption.subLabel && (
                  <span className="text-xs text-slate-500 truncate">{selectedOption.subLabel}</span>
                )}
              </div>
            ) : (
              <span className="text-slate-400 truncate">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-2">
            {selectedOption && !required && (
              <button
                type="button"
                onClick={clearSelection}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear selection"
              >
                <X size={14} />
              </button>
            )}
            <ChevronDown 
              size={18} 
              className={cn("text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} 
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute z-[60] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-72"
          >
            <div className="p-2 border-b border-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-1 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option.value);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group",
                      value === option.value 
                        ? "bg-brand-primary/10 text-slate-900" 
                        : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                    )}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className={cn("font-medium truncate", value === option.value && "text-slate-900")}>
                        {option.label}
                      </span>
                      {option.subLabel && (
                        <span className="text-xs text-slate-400 truncate group-hover:text-slate-500">
                          {option.subLabel}
                        </span>
                      )}
                    </div>
                    {value === option.value && (
                      <Check size={16} className="text-brand-primary shrink-0" />
                    )}
                  </button>
                ))
              ) : (
                <div className="py-8 text-center px-4">
                  <p className="text-sm text-slate-400 font-medium">No se encontraron resultados</p>
                  <p className="text-xs text-slate-300 mt-1">Intenta con otros términos de búsqueda</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-xs font-semibold text-rose-500 ml-1">{error}</p>}
    </div>
  );
};
