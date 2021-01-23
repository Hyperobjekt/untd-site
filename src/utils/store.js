import create from 'zustand'

export const useStore = create(set => ({
  // Set any store values by passing in an object of values to merge.
  setStoreValues: obj => set({ ...obj }),
  // Is the slideout nav menu displayed? Boolean.
  showMenu: false,
  // Toggles showMenu.
  toggleShowMenu: val => set(state => ({ showMenu: !state.showMenu })),
}))
