import { TProductView } from "$libs/types/TProductView.ts";
import { JSX } from "preact/jsx-runtime";

export default function ProductVariationsCloud(props: JSX.HTMLAttributes<HTMLButtonElement> & {variation: TProductView['variations'][0]}) {
    const variation = props.variation
   
    // console.log(props)
    return <div className={"product-summary__product-details__product-variations-group mt-2 border-t border-gray-200"}>
        <h4 className={"font-semibold"}>{variation.name}</h4>
        <div className={"flex flex-row flex-wrap gap-2"}>
            {variation.items.map(item => {
                return item.current 
                ? <a href={item.link} className={"rounded-sm border border-blue-500 bg-blue-500 text-white py-1 px-2 pointer-events-none"}>{item.name}</a>
                : item.disabled ? <a href={item.link} className={"rounded-sm border border-gray-300 text-gray-400 py-1 px-2 pointer-events-none"} disabled>{item.name}</a>
                : <a href={item.link} className={"rounded-sm border border-blue-400 py-1 px-2"}>{item.name}</a>
            })}
        </div>
    </div>
}