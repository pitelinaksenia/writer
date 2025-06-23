import React from "react";
import ArrowLeft from "../../assets/images/arrow-button-left.svg";
import ArrowRight from "../../assets/images/arrow-button-right.svg";
import styles from "./ImageButton.module.css";

interface ImageButtonProps {
    name: keyof typeof images;
    width: string;
    height: string;
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

interface ImageMap {
    [key: string]: string;
}

const images: ImageMap = {
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
};

const ImageButton: React.FC<ImageButtonProps> = ({name, width, height, onClick}) => {
    const Image = images[name];
    return Image ? (
        <img
            src={Image}
            alt={name as string} //не нрав
            width={width}
            height={height}
            onClick={onClick}
            className={styles.imageButton}
        />
    ) : null;
}

export default ImageButton;
