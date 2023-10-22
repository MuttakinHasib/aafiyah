import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
    {...rest}
      className={cn(
        'bg-gray-100 w-full border-gray-100 px-3 py-2 rounded focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none',
        className
      )}
    />
  );
};
