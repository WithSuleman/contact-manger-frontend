import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineSparkles } from 'react-icons/hi2';

export default function Header({ isOffline }) {
  return (
    <header className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30 transition-colors">
      {/* Soft gradient accent line on top */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-purple-500 to-indigo-600" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Brand Lockup */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3.5"
          >
            {/* Logo Icon with gradient halo */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-orange-500 to-purple-600 opacity-60 blur-sm group-hover:opacity-100 transition duration-300" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-orange-500 flex items-center justify-center text-white shadow-md">
                <HiOutlineUserGroup className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Contact<span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Manager</span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Manage your contacts easily
              </p>
            </div>
          </motion.div>

          {/* Right Status Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                isOffline
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                }`}
              />
              <span className="hidden sm:inline">
                {isOffline ? 'Local Storage Cache' : 'MongoDB Atlas Connected'}
              </span>
              <span className="sm:hidden">{isOffline ? 'Offline' : 'Online'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
