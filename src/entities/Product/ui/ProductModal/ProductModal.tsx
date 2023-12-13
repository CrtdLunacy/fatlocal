import {
    memo, Suspense, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { ProductDetailsAsync } from '../ProductDetails/ProductDetails.async';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProductActions } from '../../model/slices/productSlice';
import { updateProductDetails } from '../../model/services/updateProductDetails/updateProductDetails';
import { createProduct } from '../../model/services/createProduct/createProduct';
import { deleteProduct } from '../../model/services/deleteProduct/deleteProduct';
import { fetchProducts } from '../../model/services/fetchProducts/fetchProducts';

interface ProductModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
  title?: string;
}

export const ProductModal = memo((props: ProductModalProps) => {
    const {
        className,
        onClose,
        isOpen,
        productId,
        title,
    } = props;
    const dispatch = useAppDispatch();
    const [hasChanges, setHasChanges] = useState(false);

    const handleChangeTitle = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ title: value || '' }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeMenu = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ parentId: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeDescription = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ description: value || '' }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeIngredients = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ ingredients: value || '' }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeProteins = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ proteins: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeFats = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ fats: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeCarbohydrates = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ carbohydrates: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeCalories = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ calories: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeWeight = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ weight: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeUnits = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ units: value || 'г' }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeCookingTime = useCallback((value?: string) => {
        if (value) {
            const inputTime = value;
            const [hours, minutes] = inputTime!.split(':').map(Number);
            const time = (hours ? hours * 60 * 60 : 0) + (minutes * 60 || 0);
            dispatch(ProductActions.updateProductDetails({ cookingTime: Number(time) || 0 }));
            setHasChanges(true);
        }
    }, [dispatch]);

    const handleChangePrice = useCallback((value?: string) => {
        dispatch(ProductActions.updateProductDetails({ price: Number(value) || 0 }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeActiveProduct = useCallback((value?: boolean) => {
        dispatch(ProductActions.updateProductDetails({ isActive: value || false }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeInsideFlag = useCallback((value?: boolean) => {
        dispatch(ProductActions.updateProductDetails({ availableInside: value || false }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeOutsideFlag = useCallback((value?: boolean) => {
        dispatch(ProductActions.updateProductDetails({ availableOutside: value || false }));
        setHasChanges(true);
    }, [dispatch]);

    const handleChangeDeliveryFlag = useCallback((value?: boolean) => {
        dispatch(ProductActions.updateProductDetails({ availableDelivery: value || false }));
        setHasChanges(true);
    }, [dispatch]);

    const handleSave = useCallback(async () => {
        if (!productId) {
            await dispatch(createProduct());
        } else {
            await dispatch(updateProductDetails(productId));
        }
    }, [dispatch, productId]);

    const handleCloseModal = useCallback(() => {
        onClose();
        dispatch(ProductActions.clearProductDetails());
    }, [dispatch, onClose]);

    const handleDelete = useCallback(async () => {
        if (productId) {
            await dispatch(deleteProduct(productId));
            await dispatch(fetchProducts());
            onClose();
        }
    }, [dispatch, onClose, productId]);

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={handleCloseModal}
            max
        >
            <Suspense fallback={<Loader />}>
                <ProductDetailsAsync
                    id={productId}
                    title={title}
                    onSuccess={onClose}
                    onChangeTitle={handleChangeTitle}
                    onChangeMenu={handleChangeMenu}
                    onChangeDescription={handleChangeDescription}
                    onChangeIngredients={handleChangeIngredients}
                    onChangeProteins={handleChangeProteins}
                    onChangeFats={handleChangeFats}
                    onChangeCarbohydrates={handleChangeCarbohydrates}
                    onChangeCalories={handleChangeCalories}
                    onChangeWeight={handleChangeWeight}
                    onChangeUnits={handleChangeUnits}
                    onChangeCookingTime={handleChangeCookingTime}
                    onChangePrice={handleChangePrice}
                    onChangeActive={handleChangeActiveProduct}
                    onChangeInsideFlag={handleChangeInsideFlag}
                    onChangeOutsideFlag={handleChangeOutsideFlag}
                    onChangeDeliveryFlag={handleChangeDeliveryFlag}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    hasChanges={hasChanges}
                />
            </Suspense>
        </Modal>
    );
});
