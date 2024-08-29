// To use Chakra UI in server components, you need to convert them into client-side component by adding a 'use client'; at the top of your file.

// We've also provided a @chakra-ui/next-js package that gives you a smoother experience when using Chakra UI in the app directory.

// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
