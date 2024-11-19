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
import InstantBuyBtn from "$components/elements/InstantBuyBtn.tsx";
import AddToCartBtn from "$components/elements/AddToCartBtn.tsx";

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
                        console.log(product_id, Math.floor(product_id / 10)*10 + i,product_id == Math.floor(product_id / 10)*10 + i)
                        return {
                            id: Math.floor(product_id / 10) + i,
                            name:
                                `Bien the ${i} cua san pham ${Math.floor(product_id / 10)}`,
                            disabled: Math.random() < 0.2,
                            link: `/${_ctx.params.locale}/product/san-pham-${
                                Math.floor(product_id / 10)*10 + i
                            }`,
                            current:
                                product_id == Math.floor(product_id / 10)*10 + i,
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
    return (<div>
        <section
            className={"container mx-auto grid grid-cols-8 gap-4"}
        >
            <div className="product-galleries col-span-3">
                Galleries
            </div>
            <div className="product-summary col-span-3">
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
                    if (product_data.price != product_data.original_price) {
                        const discounted = product_data.original_price -
                            product_data.price;
                        const discounted_rate = discounted /
                            product_data.original_price;
                        const discounted_percent = Math.floor(
                            discounted_rate * 100,
                        );
                        console.log(discounted_percent);
                        return (
                            <div className={"flex flex-row gap-1 items-center"}>
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
                        return product_data.variations.map(variation_group => {
                            return <ProductVariationsCloud variation={variation_group}/>
                        })
                    }
                })()}
                <div className={"flex flex-row gap-2 mt-2 pt-2 border-t border-gray-200"}>
                    <InstantBuyBtn product_id={1}/>
                    <AddToCartBtn product_id={1}/>
                </div>
            </div>
            <div className="product-banners col-span-2">
                Extra infos
            </div>
        </section>
        <section className={"product-tabs"}>

        </section>
        </div>);
}
