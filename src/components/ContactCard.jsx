import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

// Array of vibrant modern gradients for avatars
const AVATAR_GRADIENTS = [
  'from-orange-500 to-amber-500',
  'from-purple-600 to-indigo-600',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-fuchsia-600',
];

// Pick a gradient deterministically based on contact name
function getAvatarGradient(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

export default function ContactCard({ contact, index, onEdit, onDelete, isDeleting }) {
  const initial = contact.name ? contact.name.trim().charAt(0).toUpperCase() : '?';
  const gradient = getAvatarGradient(contact.name);

  // Format date if present
  const formattedDate = contact.createdAt
    ? new Date(contact.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
    >
      <div>
        {/* Top Header Row with Avatar & Quick Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Avatar Circle */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0`}
            >
              {initial}
            </div>

            {/* Name and Date */}
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                {contact.name}
              </h3>
              {formattedDate && (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Added {formattedDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2.5">
          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group/item truncate"
            title={contact.email}
          >
            <HiOutlineEnvelope className="w-4 h-4 text-slate-400 group-hover/item:text-purple-600 flex-shrink-0" />
            <span className="truncate">{contact.email}</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/item truncate"
            title={contact.phone}
          >
            <HiOutlinePhone className="w-4 h-4 text-slate-400 group-hover/item:text-orange-600 flex-shrink-0" />
            <span className="truncate font-mono tabular-nums">{contact.phone}</span>
          </a>
        </div>
      </div>

      {/* Action Buttons: Edit and Delete */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(contact)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer"
        >
          <HiOutlinePencilSquare className="w-4 h-4" />
          <span>Edit</span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isDeleting}
          onClick={() => onDelete(contact._id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <HiOutlineTrash className="w-4 h-4" />
          <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
