import translate from "$libs/helpers/tranlate.ts";

export default function ProductReviewsSummary() {
    return (
        <div className="reviewsSummary">
            <p className={"font-semibold"}>
                {translate("product.customerReviews.reviewsSummary.title")}
            </p>
            <div
                className={"flex flex-row align-middle items-center gap-2"}
            >
                <div className="average-points font-bold text-5xl">
                    5.0
                </div>
                <div className="average-stars">
                    <div className="stars-bar !w-40 !h-8">
                        <div className="stars !w-[32rem] !h-8">
                        </div>
                    </div>
                </div>
            </div>
            <div className="count-reviews text-gray-400">
                (1 đánh gia)
            </div>
            <div className={""}>
                <div
                    className={"review-summary-by-stars flex flex-row items-center gap-2"}
                >
                    <div className="stars-bar">
                        <div className="stars w-full">
                        </div>
                    </div>
                    <div
                        className={"count-reviews-bar w-40 h-2"}
                    >
                        <div className="count-reviews w-[20%] h-2">
                        </div>
                    </div>
                    <div>
                        55
                    </div>
                </div>
                <div
                    className={"review-summary-by-stars flex flex-row items-center gap-2"}
                >
                    <div className="stars-bar">
                        <div className="stars w-[80%]">
                        </div>
                    </div>
                    <div
                        className={"count-reviews-bar w-40 h-2"}
                    >
                        <div className="count-reviews w-[20%] h-2">
                        </div>
                    </div>
                    <div>
                        55
                    </div>
                </div>
                <div
                    className={"review-summary-by-stars flex flex-row items-center gap-2"}
                >
                    <div className="stars-bar">
                        <div className="stars w-[60%]">
                        </div>
                    </div>
                    <div
                        className={"count-reviews-bar w-40 h-2"}
                    >
                        <div className="count-reviews w-[20%] h-2">
                        </div>
                    </div>
                    <div>
                        55
                    </div>
                </div>
                <div
                    className={"review-summary-by-stars flex flex-row items-center gap-2"}
                >
                    <div className="stars-bar">
                        <div className="stars w-[40%]">
                        </div>
                    </div>
                    <div
                        className={"count-reviews-bar w-40 h-2"}
                    >
                        <div className="count-reviews w-[20%] h-2">
                        </div>
                    </div>
                    <div>
                        55
                    </div>
                </div>
                <div
                    className={"review-summary-by-stars flex flex-row items-center gap-2"}
                >
                    <div className="stars-bar">
                        <div className="stars w-[20%]">
                        </div>
                    </div>
                    <div
                        className={"count-reviews-bar w-40 h-2"}
                    >
                        <div className="count-reviews w-[20%] h-2">
                        </div>
                    </div>
                    <div>
                        55
                    </div>
                </div>
            </div>
        </div>
    );
}
