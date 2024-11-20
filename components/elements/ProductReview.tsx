import translate from "$libs/helpers/tranlate.ts";
import { BiCalendarCheck, BiCommentDots, BiLike, BiShareAlt, BiSolidCheckCircle } from "@preact-icons/bi";

export default function ProductReview() {
    return (
        <div className="review grid grid-cols-7 gap-4 border-t border-gray-200 pt-4 mt-4">
            <div className="col-span-2 flex flex-col">
                <div className="grid grid-cols-5 gap-1">
                    <div className="col-span-1">
                        <div className="avatar">
                            <div className="flex w-full aspect-square rounded-full bg-blue-200">
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="author-name font-semibold">
                            Nguyễn Quốc Huy
                        </div>
                        <div className="author-registered-since text-gray-300">
                            {translate(
                                "product.customerReviews.review.author.registeredSince",
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <div className={"flex flex-row items-center text-gray-500"}>
                        <BiCommentDots />
                        {translate(
                            "product.customerReviews.review.author.countReviews.label",
                        )}
                    </div>
                    <div className={"text-gray-500"}>
                        290&nbsp;
                        {translate(
                            "product.customerReviews.review.author.countReviews.units",
                        )}
                    </div>
                </div>
                <div className="border-b border-gray-200 my-1"></div>
                <div className="flex flex-row justify-between">
                    <div className={"flex flex-row items-center text-gray-500"}>
                        <BiLike />
                        {translate(
                            "product.customerReviews.review.author.countReceivedLike.label",
                        )}
                    </div>
                    <div className={"text-gray-500"}>
                        849&nbsp;
                        {translate(
                            "product.customerReviews.review.author.countReceivedLike.units",
                        )}
                    </div>
                </div>
            </div>
            <div className="col-span-5">
                <div className="flex flex-row items-center gap-4">
                    <div>
                        <div className="stars-bar !w-20 !h-4">
                            <div className="stars !w-20 !h-4">
                            </div>
                        </div>
                    </div>
                    <div className={"font-bold"}>
                        {translate(
                            "product.customerReviews.review.labels.review5stars",
                        )}
                    </div>
                </div>
                <div className={"flex flex-row items-center justify-between"}>
                    <div className="verify-bought-badge flex flex-row items-center gap-1 text-green-500">
                        <BiSolidCheckCircle />{" "}
                        {translate(
                            "product.customerReviews.review.verifyBoughtBadge",
                        )}
                    </div>
                    <div
                        className={"flex flex-row items-center text-gray-400 text-sm"}
                    >
                        <BiCalendarCheck />
                        {translate("product.customerReviews.review.date")}
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eligendi natus porro voluptatum ab. Assumenda itaque
                    dolorem, id voluptatum expedita corrupti aliquam. Ratione,
                    numquam dignissimos reprehenderit alias tempora at culpa
                    exercitationem amet laudantium aperiam aliquam in eaque fuga
                    incidunt. Voluptatum quo, vitae aspernatur aliquid quis
                    accusantium saepe incidunt commodi. Aliquid assumenda
                    nostrum laudantium doloribus minus sunt libero doloremque?
                    Sed autem aperiam, numquam mollitia qui explicabo totam
                    nesciunt ipsum maiores vitae modi.
                </div>
                <div className="flex flex-row items-center justify-between text-gray-400 font-semibold mt-2">
                    <div className="flex flex-row items-center">
                        <BiLike />{" "}
                        {translate(
                            "product.customerReviews.review.actions.like.label",
                        )}
                    </div>
                    <div className="flex flex-row items-center">
                        <BiShareAlt />{" "}
                        {translate(
                            "product.customerReviews.review.actions.share.label",
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
