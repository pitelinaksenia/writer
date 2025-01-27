import CardContent from "../CardContent/CardContent";
import SwipeButton from "../SwipeButton/SwipeButton";


export default function SwipeCardContent({overline, direction, ...props}) {
    return(
    <div className="swipeCardardContent">
        <p className="swipeCardOverline">{overline}</p>
        <CardContent {...props}/>
            <SwipeButton 
            direction={direction}
            onClick={() => console.log('Swipe button clicked')}>
            </SwipeButton>
             
    </div>
    );
}