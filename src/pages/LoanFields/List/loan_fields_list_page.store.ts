import { create } from "zustand";

type LoanFieldsListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useLoanFieldsListPageStore = create<LoanFieldsListPageState>(
  (set, get) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
