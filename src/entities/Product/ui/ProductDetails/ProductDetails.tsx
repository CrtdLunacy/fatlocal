import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductDetails.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/CrossIcon.svg';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { InputFile } from '@/shared/ui/InputFile';
import TrashIcon from '@/shared/assets/icons/TrashIcon.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProductDetailsForm, getProductsErrorDetails } from '../../model/selectors/index';
import { getMenuData } from '@/entities/Menu';
import { uploadProductImg } from '../../model/services/uploadProductImg/uploadProductImg';
import { Switcher } from '@/shared/ui/Switcher';
import { ListBox } from '@/shared/ui/Popups';
import { fetchProductsIntegration } from '../../model/services/fetchProductsIntegration/fetchProductsIntegration';
import { formatCookingTime } from '@/shared/lib/formatCookingTime/formatCookingTime';
import { ProductActions } from '../../model/slices/productSlice';
import { fetchProductDetails } from '../../model/services/fetchProductDetails/fetchProductDetails';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { buildMenuChainString } from '@/shared/lib/buildMenuBreadcrumbs/buildMenuBreadcrumbs';
import { useBreadCrumbsMenu } from '@/shared/lib/hooks/useBreadCrumbsMenu/useBreadCrumbsMenu';
import { organizeHierarchicalMenu } from '@/shared/lib/organizeHierachicalMenu/organizeHierarchicalMenu';
import { InputType } from '@/shared/ui/Input/consts';
import { fetchProducts } from '../../model/services/fetchProducts/fetchProducts';
import { ProductDeleteDialog } from '../ProductDeleteDialog/ProductDeleteDialog';

export interface ProductDetailsProps {
    className?: string;
    onSuccess: () => void;
    onChangeTitle: (value?: string) => void;
    onChangeMenu: (value?: string) => void;
    onChangeDescription: (value?: string) => void;
    onChangeIngredients: (value?: string) => void;
    onChangeProteins: (value?: string) => void;
    onChangeFats: (value?: string) => void;
    onChangeCarbohydrates: (value?: string) => void;
    onChangeCalories: (value?: string) => void;
    onChangeWeight: (value?: string) => void;
    onChangeUnits: (value?: string) => void;
    onChangeCookingTime: (value?: string) => void;
    onChangePrice: (value?: string) => void;
    onChangeActive: (value?: boolean) => void;
    onChangeInsideFlag: (value?: boolean) => void;
    onChangeOutsideFlag: (value?: boolean) => void;
    onChangeDeliveryFlag: (value?: boolean) => void;
    onSave: () => void;
    onDelete: () => void;
    hasChanges: boolean;
    title?: string;
    id?: number;
}

const unitsOptions = [
    {
        value: 'г',
        content: 'г',
    },
    {
        value: 'мл',
        content: 'мл',
    },
];

