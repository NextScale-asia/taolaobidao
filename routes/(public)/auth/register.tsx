import translate from "$libs/helpers/tranlate.ts";



export default function Register() {
    return (
        <div>
            <form>
                <label htmlFor="input-username">{translate("register.form.fields.username.label")}: </label>
                <input type="text" name="username" value={""} />
                <input type="text" name="email" value={""} />
                <input type="password" name="password" value={""} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}
