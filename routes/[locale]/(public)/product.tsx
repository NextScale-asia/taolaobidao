import {
    FreshContext,
    Handlers,
    type PageProps,
    RouteConfig,
} from "$fresh/server.ts";
import translate from "$libs/helpers/tranlate.ts";
import { TProductView } from "$libs/types/TProductView.ts";
import ProductDiscountBadge from "$components/elements/ProductDiscountBadge.tsx";

interface Data {
    Product: TProductView;
}
export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext) {
        // console.log(_ctx);
        const product_id = Number(_ctx.params.slug.replace("san-pham-", ""));
        const prodcut_data: TProductView = {
            id: product_id,
            name: `Ten san pham ${product_id}`,
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
                items: Array.from(Array(10).keys()).map(
                    (_, i): TProductView["variations"][0]["items"][0] => {
                        return {
                            id: Math.floor(product_id / 10) + i,
                            name:
                                `Bien the ${i} cua san pham ${_ctx.params.slug}`,
                            disabled: Math.random() < 0.2,
                            link: `${_ctx.params.locale}/product/san-pham-${
                                Math.floor(product_id / 10) + i
                            }`,
                            current:
                                product_id == Math.floor(product_id / 10) + i,
                        };
                    },
                ),
            }],
        };
        const resp = await _ctx.render({
            "Product": prodcut_data,
        });
        resp.headers.set("X-Custom-Header", "Hello World");
        return resp;
    },
};

export const config: RouteConfig = {
    routeOverride: "/:locale?/product/:slug",
};

export default function ProductPage(props: PageProps<Data>) {
    const prodcut_data = props.data.Product;
    return (
        <section
            className={"product-summary container mx-auto grid grid-cols-8 gap-4"}
        >
            <div className="product-summary__product-galleries col-span-3">
                Galleries
            </div>
            <div className="product-summary__product-details col-span-3">
                <h1>
                    {prodcut_data.name}
                </h1>
                <div>
                    <strong>
                        {translate(
                            "product.productSummary.productDetails.state.label",
                        )}
                    </strong>
                    <span>{prodcut_data.inventory_state}</span>
                </div>
                <div>
                    <strong>
                        {translate(
                            "product.productSummary.productDetails.sku.label",
                        )}
                    </strong>
                    <span>{prodcut_data.sku}</span>
                </div>
                <div>
                    <strong>
                        {translate(
                            "product.productSummary.productDetails.tags.label",
                        )}
                    </strong>
                    <span>,,,</span>
                </div>
                <div>
                    <div className={"font-bold text-black text-xl"}>
                        {prodcut_data.price}
                    </div>
                </div>
                <div>
                    {(() => {
                        if (prodcut_data.price != prodcut_data.original_price) {
                            const discounted = prodcut_data.original_price - prodcut_data.price;
                            const discounted_rate = discounted / prodcut_data.original_price;
                            const discounted_percent = Math.floor(discounted_rate * 100);
                            console.log(discounted_percent)
                            return (
                                <div
                                    className={"font-bold text-gray-400 text-xl line-through"}
                                >
                                    {prodcut_data.original_price}
                                    <ProductDiscountBadge
                                        discounted_percent={discounted_percent}
                                    />
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>
            <div className="prodcut-summary__product-extra-infos col-span-2">
                Extra infos
            </div>
        </section>
    );
}
