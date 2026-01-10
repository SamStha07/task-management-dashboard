import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ContainerLayout({
  children,
  className,
}: ContainerLayoutProps) {
  return (
    <div className={cn('container mx-auto px-4 md:px-5 lg:px-6', className)}>
      {children}
    </div>
  );
}
