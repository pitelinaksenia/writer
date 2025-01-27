export default function SwipeButton({direction, onClick, className}) {
    let arrowSymbol;
    if (direction == 'left') {
        arrowSymbol = '←';
    } else {
        arrowSymbol = '→';
    }
    return (
        <button 
        onClick={onClick} 
        className={className}
        >
        <span className="arrowIcon">{arrowSymbol}</span>
        </button>
    );
};