import { create } from "zustand";

type LoanFormsListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useLoanFormsListPageStore = create<LoanFormsListPageState>(
  (set, get) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
