import { useEffect, useRef } from "preact/compat";
import EmblaCarousel, { EmblaCarouselType, EmblaPluginType } from "npm:embla-carousel";
import Autoplay from "npm:embla-carousel-autoplay";
import { BiLeftArrow, BiRightArrow } from "@preact-icons/bi";
import { Head } from "$fresh/runtime.ts";
import { setupTweenOpacity } from "$islands/Galleries/TweenOpacity.ts";
import { addDotBtnsAndClickHandlers } from "$islands/Galleries/DotButton.ts";
import { addPrevNextBtnsClickHandlers } from "$islands/Galleries/ArrowButton.ts";

export function GalleriesComponent() {
    const galleriesNodeRef = useRef<HTMLDivElement>(null);
    const viewportNodeRef = useRef<HTMLDivElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const dotsNodeRef = useRef<HTMLDivElement>(null);
    const galleriesInstance = useRef<EmblaCarouselType | null>(null);
    useEffect(() => {
        if (galleriesNodeRef.current) {
            const options = { loop: true };
            const plugins = [
                // Autoplay()
            ] as EmblaPluginType[];
            galleriesInstance.current = EmblaCarousel(
                viewportNodeRef.current!,
                options,
                plugins,
            );
            const removeTweenOpacity = setupTweenOpacity(
                galleriesInstance.current,
            );

            const removePrevNextBtnsClickHandlers =
                addPrevNextBtnsClickHandlers(
                    galleriesInstance.current,
                    prevBtnRef.current!,
                    nextBtnRef.current!,
                );
            const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
                galleriesInstance.current,
                dotsNodeRef.current!,
            );

            galleriesInstance.current
                .on("destroy", removeTweenOpacity)
                .on("destroy", removePrevNextBtnsClickHandlers)
                .on("destroy", removeDotBtnsAndClickHandlers);

            console.log(galleriesInstance.current.slideNodes());
        }
        return () => {
            galleriesInstance.current?.destroy();
            galleriesInstance.current = null;
        };
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/galleries.css" />
            </Head>
            <div class="galleries" ref={galleriesNodeRef}>
                <div class="galleries__viewport" ref={viewportNodeRef}>
                    <div class="galleries__container">
                        {Array.from(Array(10).keys()).map((i) => {
                            return (
                                <div class="galleries__slide">
                                    <img
                                        class="galleries__slide__img"
                                        src={"https://picsum.photos/600/350?v=" +
                                            i}
                                        alt="Your alt text"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div class="galleries__controls">
                    <div class="galleries__buttons">
                        <button
                            class="galleries__button galleries__button--prev"
                            type="button"
                            disabled
                            ref={prevBtnRef}
                        >
                            <BiLeftArrow />
                        </button>
                        <button
                            class="galleries__button galleries__button--next"
                            type="button"
                            disabled
                            ref={nextBtnRef}
                        >
                            <BiRightArrow />
                        </button>
                    </div>
                    <div class="galleries__dots" ref={dotsNodeRef}></div>
                </div>
            </div>
        </>
    );
}
