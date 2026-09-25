import axios from 'axios';

// Get backend API base URL from environment variable
// In Vite, environment variables must start with VITE_
const API_URL = import.meta.env.VITE_API_URL || "https://contact-manager-backend-plum.vercel.app/";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000, // 8 second timeout
});

// Local storage key for fallback / demo preview mode when backend server is offline
const LOCAL_STORAGE_KEY = 'contact_manager_offline_cache';

// Starter demo data if database is empty or offline
const INITIAL_DEMO_CONTACTS = [
  {
    _id: 'demo-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.org',
    phone: '+1 (555) 234-5678',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: 'demo-2',
    name: 'Alexander Wright',
    email: 'alex.wright@quantumlabs.io',
    phone: '+1 (555) 876-5432',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    _id: 'demo-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@designcraft.co',
    phone: '+1 (555) 345-9876',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
];

// Helper to get cached offline contacts
const getOfflineContacts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_CONTACTS));
      return INITIAL_DEMO_CONTACTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_CONTACTS;
  }
};

// Helper to save cached offline contacts
const saveOfflineContacts = (contacts) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
};

// 1. GET ALL CONTACTS
export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    // Save fresh data into offline cache
    saveOfflineContacts(response.data);
    return { data: response.data, isOffline: false };
  } catch (error) {
    console.warn('Backend server not reached. Falling back to local storage cache:', error.message);
    const cached = getOfflineContacts();
    return { data: cached, isOffline: true, error: error.message };
  }
};

// 2. CREATE A NEW CONTACT
export const createContact = async (contactData) => {
  try {
    const response = await api.post('/contacts', contactData);
    return { data: response.data, isOffline: false };
  } catch (error) {
    console.warn('Backend server not reached. Saving to local storage cache:', error.message);
    const cached = getOfflineContacts();
    const newContact = {
      ...contactData,
      _id: 'local-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newContact, ...cached];
    saveOfflineContacts(updated);
    return { data: newContact, isOffline: true };
  }
};

// 3. UPDATE AN EXISTING CONTACT
export const updateContact = async (id, contactData) => {
  try {
    const response = await api.put(`/contacts/${id}`, contactData);
    return { data: response.data, isOffline: false };
  } catch (error) {
    console.warn('Backend server not reached. Updating in local storage cache:', error.message);
    const cached = getOfflineContacts();
    let updatedContact = null;
    const updatedList = cached.map((item) => {
      if (item._id === id) {
        updatedContact = { ...item, ...contactData };
        return updatedContact;
      }
      return item;
    });
    saveOfflineContacts(updatedList);
    return { data: updatedContact || { _id: id, ...contactData }, isOffline: true };
  }
};

// 4. DELETE A CONTACT
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return { data: response.data, isOffline: false };
  } catch (error) {
    console.warn('Backend server not reached. Deleting from local storage cache:', error.message);
    const cached = getOfflineContacts();
    const updatedList = cached.filter((item) => item._id !== id);
    saveOfflineContacts(updatedList);
    return { data: { message: 'Deleted locally', id }, isOffline: true };
  }
};

export default {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
