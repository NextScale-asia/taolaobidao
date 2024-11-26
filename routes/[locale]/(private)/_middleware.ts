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
	}
	const resp = await ctx.next();
	resp.headers.set('server', 'fresh server');
	return resp;
}
