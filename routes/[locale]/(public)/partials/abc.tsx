import { defineRoute, FreshContext } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
export default async function SlugPage(  req: Request, ctx: FreshContext) {
    await new Promise(resolve => setTimeout(resolve, 5000))
    return (
        <div>
            ABC partial
        </div>
    );
}
