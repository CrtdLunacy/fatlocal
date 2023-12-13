import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(
        'loadingio-spinner-ellipsis-uw59fjnr19',
        {},
        [className],
    )}
    >
        <div className="ldio-9pnd59mcdtk">
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);
