import translate from "$libs/helpers/tranlate.ts";
import IndexProductView from "$components/IndexProductView.tsx";
import { EmblaCarouselComponent } from "$islands/Carousel.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { TIndexProductView } from "$libs/types/index.ts";
interface Data {
    HotProducts: TIndexProductView[];
}
export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext) {
        // console.log(_ctx);
        const resp = await _ctx.render({
            "HotProducts": Array.from(Array(8).keys()).map((_, i) => {
                return {
                    id: i,
                    name: "Ten san pham",
                    price: 100000,
                    original_price: 300000,
                    featured_image: "/images/600x250.jpg",
                    link: `${_ctx.params.locale}/product/san-pham-${i}`,
                };
            }),
        });
        resp.headers.set("X-Custom-Header", "Hello World");
        return resp;
    },
};

export default function IndexPage(props: PageProps<Data>) {
    console.log('IndexPage', props);
    return (
        <div>
            <section className="container mx-auto px-4">
                <div
                    className={"section__section-body grid grid-cols-12 gap-4"}
                >
                    <div className="col-span-3">
                        Menu
                    </div>
                    <div className="col-span-6">
                        <EmblaCarouselComponent></EmblaCarouselComponent>
                    </div>
                    <div className="col-span-3">..</div>
                </div>
            </section>
            <section className={"container mx-auto px-4"}>
                <div className={"section__section-title"}>
                    <h3 className={"section__section-title__content"}>
                        {translate(
                            "index.body.sections.hotProduct.sectionTitle.text",
                        )}
                    </h3>
                </div>
                <div
                    className={"section__section-body grid grid-cols-4 gap-2 -mx-2"}
                >
                    {props.data.HotProducts.map((_, i) => {
                        return (
                            <IndexProductView
                                {..._}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
