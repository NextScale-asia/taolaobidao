import { JSX } from "preact";

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>, children: JSX.Element) {
    return (
        <div
            {...props}
            className={"px-2 py-1 border-gray-400 border rounded bg-white hover:bg-gray-200 transition-colors"}
        >
            {children}
        </div>
    );
}
