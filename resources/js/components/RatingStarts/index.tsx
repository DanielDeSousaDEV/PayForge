import { Star } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface RatingStarsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({ rating, size = "md", ...props }: RatingStarsProps) {
  const maxStars = 5;
  const safeRating = Math.max(0, Math.min(rating, maxStars));

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStar;

  const sizeMap: Record<string, string> = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center justify-center gap-1 text-yellow-500" {...props}>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${sizeMap[size]} fill-yellow-500 stroke-yellow-500`}
          />
        ))}

      {halfStar === 1 && (
        <Star
          key="half"
          className={`${sizeMap[size]} fill-yellow-500 stroke-yellow-500 halfStar`}
        />
      )}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${sizeMap[size]} fill-none stroke-yellow-500`}
          />
        ))}
    </div>
  );
}
