import {
    FreshContext,
    Handlers,
    type PageProps,
    RouteConfig,
} from "$fresh/server.ts";
import translate from "$libs/helpers/tranlate.ts";
import { Account } from "$models";

// interface ActiveFromParams {
//     username: string;
//     activationKey: string;
// }

// export const handler = {
//     async GET(_req: Request, ctx: FreshContext<ActiveFromParams>) {
//         console.log(ctx.params);
//         // console.log(params);
//         return new Response(ctx.params.path);
//     },
// };

export const handler: Handlers = {
    async POST(_req: Request, _ctx: FreshContext) {
        const form_data = await _req.formData();
        console.log("form_data", form_data)
        const username = form_data.get("username")?.toString() || "";
        const activation_key = form_data.get("activation_key")?.toString() ||
            "";

        const activated_account = await Account.findOne({
            where: {
                username: username,
                activation_key: activation_key,
            }
        });
        if (activated_account === null) {
            console.log('Not found!');
          } else {
            console.log(activated_account instanceof Account); // true
            console.log(activated_account.email); // 'My Title'
          }
        

        if (activated_account) {
            activated_account.activated = true;
            activated_account.activation_key = "";
            const updated_account = await activated_account.save()
            console.log(updated_account)
            if (updated_account) {
                return new Response("", {
                    status: 301,
                    headers: { Location: "/vi_VN/auth/thank-you" },
                });
            } else {
                return _ctx.render({});
            }
        } else {
            return _ctx.render({});
        }
    },
};

export const config: RouteConfig = {
    routeOverride: "/:locale/auth/active/:username?/:activationKey?",
};

export default function ActivePage(props: PageProps) {
    console.log(props.params);
    return (
        <div>
            <form
                method={"POST"}
                className={"w-[400px] border border-slate-300 shadow-sm shadow-slate-400 p-4 rounded m-auto"}
            >
                <label htmlFor="input-username">
                    {translate("auth.active.form.fields.username.label")}:
                </label>
                <br />
                <input
                    type="text"
                    id="input-username"
                    name="username"
                    value={props.params.username || ""}
                    className={"border border-slate-400"}
                />
                <br />
                <label htmlFor="input-activation_key">
                    {translate("auth.active.form.fields.activationKey.label")}:
                </label>
                <br />
                <input
                    type="text"
                    id="input-activation_key"
                    name="activation_key"
                    value={props.params.activationKey || ""}
                    className={"border border-slate-400"}
                />
                <br />
                <br />
                <button
                    type="submit"
                    className={"border border-slate-500 rounded-sm px-4 py-1"}
                >
                    {translate("auth.active.form.submitBtn.text")}
                </button>
            </form>
        </div>
    );
}
