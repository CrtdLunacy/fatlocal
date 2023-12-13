import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import styles from './PageError.module.scss';

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={classNames(styles.PageError, {}, [className])}>
            <p>Ошибка</p>
            <Button onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};
