import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export default function TaskTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-5 w-5" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[19.2px] w-[170px] lg:w-[380px]" />
            <Skeleton className="mt-2 h-4 w-[170px] lg:w-[380px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="ml-auto h-8 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
