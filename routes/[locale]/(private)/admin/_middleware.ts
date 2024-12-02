import { FreshContext } from '$fresh/server.ts';
import { TLoggedState, TNotLoggedState } from '$libs/types/index.ts';

export async function handler(
	req: Request,
	ctx: FreshContext<TLoggedState | TNotLoggedState>,
) {
	if (!ctx.state.isLogged) {
		return new Response('', {
			status: 301,
			headers: { Location: '/vi_VN/auth/login' },
		});
	} else {
        const user = ctx.state.user
        console.log(user)
        if (user.can("access_admin")) {
            const resp = await ctx.next();
            return resp;
        } else {
            return new Response("You can not access admin area.")
        }
    }

}
