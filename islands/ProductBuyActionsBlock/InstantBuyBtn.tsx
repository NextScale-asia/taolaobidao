
import { BiCreditCard } from "@preact-icons/bi/BiCreditCard";

export default function InstantBuyBtn() {
    return (
        <button
            className={"w-full flex flex-row gap-1 items-center justify-center rounded border border-blue-500 bg-blue-500 text-white py-1 px-4 hover:border-blue-700 hover:bg-blue-700"}
        >
            <BiCreditCard /> {"product.instantBuyBtn.label"}
        </button>
    );
}
