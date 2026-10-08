// Mock for the 'server-only' package in vitest / jsdom environments.
// The real package throws if imported outside a React Server Component context.
// This stub lets unit tests import modules that use 'server-only' without
// triggering that guard.
export {}
