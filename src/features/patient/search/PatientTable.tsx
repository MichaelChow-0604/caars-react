import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import type { Patient } from '../types';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<Patient>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: { width: 'flex-1 min-w-[100px]' },
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => info.getValue(),
    meta: { width: 'flex-1 min-w-[100px]' },
  }),
  columnHelper.accessor('dob', {
    header: 'DOB',
    cell: (info) => info.getValue(),
    meta: { width: 'flex-1 min-w-[100px]' },
  }),
  columnHelper.accessor('nhsNumber', {
    header: 'NHS Number',
    cell: (info) => info.getValue(),
    meta: { width: 'flex-1 min-w-[100px]' },
  }),
  columnHelper.accessor('lastAppointment', {
    header: 'Last Appointment',
    cell: (info) => info.getValue(),
    meta: { width: 'flex-1 min-w-[100px]' },
  }),
];

interface PatientTableProps {
  data: Patient[];
  onRowClick?: (patient: Patient) => void;
}

export function PatientTable({ data, onRowClick }: PatientTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto">
      <div className="w-full min-w-max">
        <div className="flex bg-caars-neutral-grey-3 border-b border-caars-neutral-grey-4 shrink-0 px-2 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={cn(
                    'flex items-center h-[46px] min-h-[46px] px-4 py-2 border-b border-caars-neutral-grey-4 shrink-0',
                    (header.column.columnDef.meta as { width?: string })?.width ?? 'flex-1 min-w-[100px]',
                  )}
                >
                  <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-6 whitespace-nowrap">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            role="button"
            tabIndex={0}
            className={cn(
              'flex items-center w-full border-b border-caars-neutral-grey-3 cursor-pointer transition-colors px-2',
              'hover:bg-caars-neutral-grey-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-caars-primary-1/40',
            )}
            onClick={() => onRowClick?.(row.original)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onRowClick?.(row.original);
              }
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className={cn(
                  'flex items-center min-h-[52px] px-4 py-3 shrink-0',
                  (cell.column.columnDef.meta as { width?: string })?.width ?? 'flex-1 min-w-[100px]',
                )}
              >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-black">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
