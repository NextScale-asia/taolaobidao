import { JSX } from "preact";
import cn from "$libs/helpers/cn.ts";

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn("px-2 py-1 rounded bg-white hover:bg-gray-200 transition-colors", props.className)}
        >
            {props.children}
        </div>
    );
}
