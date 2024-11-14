import { FreshContext } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";

export default async function Layout(req: Request, ctx: FreshContext) {
    console.log("layout");
    return (
        <div class="layout">
            layout
            <ctx.Component />
        </div>
    );
}
