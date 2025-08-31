import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
  "https://picsum.photos/800/400?random=4",
];

export function ProductCarousel() {
  // Carrossel principal
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  // Carrossel dos thumbnails
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    align: 'start',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Atualiza quando o slide muda
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    thumbApi?.scrollTo(emblaApi.selectedScrollSnap()); // move o thumbs junto
  }, [emblaApi, thumbApi]);

  // Vai para o slide ao clicar no thumb
  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="max-w-xl mx-auto space-y-4 shrink-0">
      {/* Carrossel Principal */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img src={src} alt={`Slide ${i}`} className="w-full min-h-52 md:min-h-64 object-cover rounded-2xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mx-auto max-w-80 md:mx-0 md:max-w-none overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2 px-2">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={`flex-[0_0_auto] w-20 h-16 rounded-md overflow-hidden border-2 transition flex-shrink-0
                ${i === selectedIndex ? "border-primary" : "border-transparent"}`}
            >
              <img src={src} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
