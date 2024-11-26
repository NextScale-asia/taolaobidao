import { Account } from '$models';

export type TLoggedState = {
	isLogged: true;
	user: Account;
}

export type TNotLoggedState = {
	isLogged: false;
}