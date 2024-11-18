
export default function ProductDiscountBadge(props: { discounted_percent : number }) {
    const discounted_percent = props.discounted_percent
    return <span className={"bg-red-600 font-semibold text-white text-sm rounded-sm px-1"}>
        {discounted_percent}%
    </span>
}