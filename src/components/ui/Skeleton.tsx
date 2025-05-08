import { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
};

export default Skeleton;