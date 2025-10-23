"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const Separator = ({ className, ...props }: SeparatorProps) => {
  return <hr className={cn('border-t', className)} {...props} />;
};

export { Separator };
