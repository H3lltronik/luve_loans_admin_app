import { create } from "zustand";

type ClientsListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useClientsListPageStore = create<ClientsListPageState>(
  (set, get) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
