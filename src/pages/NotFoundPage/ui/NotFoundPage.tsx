import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageLayout } from '@/widgets/PageLayout';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => (
    <PageLayout className={classNames(styles.NotFoundPage, {}, [className])}>
        Страница не найдена
    </PageLayout>
));
