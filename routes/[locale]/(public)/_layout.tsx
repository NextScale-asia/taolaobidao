import { FreshContext } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Footer from "./_footer.tsx";
import Header from "./_header.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
    console.log("layout");
    return (
        <div class="layout" f-client-nav>
            <Header />
            <a href="/vi_VN/">Index</a>
            <a href="/vi_VN/abc">ABC</a>
            <a href="/vi_VN/def">DEF</a>
            <Partial name="body">
                <ctx.Component />
            </Partial>
            <Footer />
        </div>
    );
}
