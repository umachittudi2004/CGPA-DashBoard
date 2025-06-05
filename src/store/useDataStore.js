// src/store/dataStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parseRollNo } from "../utlities/parseRollNo";

export const dataStore = create(
  (set, get) => ({
    data: [],
    setData: (rawData) => {
      const enhanced = rawData.map((item) => {
         const roll = item['Roll.No']?.toString() || '';
        const parsed = parseRollNo(roll);
        return { ...item, ...parsed };
      });
      set({ data: enhanced });
    },
    clearData: () => set({ data: [] }),
  })
);
