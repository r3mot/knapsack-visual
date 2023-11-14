import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gridSize(size: number) {
  switch (size) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    case 11:
      return "grid-cols-11";
    case 12:
      return "grid-cols-12";
  }
}

/**
 * Thanks chat GPT for doing the boring stuff for me
 * @returns {rWeights: number[], rValues: number[], rCapacity: number}
 */
export function randomData() {
  const length = Math.floor(Math.random() * 5) + 3; // Random length between 1 and 5
  const weights = [];
  const values = [];

  // Generate random weights
  for (let i = 0; i < length; i++) {
    weights.push(Math.floor(Math.random() * 5) + 3); // Random weight between 1 and 5
  }

  // Generate random values based on weights and capacity
  const capacity = Math.floor(Math.random() * 6) + 5;

  for (let i = 0; i < length; i++) {
    // Ensure values are meaningful for the given capacity
    const maxValue = Math.min(capacity, weights[i] * 5); // Adjust the multiplier as needed
    values.push(Math.floor(Math.random() * maxValue) + 3); // Random value between 1 and maxValue
  }

  return { weights, values, capacity };
}
