import translate from "$libs/helpers/tranlate.ts";
import {Card} from "$components/Card.tsx";

export default async function IndexPage() {
    return <div>
        <section className={"container mx-auto px-4"}>
            <div className={"section__section-title"}>
                <h3 className={"section__section-title__content"}>
                    {translate("index.body.sections.hotProduct.sectionTitle.text")}
                </h3>
            </div>
            <div className={"section__section-body grid grid-cols-4 border-"}>
                {Array.from(Array(12).keys()).map((_, i) => {
                        return <Card key={i}>
                            <div className={"card-"}></div>
                        </Card>
                })}
            </div>
        </section>
    </div>
}