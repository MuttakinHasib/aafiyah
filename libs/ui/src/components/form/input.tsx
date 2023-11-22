import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';
import { cn } from '../../utils';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement & HTMLInputElement>,
  HTMLInputElement & HTMLTextAreaElement
> & {
  error?: string;
};

export const Input = forwardRef(
  (
    props: InputProps,
    ref: ForwardedRef<HTMLTextAreaElement & HTMLInputElement>
  ) => {
    const { className, error, ...rest } = props;
    return (
      <div className="space-y-2 w-full">
        {rest.type === 'textarea' ? (
          <textarea
            rows={5}
            {...rest}
            ref={ref}
            className={cn(
              'bg-gray-100 w-full border-gray-100 px-3 py-[6px] focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none',
              className
            )}
          ></textarea>
        ) : (
          <input
            {...rest}
            ref={ref}
            className={cn(
              'bg-gray-100 w-full border-gray-100 px-3 py-[6px] focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none',
              className
            )}
          />
        )}
        <small
          className={cn('text-red-500 inline-block animate__animated', {
            animate__headShake: error,
          })}
        >
          {error}
        </small>
      </div>
    );
  }
);
