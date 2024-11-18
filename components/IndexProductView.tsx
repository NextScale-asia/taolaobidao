import { Card } from "$components/Card.tsx";
import { TIndexProductView } from "$libs/types/index.ts";

export default function IndexProductView(props: TIndexProductView) {

    return <Card>
        <a href={`${props.link}`}>
        <img src={props.featured_image} alt="" className={"w-full rounded-md"} />
        </a>
        <a href={`${props.link}`}>
        <h4 className={"text-bold"}>{props.name}</h4>
        </a>
        <div className={"flex flex-row gap-2"}>
            <div className={"font-bold"}>
                {props.price}
            </div>
            <div className={"font-bold line-through text-gray-400"}>
                {props.original_price}
            </div>
            <div>
                <span className={"bg-red-600 font-semibold text-white rounded-sm px-1"}>
                    {Math.floor((props.original_price - props.price)/props.original_price * 100)}%
                </span>
            </div>
        </div>
    </Card>
}