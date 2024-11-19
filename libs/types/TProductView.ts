type TProductVariation = {
    id: number,
    name: string,
    disabled: boolean,
    link: string,
    current: boolean
}
type TProdcutVariationGroup = {
    id: number,
    name: string,
    items: TProductVariation[]
}
export type TProductView = {
    id: number,
    name: string,
    price: number,
    original_price: number,
    featured_image: string,
    link: string,
    inventory_state: 0 | 1 | 2 | 3, // 0: Het hang, 1: Hang dang ve,  2: Con hang, 3: Ngung kinh doanh
    product_state: 0 | 1 | 2 | 3, // 0: draft, 1: pendding, 2, published, 3: trash
    sku: string,
    variations: TProdcutVariationGroup[]
}

export type TProductBuyActionsNeed = {
    id: number,
    name: string,
    price: number,
    original_price: number,
    inventory_quality: number
}