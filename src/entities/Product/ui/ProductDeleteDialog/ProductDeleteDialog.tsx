import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductDeleteDialog.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/CrossIcon.svg';
import { Text, TextSize } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';

interface ProductDeleteDialogProps {
  className?: string;
  onClose?: () => void;
  onDelete?: () => void;
  text: string;
}

export const ProductDeleteDialog = (props: ProductDeleteDialogProps) => {
    const {
        className,
        onClose,
        onDelete,
        text,
    } = props;

    const sectionName = text.split(' ');

    return (
        <div className={classNames(styles.ProductDeleteDialog, {}, [className])}>
            <div className={styles.overlayDialog} />
            <Card className={styles.content}>
                <VStack>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onClose}
                        className={styles.btnClose}
                    >
                        <Icon Svg={CrossIcon} />
                    </Button>
                    <Text
                        className={styles.container}
                        size={TextSize.L}
                        text={`Вы действительно хотите удалить ${sectionName[1]}?`}
                    />
                    <HStack
                        className={classNames(styles.btnWrapper, {}, [styles.container])}
                        gap="16"
                        max
                    >
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={onClose}
                            className={styles.btnCancel}
                        >
                            Отменить
                        </Button>

                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={onDelete}
                            className={styles.btnDelete}
                        >
                            Удалить
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        </div>
    );
};
