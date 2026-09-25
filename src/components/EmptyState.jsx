import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUserPlus, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function EmptyState({ isSearchActive, searchTerm, onAddContact, onClearSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center p-12 my-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-dashed border-slate-300 dark:border-slate-800 backdrop-blur-sm"
    >
      {/* Icon with soft gradient background circle */}
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500/10 via-purple-500/10 to-indigo-500/10 border border-purple-200/40 dark:border-purple-800/40 flex items-center justify-center shadow-inner">
          {isSearchActive ? (
            <HiOutlineMagnifyingGlass className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          ) : (
            <HiOutlineUserPlus className="w-10 h-10 text-orange-500" />
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {isSearchActive ? 'No contacts match your search' : 'No contacts found'}
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {isSearchActive
          ? `We couldn't find any contact matching "${searchTerm}". Try checking for typos or clear your search query.`
          : 'Add your first contact to get started.'}
      </p>

      <div className="mt-6 flex items-center gap-3">
        {isSearchActive ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAddContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <HiOutlineUserPlus className="w-4 h-4" />
            <span>Add Contact</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
