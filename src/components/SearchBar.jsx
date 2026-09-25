import React from 'react';
import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiXMark, HiPlus } from 'react-icons/hi2';

export default function SearchBar({ searchTerm, setSearchTerm, onOpenAddModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 my-6"
    >
      {/* Search Input Box */}
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
          <HiMagnifyingGlass className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contacts by name, email or phone..."
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
        />

        {/* Clear Search Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search input"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <HiXMark className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Add Contact Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpenAddModal}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:shadow-lg hover:brightness-105 active:brightness-95 transition-all whitespace-nowrap cursor-pointer"
      >
        <HiPlus className="w-5 h-5 stroke-[2.5]" />
        <span>Add Contact</span>
      </motion.button>
    </motion.div>
  );
}
