import translate from "$libs/helpers/tranlate.ts";

export default function ThankYouPage() {
    return <div>
    {translate("auth.thankYou.notifyContent")}
    <a href={`/vi_VN/auth/login`}>{translate("auth.thankYou.loginLink.label")}</a>
    </div>
}