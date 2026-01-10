import { SlidersHorizontal } from 'lucide-react';
import useToogle from '@/hooks/use-toogle';
import TaskFilters from './task-filters';
import TaskSort from './task-sort';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../components/ui/drawer';
import { Button } from '../../../components/ui/button';

export const TaskFilterDrawer = () => {
  const { open, setOpen } = useToogle();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters & Sort
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters & Sort</DrawerTitle>
          <DrawerDescription>
            Filter and sort your tasks to find what you need
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Status Filter Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Status
            </h3>
            <TaskFilters />
          </div>

          {/* Sort Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Sort
            </h3>
            <TaskSort />
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
