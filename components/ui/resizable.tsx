'use client';

import { GripVertical } from 'lucide-react';
import { Group, Panel, GroupProps, Separator } from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizablePanelGroup = ({ className, ...props }: GroupProps) => (
  <Group
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
);

const ResizablePanel = Panel;

export { ResizablePanelGroup, ResizablePanel };
