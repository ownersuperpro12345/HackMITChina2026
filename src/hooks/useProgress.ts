import { useState, useCallback } from "react";

const STORAGE_KEY = "stella-progress-v2";

export interface ProgressData {
  [subtopicId: string]: number;
}

export function useProgress() {
  const [refresh, setRefresh] = useState(0);

  const forceRefresh = useCallback(() => setRefresh((n) => n + 1), []);

  const getAll = useCallback((): ProgressData => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }, []);

  const getSubtopicProgress = useCallback(
    (subtopicId: string): number => {
      return getAll()[subtopicId] ?? 0;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAll, refresh]
  );

  const getTopicProgress = useCallback(
    (subtopicIds: string[]): number => {
      if (subtopicIds.length === 0) return 0;
      const all = getAll();
      const total = subtopicIds.reduce((sum, id) => sum + (all[id] ?? 0), 0);
      return Math.round(total / subtopicIds.length);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAll, refresh]
  );

  const setSubtopicProgress = useCallback(
    (subtopicId: string, value: number) => {
      const all = getAll();
      const clamped = Math.min(100, Math.max(0, Math.round(value)));
      all[subtopicId] = clamped;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      forceRefresh();
    },
    [getAll, forceRefresh]
  );

  const isUnlocked = useCallback(
    (requiresId: string | null): boolean => {
      if (!requiresId) return true;
      return (getAll()[requiresId] ?? 0) >= 80;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAll, refresh]
  );

  const isCompleted = useCallback(
    (subtopicId: string): boolean => {
      return (getAll()[subtopicId] ?? 0) >= 100;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getAll, refresh]
  );

  return {
    getSubtopicProgress,
    getTopicProgress,
    setSubtopicProgress,
    isUnlocked,
    isCompleted,
    forceRefresh,
  };
}
