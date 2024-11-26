import { FreshContext } from '$fresh/server.ts';
import { Account } from '$models';
import { hashSync } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import { Permission } from '../models/Permission.ts';
import { Role } from '../models/Role.ts';

export async function handler(
	req: Request,
	ctx: FreshContext,
) {
	try {
		let admin_role = await Role.findOne({
			where: {
				name: 'admin',
			}
		});

		if (!admin_role) {
			admin_role = await Role.create({
				name: 'admin',
			});
		}

		let access_admin_permission = await Permission.findOne({
			where: {
				name: 'access_admin',
			},
		});

		if (!access_admin_permission) {
			access_admin_permission = await Permission.create({
				name: 'access_admin',
			});
		}

		if (! await admin_role.hasPermission(access_admin_permission)) {
			await admin_role.addPermission(access_admin_permission);
		}

		let manager_role = await Role.findOne({
			where: {
				name: 'manager',
			}
		});

		if (!manager_role) {
			manager_role = await Role.create({
				name: 'manager',
			});
		}

		let access_manager_permission = await Permission.findOne({
			where: {
				name: 'access_manager',
			},
		});

		if (!access_manager_permission) {
			access_manager_permission = await Permission.create({
				name: 'access_manager',
			});
		}

		if (! await admin_role.hasPermission(access_manager_permission)) {
			await admin_role.addPermission(access_manager_permission);
		}

		if (! await manager_role.hasPermission(access_manager_permission)) {
			await manager_role.addPermission(access_manager_permission);
		}

		let customer_role = await Role.findOne({
			where: {
				name: 'customer',
			}
		});

		if (!customer_role) {
			customer_role = await Role.create({
				name: 'customer',
			});
		}

		let access_customer_permission = await Permission.findOne({
			where: {
				name: 'access_customer',
			},
		});

		if (!access_customer_permission) {
			access_customer_permission = await Permission.create({
				name: 'access_customer',
			});
		}

		if (! await admin_role.hasPermission(access_customer_permission)) {
			await admin_role.addPermission(access_customer_permission);
		}

		if (! await manager_role.hasPermission(access_customer_permission)) {
			await manager_role.addPermission(access_customer_permission);
		}

		if (! await customer_role.hasPermission(access_customer_permission)) {
			await customer_role.addPermission(access_customer_permission);
		}

		let admin_account = await Account.findOne({
			where: {
				username: 'admin',
			},
		});

		if (!admin_account) {
			admin_account = await Account.create({
				username: 'admin',
				password: hashSync('123456'),
			});
		}

		if (! await admin_account.hasRole(admin_role)) {
			await admin_account.addRole(admin_role);
		}

		if (! await admin_account.hasRole(manager_role)) {
			await admin_account.addRole(manager_role);
		}

		if (! await admin_account.hasRole(customer_role)) {
			await admin_account.addRole(customer_role);
		}

		let manager_account = await Account.findOne({
			where: {
				username: 'manager',
			},
		});

		if (!manager_account) {
			manager_account = await Account.create({
				username: 'manager',
				password: hashSync('123456'),
			});
		}

		if (! await manager_account.hasRole(manager_role)) {
			await manager_account.addRole(manager_role);
		}

		if (! await manager_account.hasRole(customer_role)) {
			await manager_account.addRole(customer_role);
		}

		let customer_account = await Account.findOne({
			where: {
				username: 'customer',
			},
		});

		if (!customer_account) {
			customer_account = await Account.create({
				username: 'customer',
				password: hashSync('123456'),
			});
		}

		if (! await customer_account.hasRole(customer_role)) {
			await customer_account.addRole(customer_role);
		}
        return new Response("Success")
	} catch (error) {
        return new Response("" + error)
    }
}
