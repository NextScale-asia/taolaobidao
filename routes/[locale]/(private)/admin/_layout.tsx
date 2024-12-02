import { FreshContext } from "$fresh/server.ts";
import { lazy, Suspense } from "preact/compat";
import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default async function Layout(req: Request, ctx: FreshContext) {
    console.log("layout");
    return (
        <div class="layout bg-slate-100" f-client-nav>
                <Partial name="body">
                    <ctx.Component />
                </Partial>
        </div>
    );
}
