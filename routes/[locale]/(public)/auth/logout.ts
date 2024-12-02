import { Session } from '$models';

export async function handler(
	req: Request,
) {
	const cookieString = req.headers.get('cookie');
	const cookies = cookieString?.split(';').map((cookieKeyValue) =>
		cookieKeyValue.trim().split('=')
	);
	const session_id = cookies?.find(
		(cookie) => (cookie && cookie[0] == 'sessionId' && cookie[0].length),
	);
	if (session_id) {
		const session_id_value = session_id[1];
		const session = await Session.findOne({
			where: {
				sessionId: session_id_value,
			}
		});
		if (session) {
            await session.update({'isUsing': false, 'isOnline': false})
		}
	}
	const resp = new Response('', {
        status: 301,
        headers: { 
            Location: '/vi_VN'
        },
    });
    resp.headers.set('set-cookie', "sessionId=''; path=/; Max-Age=-1");
	return resp;
}
