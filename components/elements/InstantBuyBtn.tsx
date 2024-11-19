import { JSX } from "preact/jsx-runtime";
import { BiCreditCard } from "@preact-icons/bi/BiCreditCard";
import translate from "$libs/helpers/tranlate.ts";

export default function InstantBuyBtn(
    props: JSX.HTMLAttributes<HTMLButtonElement> & { product_id: number },
) {
    return (
        <button
            className={"w-full md:w-[50%] flex flex-row gap-1 items-center justify-center rounded border border-blue-500 bg-blue-500 text-white py-1 px-4 hover:border-blue-700 hover:bg-blue-700"}
        >
            <BiCreditCard /> {translate("product.instantBuyBtn.label")}
        </button>
    );
}
