import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/StarIcon.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];
export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        onSelect,
        selectedStars = 0,
        size = 30,
    } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(styles.StarRating, {}, [className])}>
            {stars.map((item) => (
                <Icon
                    width={size}
                    height={size}
                    className={classNames(styles.starIcon, {
                        [styles.selected]: isSelected,
                    }, [
                        currentStarsCount >= item ? styles.hovered : styles.normal,
                    ])}
                    key={item}
                    Svg={StarIcon}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(item)}
                    onClick={onClick(item)}
                />
            ))}
        </div>
    );
});
