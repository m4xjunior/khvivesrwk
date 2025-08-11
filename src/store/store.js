


import create from 'zustand';

// Global store for application state management
const useStore = create((set) => ({
  // User authentication state
  user: null,
  token: localStorage.getItem('token') || null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    return set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    return set({ user: null, token: null });
  },
  
  // VIN selection state
  selectedVin: null,
  setSelectedVin: (vin) => set({ selectedVin: vin }),
  
  // UI theme state with localStorage persistence
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    localStorage.setItem('darkMode', newMode);
    return { darkMode: newMode };
  }),
}));

export default useStore;


