import { defineRoute, FreshContext } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
export default async function SlugPage(  req: Request, ctx: FreshContext) {
    const { slug } = ctx.params;
    return (
        <div>
            {slug}
        </div>
    );
}
