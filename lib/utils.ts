import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function submitContactForm(
  data: any
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 10% failure rate
      if (Math.random() < 0.1) {
        resolve({
          success: false,
          message: "Network error. Please try again.",
        });
      } else {
        resolve({ success: true, message: "Message sent successfully!" });
      }
    }, 1500);
  });
}
