export default function CardContainer({ style, children }) {
  return (
    <div className="cardContainer" style={style}>
      {children}
    </div>
  );
}
