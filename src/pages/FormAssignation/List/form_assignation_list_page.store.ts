import { create } from "zustand";

type FormAssignationsListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useFormAssignationsListPageStore =
  create<FormAssignationsListPageState>((set, get) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  }));
