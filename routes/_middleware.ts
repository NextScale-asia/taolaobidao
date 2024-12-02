import { FreshContext, RouteConfig } from '$fresh/server.ts';
import * as mod from 'node:crypto';
import { Account, Role, Session } from '$models';
import { compareSync } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

export async function handler(
	req: Request,
	ctx: FreshContext,
) {
	localStorage.setItem('myDemo', 'Deno App');
	const cookieString = req.headers.get('cookie');
	const cookies = cookieString?.split(';').map((cookieKeyValue) =>
		cookieKeyValue.trim().split('=')
	);
  
  console.log(`App middleware checking session_id`);
  
	const session_id = cookies?.find(
		(cookie) => (cookie && cookie[0] == 'sessionId' && cookie[0].length)
	);
  let is_logged = false;
	if (session_id) {
    is_logged = true
		const session_id_value = session_id[1];
		const session = await Session.findOne({
			where: {
				sessionId: session_id_value,
        isUsing: true
			},
      include: [{
        model: Account,
        include: [{
          model: Role,
          include: ['permissions']
        }]
      }]
		});
    if (!session) {
      is_logged = false
    } else {
      if (!session.account) {
        await session.update({'isUsing': false, 'isOnline': false})
        is_logged = false
      } else {const client_ip_address = (ctx.remoteAddr.hostname) ? ctx.remoteAddr.hostname : ""
        const client_agent = (req.headers.get("user-agent")) ? req.headers.get("user-agent") : ""
        const session_payload: string = session.account.username + ":" + session.account.password + ":" + client_ip_address + ":" + client_agent
        console.log(session_payload)
        if (!compareSync(session_payload, session_id_value)) {
          is_logged = false
          await session.update({'isUsing': false, 'isOnline': false})
        } else {
          ctx.state.isLogged = is_logged
          ctx.state.user = session?.account
        }
      }
    }
	}
  
  
  console.log(`App middleware check session_id ${is_logged}`);
	const resp = await ctx.next();
  if (session_id && !is_logged) {
    resp.headers.set("set-cookie", "sessionId=''; path=/; Max-Age=-1")
  }
	return resp;
}
