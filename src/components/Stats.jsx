import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineCheckBadge } from 'react-icons/hi2';

// Simple animated counter for smooth number transition
function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (target - start) / steps;

    if (target === 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += increment;
      if ((increment >= 0 && start >= target) || (increment < 0 && start <= target)) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span className="tabular-nums font-bold tracking-tight">{count}</span>;
}

export default function Stats({ totalContacts, activeContacts }) {
  const stats = [
    {
      title: 'TOTAL CONTACTS',
      value: totalContacts,
      label: 'All registered entries in directory',
      icon: HiOutlineUsers,
      gradient: 'from-orange-500 to-amber-500',
      badgeBg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/60',
    },
    {
      title: 'ACTIVE CONTACTS',
      value: activeContacts,
      label: 'Verified & directly reachable',
      icon: HiOutlineCheckBadge,
      gradient: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-8">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Top subtle gradient hairline */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl text-slate-900 dark:text-white">
                    <Counter target={item.value} />
                  </span>
                  <span className="text-xs text-slate-400">contacts</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${item.badgeBg}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
