import { FreshContext } from "$fresh/server.ts";

interface State {
  locale: string;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  console.log(ctx.params.locale)
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}