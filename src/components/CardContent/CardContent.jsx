export default function CardContent({title, description, info, buttons}) {
    return(
    <div className="cardContent">
        <h2 className="cardTitle" title={title}>Об авторе</h2>
        <h3 className="cardDescription" description={description}>Глушков Игорь Михайлович</h3>
        <p className="cardInfo" info={info}>
        Родился в Омске в 1957
        <br />
        в 1984 окончил СибАДИ
        <br />
        Служил в войсках ПВО
        <br />
        КМС по плаванию
        <br />
        Руководил проектом аэропорт "Федеровка"
        </p>
        <CardButton
            label="подробнее"
        />
    </div>
    )
}