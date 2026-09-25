import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiOutlineUser, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';

export default function ContactModal({ isOpen, onClose, onSave, contactToEdit, isSubmitting }) {
  const isEditMode = Boolean(contactToEdit && contactToEdit._id);

  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Validation error states
  const [errors, setErrors] = useState({});

  // Reset or populate fields when modal opens or contact changes
  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name || '',
        email: contactToEdit.email || '',
        phone: contactToEdit.phone || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    }
    setErrors({});
  }, [contactToEdit, isOpen]);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation function
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Contact name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 5) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
          >
            {/* Top decorative gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600" />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isEditMode ? 'Update Contact' : 'Create New Contact'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isEditMode
                    ? 'Edit the details of this contact and save changes.'
                    : 'Fill in the information below to add a new contact.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                aria-label="Close modal"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Field: Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600">
                    <HiOutlineUser className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-purple-500/20 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Field: Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600">
                    <HiOutlineEnvelope className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@example.com"
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-purple-500/20 focus:border-purple-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Field: Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500">
                    <HiOutlinePhone className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 234-5678"
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-orange-500/20 focus:border-orange-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 shadow-md hover:shadow-lg hover:brightness-105 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting
                    ? isEditMode
                      ? 'Updating...'
                      : 'Saving...'
                    : isEditMode
                    ? 'Update Contact'
                    : 'Save Contact'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
