import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import EmptyState from './components/EmptyState';
import contactService from './services/contactService';

export default function App() {
  // State management
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // 1. Fetch contacts on component mount
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await contactService.getContacts();
      setContacts(res.data || []);
      setIsOffline(Boolean(res.isOffline));
    } catch (err) {
      console.error('Failed to load contacts:', err);
      toast.error('Something went wrong while loading contacts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 2. Filter contacts based on search input (instant filtering)
  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter((c) => {
      const nameMatch = c.name?.toLowerCase().includes(term);
      const emailMatch = c.email?.toLowerCase().includes(term);
      const phoneMatch = c.phone?.toLowerCase().includes(term);
      return nameMatch || emailMatch || phoneMatch;
    });
  }, [contacts, searchTerm]);

  // 3. Open Modal for Adding a New Contact
  const handleOpenAddModal = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  // 4. Open Modal for Editing an Existing Contact
  const handleOpenEditModal = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  // 5. Close Modal
  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingContact(null);
  };

  // 6. Handle Save (Create or Update)
  const handleSaveContact = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (editingContact && editingContact._id) {
        // UPDATE Existing Contact
        const res = await contactService.updateContact(editingContact._id, formData);
        setContacts((prev) =>
          prev.map((item) => (item._id === editingContact._id ? res.data : item))
        );
        toast.success('Contact updated successfully!');
      } else {
        // CREATE New Contact
        const res = await contactService.createContact(formData);
        setContacts((prev) => [res.data, ...prev]);
        toast.success('Contact added successfully!');
      }

      setIsModalOpen(false);
      setEditingContact(null);
    } catch (err) {
      console.error('Error saving contact:', err);
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Handle Delete Contact
  const handleDeleteContact = async (id) => {
    if (deletingId) return; // Prevent duplicate requests
    setDeletingId(id);

    try {
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((item) => item._id !== id));
      toast.success('Contact deleted successfully!');
    } catch (err) {
      console.error('Error deleting contact:', err);
      toast.error('Something went wrong.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <Header isOffline={isOffline} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero & Stats Section */}
        <Stats totalContacts={contacts.length} activeContacts={contacts.length} />

        {/* Search & Actions Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenAddModal={handleOpenAddModal}
        />

        {/* Contacts View Container */}
        {loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
            <p className="text-sm text-slate-500 font-medium">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          // Empty State (either no contacts at all or no match from search)
          <EmptyState
            isSearchActive={Boolean(searchTerm.trim())}
            searchTerm={searchTerm}
            onAddContact={handleOpenAddModal}
            onClearSearch={() => setSearchTerm('')}
          />
        ) : (
          // Populated Contact Grid
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Directory · {filteredContacts.length} {filteredContacts.length === 1 ? 'Contact' : 'Contacts'}
              </span>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredContacts.map((contact, index) => (
                  <ContactCard
                    key={contact._id || index}
                    contact={contact}
                    index={index}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteContact}
                    isDeleting={deletingId === contact._id}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </main>

      {/* Add / Edit Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveContact}
        contactToEdit={editingContact}
        isSubmitting={isSubmitting}
      />

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
        <p>Contact Manager · Designed for seamless contact organization</p>
      </footer>
    </div>
  );
}
