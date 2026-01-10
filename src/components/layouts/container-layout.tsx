import React from 'react';

interface ContainerLayoutProps {
  children: React.ReactNode;
}

export default function ContainerLayout({ children }: ContainerLayoutProps) {
  return (
    <div className="container mx-auto px-4 md:px-5 lg:px-6">{children}</div>
  );
}
