import { FreshContext, Handlers, type PageProps } from '$fresh/server.ts';
import { TLoggedState } from '$libs/types/index.ts';
export const handler: Handlers<Request, TLoggedState> = {
	GET(_req: Request, _ctx: FreshContext) {
		return _ctx.render();
	},
};

export default function Dashboard({state}: {state: TLoggedState }) {
    console.log(state.user.username)
	return (
		<>
			Admin dashboard. You are logged with account {state.user.username}
            <br/>
            <a href={"/vi_VN/auth/logout"}>Đăng xuất</a>
		</>
	);
}
