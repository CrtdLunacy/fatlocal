import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextTheme } from '@/shared/ui/Text';
import { PageLayout } from '@/widgets/PageLayout';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;

    return (
        <PageLayout className={classNames('', {}, [className])}>
            <Text theme={TextTheme.ERROR} title="Доступ" />
        </PageLayout>
    );
});

export default ForbiddenPage;
