import translate from '$libs/helpers/tranlate.ts';
import { FreshContext, Handlers, type PageProps } from '$fresh/server.ts';
import { Account } from '$models';
import { hashSync } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import { cryptoRandomString } from 'https://deno.land/x/crypto_random_string@1.0.0/mod.ts';
import { Op } from 'npm:@sequelize/core';

interface Props {
	accounts: Account[];
}

export const handler: Handlers = {
	async POST(_req: Request, _ctx: FreshContext) {
		const formData = await _req.formData();
		const username = formData.get('username')?.toString() || '';
		const password = formData.get('password')?.toString() || '';

		const user_by_username = await Account.findOne({
			where: {
				username: username,
				activated: true,
				activation_key: {
					[Op.eq]: '',
				},
			},
		});
		if (!user_by_username) {
            console.log('Người dùng không tồn tại hoặc mật khẩu không chính xác.');
            
			return _ctx.render({
				error:
					'Người dùng không tồn tại hoặc mật khẩu không chính xác.',
			});
		}

		if (!user_by_username.isRightPassword(password)) {
            console.log('Người dùng không tồn tại hoặc mật khẩu không chính xác.');
			return _ctx.render({
				error:
					'Người dùng không tồn tại hoặc mật khẩu không chính xác.',
			});
		}
        const client_ip_address = (_ctx.remoteAddr.hostname) ? _ctx.remoteAddr.hostname : ""
        console.log(client_ip_address)
        const client_agent = (_req.headers.get("user-agent")) ? _req.headers.get("user-agent") : ""
        const session_payload = username + ":" + user_by_username.password + ":" + client_ip_address + ":" + client_agent
        const session_id = hashSync(session_payload);//, Deno.env.get("hash_salt"))
        const session = await user_by_username.createSession({
            sessionId: session_id,
            ipAddress: client_ip_address,
            userAgent: client_agent
        })
        console.log(session)

		// console.log(resp.headers.getSetCookie())
		// Session        Set-Cookie: sessionId=38afes7a8
		// Cookie         Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT
		// Cookie         Set-Cookie: id=a3fWa; Max-Age=2592000


		const resp = new Response('', {
			status: 301,
			headers: { 
                Location: '/vi_VN/admin/dashboard'
            },
		});

		resp.headers.set('set-cookie', 'sessionId=' + session_id + '; path=/');
        console.log("resp", resp)
		return resp;
	},
};

export default function Login(props: PageProps<Props>) {
	return (
		<div f-client-nav={false}>
			<form
				method={'POST'}
				className={'w-[400px] border border-slate-300 shadow-sm shadow-slate-400 p-4 rounded m-auto'}
			>
				<label htmlFor='input-username'>
					{translate('auth.login.form.fields.username.label')}:
				</label>
				<br />
				<input
					type='text'
					id='input-username'
					name='username'
					value={''}
					className={'border border-slate-400'}
				/>
				<br />
				<label htmlFor='input-password'>
					{translate('auth.login.form.fields.password.label')}:
				</label>
				<br />
				<input
					type='password'
					id='input-password'
					name='password'
					value={''}
					className={'border border-slate-400'}
				/>
				<br />
				<br />
				<button
					type='submit'
					className={'border border-slate-500 rounded-sm px-4 py-1'}
				>
					{translate('auth.login.form.submitBtn.text')}
				</button>
			</form>
		</div>
	);
}
