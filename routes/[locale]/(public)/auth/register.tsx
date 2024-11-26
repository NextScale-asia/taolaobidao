import translate from "$libs/helpers/tranlate.ts";
import { FreshContext, Handlers, type PageProps } from "$fresh/server.ts";
import { Account } from "$models";
import { hashSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts"


interface Props {
    accounts: Account[]
}

export const handler: Handlers = {
    async POST(_req: Request, _ctx: FreshContext) {
        const formData = await _req.formData();
        const username = formData.get("username")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        
        const new_account = await Account.create({
            username: username,
            email: email,
            password: hashSync(password),//, Deno.env.get("hash_salt")),
            activation_key: cryptoRandomString({length: 10, type: 'alphanumeric'})
        })
        if (new_account) {
            return new Response("", {
                status: 301,
                headers: { Location: "/vi_VN/auth/register-success" },
              })
        } else {
            return _ctx.render({});
        }
    },
};

export default function Register(props: PageProps<Props>) {

    return (
        <div>
            <form
                method={"POST"}
                className={"w-[400px] border border-slate-300 shadow-sm shadow-slate-400 p-4 rounded m-auto"}
            >
                <label htmlFor="input-username">
                    {translate("auth.register.form.fields.username.label")}:
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
                    {translate("auth.register.form.fields.email.label")}:
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
                    {translate("auth.register.form.fields.password.label")}:
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
                <button type="submit" className={"border border-slate-500 rounded-sm px-4 py-1"}>{translate("auth.register.form.submitBtn.text")}</button>
            </form>
        </div>
    );
}
