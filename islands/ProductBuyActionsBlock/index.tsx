import { useComputed, useSignal } from "@preact/signals";
import { type TProductBuyActionsNeed } from "$libs/types/TProductView.ts";
import InstantBuyBtn from "$islands/ProductBuyActionsBlock/InstantBuyBtn.tsx";
import AddToCartBtn from "$islands/ProductBuyActionsBlock/AddToCartBtn.tsx";

export default function ProductBuyActionsBlock(props: TProductBuyActionsNeed) {
    const quality = useSignal(1);
    const total_price = useComputed(() => props.price * quality.value);
    const onInput = (event: { currentTarget: HTMLInputElement }) => {
        let new_value = Number(event!.currentTarget!.value);
        if (new_value < 0) {
            new_value = 0;
        } else if (new_value > props.inventory_quality) {
            new_value = props.inventory_quality;
        }
        quality.value = new_value;
    };

    return (
        <>
            <strong>Số lượng</strong>
            <div class="flex gap-4 py-6">
                <button
                    onClick={() => quality.value -= 1}
                    disabled={quality.value === 0}
                    className={"border border-gray-300 rounded px-2"}
                >
                    -1
                </button>

                <input
                    type="number"
                    min="1"
                    max={props.inventory_quality}
                    value={quality}
                    onInput={onInput}
                    className={"w-14 border border-gray-400 rounded text-md pl-2"}
                />
                <button
                    onClick={() => quality.value += 1}
                    disabled={quality.value === props.inventory_quality}
                    className={"border border-gray-300 rounded px-2"}
                >
                    +1
                </button>
            </div>
            <strong>Tạm tính</strong>
            <p className={"font-bold text-3xl"}>
            {total_price.value}
            <sup>đ</sup>
            </p>

            <div className="block__content grid gap-2 mt-2">
                <InstantBuyBtn />
                <AddToCartBtn />
            </div>
        </>
    );
}
