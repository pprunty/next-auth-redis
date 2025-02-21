import * as React from 'react';
import Image, { ImageProps } from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  HTMLDivElement,
  ImageProps & { className?: string }
>(({ className = '', alt = '', ...props }, ref) => (
  // Wrap Next.js Image in a div with relative positioning and defined dimensions.
  <div ref={ref} className="relative w-full h-full">
    <Image
      alt={alt}
      className={`object-cover w-full h-full ${className}`}
      layout="fill"
      objectFit="cover"
      {...props}
    />
  </div>
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center justify-center bg-gray-300 text-gray-700 w-full h-full ${className}`}
    {...props}
  >
    {children}
  </div>
));
AvatarFallback.displayName = 'AvatarFallback';
