import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (photo: string | null | undefined) => {
  if (!photo) return undefined;
  if (photo.startsWith("http")) return photo;
  return `http://192.168.18.36:3000/uploads/${photo}`;
};

// Fungsi pembantu untuk memformat waktu lampau (time ago)
export function formatTimeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;

  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
}

export function getQuickInsight(metriks: any) {
  if (!metriks?.likes || !metriks?.replies)
    return "Calculating your metrics...";

  const likesGrowth = parseFloat(metriks.likes.growth || "0");
  const repliesGrowth = parseFloat(metriks.replies.growth || "0");

  const average = (likesGrowth + repliesGrowth) / 2;

  if (average > 0) {
    return `Your engagement is up ${average.toFixed(1)}% this week!`;
  } else if (average < 0) {
    return `Your engagement is down ${Math.abs(average).toFixed(1)}% this week!`;
  } else {
    return "Your engagement is stable this week!";
  }
}
