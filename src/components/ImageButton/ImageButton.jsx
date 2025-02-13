import ArrowLeft from "../../assets/images/arrow-button-left.svg";
import ArrowRight from "../../assets/images/arrow-button-right.svg";

const images = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
};

export default function ImageButton({ name, width, height, fill, onClick }) {
  const Image = images[name];
  return Image ? (
    <img
      src={images[name]}
      alt={name}
      width={width}
      height={height}
      fill={fill}
      onClick={onClick}
    />
  ) : null;
}
