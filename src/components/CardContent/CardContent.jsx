import CardButton from "../CardButton/CardButton";

export default function CardContent({title, description, info, buttons, children}) {
    return(
    <div className="cardContent">
        {title && <h2 className="cardTitle"> {title}</h2>}
        {description && <h3 className="cardDescription">{description}</h3>}
        {info && <p className="cardInfo">{info} </p>}
        {/* {...buttons} */}
        {buttons.map((button) => (
            <CardButton
            key={button.id}
            label = {button.label}
            onClick = {button.onClick}
            />
        ))}
        {children}
    </div>
    );
}