import {
    FreshContext,
    Handlers,
    type PageProps,
    RouteConfig,
} from "$fresh/server.ts";
import translate from "$libs/helpers/tranlate.ts";
import { TProductView } from "$libs/types/TProductView.ts";
import ProductDiscountBadge from "$components/elements/ProductDiscountBadge.tsx";
import ProductVariationsCloud from "$components/elements/ProductVariationsCloud.tsx";
import { GalleriesComponent } from "$islands/Galleries/index.tsx";
import ProductBuyActionsBlock from "$islands/ProductBuyActionsBlock/index.tsx";
import ProductReview from "$components/elements/ProductReview.tsx";
import ProductReviewsSummary from '$components/elements/ProductReviewsSummary.tsx';

interface Data {
    Product: TProductView;
}
export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext) {
        // console.log(_ctx);
        const product_id = Number(_ctx.params.slug.replace("san-pham-", ""));
        const product_data: TProductView = {
            id: product_id,
            name: `Ten san pham ${Math.floor(product_id / 10)}`,
            price: 100000,
            original_price: 300000,
            featured_image: "/images/600x250.jpg",
            link: `${_ctx.params.locale}/product/${_ctx.params.slug}`,
            inventory_state: 2,
            product_state: 2,
            sku: "prodcut-sku-" + product_id,
            variations: [{
                id: 1,
                name: "Nhom bien the 1",
                items: Array.from(Array(4).keys()).map(
                    (_, i): TProductView["variations"][0]["items"][0] => {
                        console.log(
                            product_id,
                            Math.floor(product_id / 10) * 10 + i,
                            product_id == Math.floor(product_id / 10) * 10 + i,
                        );
                        return {
                            id: Math.floor(product_id / 10) + i,
                            name: `Bien the ${i} cua san pham ${
                                Math.floor(product_id / 10)
                            }`,
                            disabled: Math.random() < 0.2,
                            link: `/${_ctx.params.locale}/product/san-pham-${
                                Math.floor(product_id / 10) * 10 + i
                            }`,
                            current: product_id ==
                                Math.floor(product_id / 10) * 10 + i,
                        };
                    },
                ),
            }],
        };
        const resp = await _ctx.render({
            "Product": product_data,
        });
        resp.headers.set("X-Custom-Header", "Hello World");
        return resp;
    },
};

export const config: RouteConfig = {
    routeOverride: "/:locale?/product/:slug",
};

export default function ProductPage(props: PageProps<Data>) {
    const product_data = props.data.Product;
    return (
        <div>
            <section
                className={"container mx-auto grid grid-cols-8 gap-4"}
            >
                <div className="col-span-6 grid grid-cols-9 gap-4">
                    <div className="col-span-4">
                        <div className="block product-galleries">
                            <GalleriesComponent />
                        </div>
                    </div>
                    <div className="product-details col-span-5 grid grid-cols-1 gap-4">
                        <div className="block product-summary">
                            <h1 className={"font-bold text-xl"}>
                                {product_data.name}
                            </h1>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <strong>
                                    {translate(
                                        "product.productSummary.state.label",
                                    )}:
                                </strong>
                                <span>{product_data.inventory_state}</span>
                            </div>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <strong>
                                    {translate(
                                        "product.productSummary.sku.label",
                                    )}:
                                </strong>
                                <span>{product_data.sku}</span>
                            </div>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <strong>
                                    {translate(
                                        "product.productSummary.tags.label",
                                    )}:
                                </strong>
                                <span>,,,</span>
                            </div>
                            <div>
                                <div className={"font-bold text-black text-xl"}>
                                    {product_data.price}
                                </div>
                            </div>
                            {(() => {
                                if (
                                    product_data.price !=
                                        product_data.original_price
                                ) {
                                    const discounted =
                                        product_data.original_price -
                                        product_data.price;
                                    const discounted_rate = discounted /
                                        product_data.original_price;
                                    const discounted_percent = Math.floor(
                                        discounted_rate * 100,
                                    );
                                    console.log(discounted_percent);
                                    return (
                                        <div
                                            className={"flex flex-row gap-1 items-center"}
                                        >
                                            <span
                                                className={"font-bold text-gray-400 text-xl line-through"}
                                            >
                                                {product_data.original_price}
                                            </span>
                                            <ProductDiscountBadge
                                                discounted_percent={discounted_percent}
                                            />
                                        </div>
                                    );
                                }
                            })()}
                            {(() => {
                                if (product_data.variations.length) {
                                    return product_data.variations.map(
                                        (variation_group) => {
                                            return (
                                                <ProductVariationsCloud
                                                    variation={variation_group}
                                                />
                                            );
                                        },
                                    );
                                }
                            })()}
                        </div>
                        <div className={"block product-detailed-information"}>
                            <div class={"block__title"}>
                                {translate(
                                    "product.productDetailedInformations.blockTitle",
                                )}
                            </div>
                        </div>
                        <div className={"block product-detailed-information"}>
                            <div class={"block__title"}>
                                {translate(
                                    "product.productDescription.blockTitle",
                                )}
                            </div>
                            <div className="block__content">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa magnam, id rem
                                    voluptates inventore aspernatur asperiores
                                    officiis dignissimos assumenda perferendis
                                    odio. Suscipit hic accusamus natus aut nisi
                                    obcaecati! Accusamus dolores, quod deleniti
                                    consectetur eaque nostrum velit nisi
                                    sapiente enim vero unde eum tempore
                                    temporibus quia, cum blanditiis molestias,
                                    suscipit tenetur?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa magnam, id rem
                                    voluptates inventore aspernatur asperiores
                                    officiis dignissimos assumenda perferendis
                                    odio. Suscipit hic accusamus natus aut nisi
                                    obcaecati! Accusamus dolores, quod deleniti
                                    consectetur eaque nostrum velit nisi
                                    sapiente enim vero unde eum tempore
                                    temporibus quia, cum blanditiis molestias,
                                    suscipit tenetur?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa magnam, id rem
                                    voluptates inventore aspernatur asperiores
                                    officiis dignissimos assumenda perferendis
                                    odio. Suscipit hic accusamus natus aut nisi
                                    obcaecati! Accusamus dolores, quod deleniti
                                    consectetur eaque nostrum velit nisi
                                    sapiente enim vero unde eum tempore
                                    temporibus quia, cum blanditiis molestias,
                                    suscipit tenetur?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ipsa magnam, id rem
                                    voluptates inventore aspernatur asperiores
                                    officiis dignissimos assumenda perferendis
                                    odio. Suscipit hic accusamus natus aut nisi
                                    obcaecati! Accusamus dolores, quod deleniti
                                    consectetur eaque nostrum velit nisi
                                    sapiente enim vero unde eum tempore
                                    temporibus quia, cum blanditiis molestias,
                                    suscipit tenetur?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-9">
                        <div className="block customer-reviews">
                            <div className="block__title">
                                {translate(
                                    "product.customerReviews.blockTitle",
                                )}
                            </div>
                            <div className="block__content">
                                <ProductReviewsSummary />
                                <div className="reviews">
                                    <ProductReview />
                                    <ProductReview />
                                    <ProductReview />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="block buy-actions">
                        <div className="block__title">
                            {translate("product.buyActions.blockTitle")}
                        </div>
                        <div className="block__content">
                            <ProductBuyActionsBlock
                                {...{
                                    id: product_data.id,
                                    inventory_quality: 999,
                                    name: product_data.name,
                                    original_price: product_data.original_price,
                                    price: product_data.price,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
