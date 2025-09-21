import { Star } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface RatingStarsProps extends HtmlHTMLAttributes<HTMLDivElement> {
    rating: number, 
}

export function RatingStars({rating, ...props}: RatingStarsProps) {
    const maxStars = 5;

    const safeRating = Math.max(0, Math.min(rating, maxStars));
    
    const fullStars = Math.floor(safeRating); // estrelas cheias
    const halfStar = safeRating % 1 >= 0.5 ? 1 : 0; // estrela pela metade
    const emptyStars = maxStars - fullStars - halfStar; // estrelas vazias

    return (
        <div className="flex items-center justify-center gap-1 text-yellow-500" {...props}>
            {Array(fullStars > 0 ? fullStars : 0)
                .fill(0)
                .map((_, i) => (
                    <Star 
                        key={`full-${i}`} 
                        className="fill-yellow-500"
                    />
                )
            )}

            {halfStar === 1 && (
                <Star
                    key="half"
                    className="fill-yellow-500 stroke-yellow-500 halfStar"
                />
            )}

            {Array(emptyStars > 0 ? emptyStars : 0)
                .fill(0)
                .map((_, i) => (
                    <Star 
                        key={`empty-${i}`}
                        className="fill-none"
                    />
                )
            )}
        </div>
    );
}