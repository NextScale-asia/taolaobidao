import { RouteConfig, type PageProps } from "$fresh/server.ts";
import translate from "$libs/helpers/tranlate.ts";

export const config: RouteConfig = {
    routeOverride: "/:locale/auth/register-success/:username?",
};

export default function RegisterSuccess(props: PageProps) {
    return (
        <div>
            {translate("registerSuccess.notifyContent")}
            <a href={`/vi_VN/auth/active${props.params.username.length ? "/" + props.params.username : ""}`}>{translate("registerSuccess.activationLink.label")}</a>
        </div>
    );
}
