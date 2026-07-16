/// <reference types="vite/client" />

interface ImportMeta {
  glob<T = unknown>(pattern: string, options?: { eager?: boolean; import?: string }): Record<string, T>;
  glob<T = unknown>(pattern: string): Record<string, () => Promise<T>>;
}
