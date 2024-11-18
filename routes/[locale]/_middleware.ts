import { FreshContext, RouteConfig } from "$fresh/server.ts";

interface State {
  locale: string;
}

export const config: RouteConfig = {
  routeOverride: "/:locale?*",
};
export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  console.log('locale', ctx.params.locale)
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}