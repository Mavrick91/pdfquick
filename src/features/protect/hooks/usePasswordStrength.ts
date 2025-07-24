"use client";

import { useMemo } from "react";
import zxcvbn from "zxcvbn";

type PasswordStrength = {
  score: number; // 0-4
  label: string;
  color: string;
  percentage: number;
};

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: "",
        color: "gray.300",
        percentage: 0,
      };
    }

    const result = zxcvbn(password);
    const { score } = result;

    const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = ["red.500", "orange.500", "yellow.500", "green.500", "green.600"];

    return {
      score,
      label: labels[score],
      color: colors[score],
      percentage: (score + 1) * 20, // Convert 0-4 to 0-100
    };
  }, [password]);
};
