import translate from "$libs/helpers/tranlate.ts";
import { FreshContext, Handlers, type PageProps } from "$fresh/server.ts";
import { Account, IAccount } from "$models";
import { hashSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

interface Props {
    accounts: IAccount[]
}

export const handler: Handlers = {
    async POST(_req: Request, _ctx: FreshContext) {
        const formData = await _req.formData();
        const username = formData.get("username")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        
        const new_account = new Account({
            username: username,
            email: email,
            password: hashSync(password, Deno.env.get("hash_salt")) 
        })

        await new_account.save();
        const accounts = await Account.findAll()
        return _ctx.render({ accounts: accounts });
    },
};

export default function Register({ accounts }: { accounts: Props["accounts"] }) {
    return (
        <div>
            <form
                method={"POST"}
                className={"w-[400px] border border-slate-300 shadow-sm shadow-slate-400 p-4 rounded m-auto"}
            >
                <label htmlFor="input-username">
                    {translate("register.form.fields.username.label")}:
                </label>
                <br />
                <input
                    type="text"
                    id="input-username"
                    name="username"
                    value={""}
                    className={"border border-slate-400"}
                />
                <br />
                <label htmlFor="input-email">
                    {translate("register.form.fields.email.label")}:
                </label>
                <br />
                <input
                    type="text"
                    id="input-email"
                    name="email"
                    value={""}
                    className={"border border-slate-400"}
                />
                <br />
                <label htmlFor="input-password">
                    {translate("register.form.fields.password.label")}:
                </label>
                <br />
                <input
                    type="password"
                    id="input-password"
                    name="password"
                    value={""}
                    className={"border border-slate-400"}
                />
                <br />
                <br />
                <button type="submit" className={"border border-slate-500 rounded-sm px-4 py-1"}>{translate("register.form.submitBtn.text")}</button>
            </form>
            <ul>
                {accounts && accounts.map((account, index) => {
                    return <li key={index}>{account.username} - {account.email} - {account.password}</li>
                })}
            </ul>
        </div>
    );
}
