import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  type ColumnDef,
} from '@tanstack/react-table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type VitalSignRow = { title: string; value: string; lastUpdated: string };
type LabResultRow = { title: string; value: string; status: 'Low' | 'Normal' | 'High' };
type ImagingRow = { title: string; status: 'Pending' | 'Finalized'; date: string; hasReport: boolean };

const VITAL_SIGNS_PLACEHOLDER: VitalSignRow[] = [
  { title: 'Arterial Oxygen Saturation (SpO₂)', value: '97%', lastUpdated: '2026/06/22' },
  { title: 'Body Temperature', value: '37.1°C', lastUpdated: '2026/06/22' },
];

const LAB_RESULTS_PLACEHOLDER: LabResultRow[] = [
  { title: 'Haemoglobin', value: '100 g/dL', status: 'Low' },
  { title: 'White Cell Count (WBC)', value: '6.8 × 10⁹/L', status: 'Normal' },
  { title: 'Platelet Count:', value: '350 10⁹/L', status: 'High' },
];

const IMAGING_PLACEHOLDER: ImagingRow[] = [
  { title: 'Knee pain', status: 'Pending', date: '2026/06/22', hasReport: false },
  { title: 'Blood test', status: 'Finalized', date: '2023/04/20', hasReport: true },
];

const statusBadgeClass: Record<string, string> = {
  Low: 'bg-caars-warning-2 text-caars-warning-1',
  Normal: 'bg-caars-success-2 text-caars-success-1',
  High: 'bg-caars-error-2 text-caars-error-1',
  Pending: 'bg-caars-warning-2 text-caars-warning-1',
  Finalized: 'bg-caars-success-2 text-caars-success-1',
};

const vitalSignsHelper = createColumnHelper<VitalSignRow>();
const vitalSignsColumns = [
  vitalSignsHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
  vitalSignsHelper.accessor('value', {
    header: 'Value',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'w-[180px] shrink-0' },
  }),
  vitalSignsHelper.accessor('lastUpdated', {
    header: 'Last updated',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
];

const labResultsHelper = createColumnHelper<LabResultRow>();
const labResultsColumns = [
  labResultsHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'w-[240px] shrink-0' },
  }),
  labResultsHelper.accessor('value', {
    header: 'Value',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
  labResultsHelper.accessor('status', {
    header: '',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full px-2 py-1 font-caars-header text-caars-body-3 leading-caars-body-3 font-semibold',
            statusBadgeClass[status],
          )}
        >
          {status}
        </span>
      );
    },
    meta: { colClass: 'flex-1 min-w-0 justify-end' },
  }),
];

const imagingHelper = createColumnHelper<ImagingRow>();
const imagingColumns = [
  imagingHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
  imagingHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full px-3 py-1.5 font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold',
            statusBadgeClass[status],
          )}
        >
          {status}
        </span>
      );
    },
    meta: { colClass: 'w-[180px] shrink-0' },
  }),
  imagingHelper.accessor('date', {
    header: 'Date',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
  imagingHelper.display({
    id: 'action',
    cell: ({ row }) =>
      row.original.hasReport ? (
        <button
          type="button"
          className="rounded-lg border-2 border-caars-neutral-grey-4 bg-caars-neutral-white px-4 py-2 font-caars-header text-caars-button-1 leading-caars-button-1 font-semibold text-caars-primary-1 tracking-caars-button-1 whitespace-nowrap"
        >
          View report
        </button>
      ) : null,
    meta: { colClass: 'flex-1 min-w-0 justify-end' },
  }),
];

export default function InvestigationResultsTab() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl">
      <Card className="border-caars-neutral-grey-4 bg-caars-neutral-grey-2 overflow-hidden rounded-2xl gap-0 pb-0">
        <CardHeader className="border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-5">
          <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
            Vital Signs & Physiological Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <InvestigationTable<VitalSignRow>
            columns={vitalSignsColumns as ColumnDef<VitalSignRow, unknown>[]}
            data={VITAL_SIGNS_PLACEHOLDER}
          />
        </CardContent>
      </Card>

      <Card className="border-caars-neutral-grey-4 bg-caars-neutral-grey-2 overflow-hidden rounded-2xl gap-0 pb-0">
        <CardHeader className="border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-5">
          <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
            Laboratory Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <InvestigationTable<LabResultRow>
            columns={labResultsColumns as ColumnDef<LabResultRow, unknown>[]}
            data={LAB_RESULTS_PLACEHOLDER}
          />
        </CardContent>
      </Card>

      <Card className="border-caars-neutral-grey-4 bg-caars-neutral-grey-2 overflow-hidden rounded-2xl gap-0 pb-0">
        <CardHeader className="border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-5">
          <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
            Imaging & Diagnostic Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <InvestigationTable<ImagingRow>
            columns={imagingColumns as ColumnDef<ImagingRow, unknown>[]}
            data={IMAGING_PLACEHOLDER}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function InvestigationTable<T>({
  columns,
  data,
}: {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex bg-caars-neutral-grey-3 shrink-0">
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className={cn(
                'flex items-center h-[46px] min-h-[46px] px-4 py-2 border-b border-caars-neutral-grey-4',
                (header.column.columnDef.meta as { colClass?: string })?.colClass ?? 'flex-1 min-w-0',
              )}
            >
              {!header.isPlaceholder && (
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-6 whitespace-nowrap">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </span>
              )}
            </div>
          )),
        )}
      </div>
      <div className="overflow-x-clip overflow-y-auto">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center w-full border-b border-caars-neutral-grey-3 min-h-[52px] cursor-pointer last:border-b-0"
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className={cn(
                  'flex items-center min-h-[52px] px-4 py-3',
                  (cell.column.columnDef.meta as { colClass?: string })?.colClass ?? 'flex-1 min-w-0',
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
