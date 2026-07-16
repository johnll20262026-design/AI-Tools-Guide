/// <reference types="vite/client" />

interface ImportMeta {
  glob<T = unknown>(pattern: string, options?: { eager?: boolean; import?: string }): Record<string, T>;
  glob<T = unknown>(pattern: string): Record<string, () => Promise<T>>;
}

interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

interface IdleRequestOptions {
  timeout?: number;
}

declare function requestIdleCallback(
  callback: (deadline: IdleDeadline) => void,
  options?: IdleRequestOptions
): number;

declare function cancelIdleCallback(handle: number): void;
