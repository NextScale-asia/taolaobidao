

import { FreshContext, RouteConfig } from "$fresh/server.ts";
import * as mod from "node:crypto";



export async function handler(
    req: Request,
    ctx: FreshContext,
  ) {
    localStorage.setItem("myDemo", "Deno App");
    const cookieString = req.headers.get("cookie")
    const cookies = cookieString?.split(";").map(cookieKeyValue => cookieKeyValue.trim().split("="))
    console.log(cookies)
    

    const resp = await ctx.next();
    // console.log(resp.headers.getSetCookie())
    // Session        Set-Cookie: sessionId=38afes7a8
    // Cookie         Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT
    // Cookie         Set-Cookie: id=a3fWa; Max-Age=2592000

    resp.headers.set("set-cookie", "cokieee=value")
    resp.headers.set("set-cookie", "devideId=value")
    return resp;
  }