const ProductDetails = memo((props: ProductDetailsProps) => {
    const {
        className,
        onSuccess,
        onChangeTitle,
        onChangeMenu,
        onChangeDescription,
        onChangeCalories,
        onChangeCarbohydrates,
        onChangeCookingTime,
        onChangeFats,
        onChangeIngredients,
        onChangePrice,
        onChangeProteins,
        onChangeUnits,
        onChangeWeight,
        onChangeActive,
        onChangeInsideFlag,
        onChangeOutsideFlag,
        onChangeDeliveryFlag,
        onSave,
        onDelete,
        hasChanges = false,
        title = 'Новое блюдо',
        id,
    } = props;

    const [file, setFile] = useState<File | undefined>(undefined);
    const url = file && URL.createObjectURL(file);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const details = useSelector(getProductDetailsForm);
    const error = useSelector(getProductsErrorDetails);
    const menus = useSelector(getMenuData);
    const hierarchyMenu = organizeHierarchicalMenu(menus);
    const [selectOptions] = useBreadCrumbsMenu(hierarchyMenu);
    const [isDeleteDialog, setIsDeleteDialog] = useState(false);
    const menuId = searchParams.get('menu');

    const [valueName, setValueName] = useState<string | undefined>('');

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    });

    useEffect(() => {
        if (details?.parentId && hierarchyMenu) {
            const currentMenu = menus.find((item) => item.id === details.parentId);
            setValueName(currentMenu && buildMenuChainString(currentMenu.name, currentMenu.menuParentId, hierarchyMenu));
        }
    }, [details?.parentId, hierarchyMenu, id, menus]);

    const handleAddFile = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handeCloseDialog = useCallback(() => {
        setIsDeleteDialog(false);
    }, []);

    const handleShowDialog = useCallback(() => {
        setIsDeleteDialog(true);
    }, []);

    const handleDelete = useCallback(async () => {
        await onDelete();
        await dispatch(fetchProductsIntegration(Number(menuId)));
        await dispatch(fetchProducts());
        dispatch(ProductActions.clearProductDetails());
        onSuccess();
    }, [dispatch, menuId, onDelete, onSuccess]);

    const handleSave = useCallback(async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            await dispatch(uploadProductImg(formData));
        }
        await onSave();
        await dispatch(fetchProductsIntegration(Number(menuId)));
        await dispatch(fetchProducts());
        onSuccess();
    }, [dispatch, file, menuId, onSave, onSuccess]);

    const handleClose = useCallback(() => {
        if (hasChanges) {
            // eslint-disable-next-line no-restricted-globals
            const promptCheck = confirm('При закрытии все несохраненные изменения пропадут.'
          + ' Уверены, что хотите закрыть карточку?');
            if (promptCheck) {
                setTimeout(() => {
                    dispatch(ProductActions.clearProductDetails());
                    onSuccess();
                }, 300);
            }
        }
        setTimeout(() => {
            dispatch(ProductActions.clearProductDetails());
            onSuccess();
        }, 300);
    }, [dispatch, hasChanges, onSuccess]);

    return (
        <form className={classNames(styles.ProductDetails, {}, [className])}>
            <VStack gap="16">
                <HStack max align="center" justify="between">
                    <HStack gap="24">
                        <Text text={title} />
                        <Switcher
                            onChangeCheck={onChangeActive}
                            idCheckboxName="productActiveCheckbox"
                            checked={details?.isActive}
                        />
                        <Button
                            className={styles.fileTrash}
                            onClick={handleShowDialog}
                            theme={ButtonTheme.CLEAR}
                        >
                            <Icon Svg={TrashIcon} />
                        </Button>
                    </HStack>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={handleClose}
                    >
                        <Icon Svg={CrossIcon} />
                    </Button>
                </HStack>
                <HStack max gap="16">
                    <Input
                        onChange={onChangeTitle}
                        value={details?.title || ''}
                        maximum
                        placeholder="Название"
                    />
                    <ListBox
                        full
                        label="Меню"
                        defaultValue="Выберите меню"
                        value={valueName}
                        direction="bottom left"
                        onChange={onChangeMenu}
                        items={selectOptions}
                    />
                </HStack>
                <Input
                    onChange={onChangeDescription}
                    value={details?.description}
                    maximum
                    placeholder="Описание"
                />
                <HStack max align="center">
                    <InputFile
                        className={styles.inputFile}
                        placeholder="Описание"
                        onFilesChange={handleAddFile}
                        labelText="Выберите файл"
                    />
                    {(url || details?.image) && (
                        <img
                            className={styles.fileImg}
                            src={url || details?.image}
                            height={60}
                            width={80}
                            key={url || details?.image}
                            alt={file?.name || details?.title}
                        />
                    )}
                </HStack>
                <Input
                    onChange={onChangeIngredients}
                    value={details?.ingredients}
                    maximum
                    placeholder="Ингредиенты"
                />
                <HStack className={styles.inputStack} max gap="10">
                    <Input
                        onChange={onChangeProteins}
                        value={details?.proteins || ''}
                        placeholder="Белки"
                    />
                    <Input
                        onChange={onChangeFats}
                        value={details?.fats || ' '}
                        placeholder="Жиры"
                    />
                    <Input
                        onChange={onChangeCarbohydrates}
                        value={details?.carbohydrates || ' '}
                        placeholder="Углеводы"
                    />
                    <Input
                        onChange={onChangeCalories}
                        value={details?.calories || ' '}
                        placeholder="Калории"
                    />
                </HStack>
                <HStack className={styles.inputStack} max gap="10">
                    <Input
                        onChange={onChangeWeight}
                        value={details?.weight || ''}
                        placeholder="Вес"
                    />
                    <ListBox
                        full
                        label="Единицы измерения"
                        value={details?.units || ''}
                        direction="bottom left"
                        onChange={onChangeUnits}
                        items={unitsOptions}
                    />
                    <Input
                        onChange={onChangeCookingTime}
                        type={InputType.TIME}
                        value={details?.cookingTime ? formatCookingTime(details?.cookingTime) : '00:00'}
                        placeholder="Время готовки"
                    />
                    <Input onChange={onChangePrice} value={details?.price || ' '} placeholder="Цена" />
                </HStack>
                <HStack className={styles.switchersWrap} max gap="32">
                    <Switcher
                        checked={details?.availableInside}
                        idCheckboxName="insideCheckbox"
                        placeholder="В зале"
                        onChangeCheck={onChangeInsideFlag}
                    />
                    <Switcher
                        checked={details?.availableOutside}
                        idCheckboxName="outsideCheckbox"
                        placeholder="На вынос"
                        onChangeCheck={onChangeOutsideFlag}
                    />
                    <Switcher
                        checked={details?.availableDelivery}
                        idCheckboxName="deliveryCheckbox"
                        placeholder="Доставка"
                        onChangeCheck={onChangeDeliveryFlag}
                    />
                </HStack>
                {/* <VStack> */}
                {/*    <Text text="Варианты исполнения" /> */}
                {/* </VStack> */}
                {/* <VStack> */}
                {/*    <Text text="Дополнения" /> */}
                {/* </VStack> */}
                <Button
                    className={styles.saveBtn}
                    theme={ButtonTheme.CLEAR}
                    onClick={handleSave}
                >
                    Сохранить
                </Button>
                {isDeleteDialog && (
                    <ProductDeleteDialog
                        onDelete={handleDelete}
                        onClose={handeCloseDialog}
                        text="Удалить продукт"
                    />
                )}
            </VStack>
        </form>
    );
});

export default ProductDetails;
