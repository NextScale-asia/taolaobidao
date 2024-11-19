import { JSX } from "preact/jsx-runtime";
import { BiCartAdd } from "@preact-icons/bi/BiCartAdd";
import translate from "$libs/helpers/tranlate.ts";

export default function AddToCartBtn(
    props: JSX.HTMLAttributes<HTMLButtonElement> & { product_id: number },
) {
    return (
        <button
            className={"w-full md:w-[50%] flex flex-row gap-1 items-center justify-center rounded border border-blue-500 bg-transparent text-blue-500 py-1 px-4 hover:border-blue-700 hover:bg-blue-700 hover:text-white"}
        >
            <BiCartAdd /> {translate("product.addToCartBtn.label")}
        </button>
    );
}
