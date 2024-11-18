import { useEffect, useRef } from "preact/compat";
import EmblaCarousel, { EmblaCarouselType } from "npm:embla-carousel";
import Autoplay from "npm:embla-carousel-autoplay";

export function EmblaCarouselComponent() {
    const emblaRef = useRef<HTMLDivElement>(null);
    const emblaInstance = useRef<EmblaCarouselType | null>(null);
    useEffect(() => {
        if (emblaRef.current) {
            const options = { loop: false };
            const plugins = [Autoplay()];
            emblaInstance.current = EmblaCarousel(emblaRef.current, options, plugins);

            console.log(emblaInstance.current.slideNodes());
        }
        return () => {
            emblaInstance.current?.destroy();
            emblaInstance.current = null;
        };
    }, []);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">Slide 1</div>
                <div className="embla__slide">Slide 2</div>
                <div className="embla__slide">Slide 3</div>
            </div>
        </div>
    );
}
