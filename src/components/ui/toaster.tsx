"use client";

export const Toaster = () => {
  return null; // Chakra UI v3 handles toasts differently
};

export const toaster = {
  success: (options: { title: string; description?: string }) => {
    if (typeof window !== "undefined") {
      console.log("[Toast Success]", options);
    }
  },
  error: (options: { title: string; description?: string }) => {
    if (typeof window !== "undefined") {
      console.log("[Toast Error]", options);
    }
  },
  info: (options: { title: string; description?: string }) => {
    if (typeof window !== "undefined") {
      console.log("[Toast Info]", options);
    }
  },
};
