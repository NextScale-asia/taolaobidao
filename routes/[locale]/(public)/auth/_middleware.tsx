import { FreshContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  ctx.state.data = "myDataa";
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}