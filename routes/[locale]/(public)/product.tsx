import { RouteConfig, type PageProps } from "$fresh/server.ts";
import translate from "$libs/helpers/tranlate.ts";

export const config: RouteConfig = {
    routeOverride: "/:locale?/product/:slug",
};

export default function ProductPage(props: PageProps) {
    return (
        <div>
            
            Product {props.params.slug}
        </div>
    );
}
