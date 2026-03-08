import { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { fetchPatientDocuments } from './api';
import type { PatientDocument, PatientDocumentStatus } from './types';

const DEMO_DOCUMENT_TITLE = 'ENT Clinic Letter';
const DEMO_DOCUMENT_URL = '/example.pdf';

function openDocumentIfAvailable(doc: PatientDocument) {
  if (doc.title === DEMO_DOCUMENT_TITLE) {
    window.open(DEMO_DOCUMENT_URL, '_blank', 'noopener,noreferrer');
  }
}

const statusBadgeClass: Record<PatientDocumentStatus, string> = {
  Available: 'bg-caars-success-2 text-caars-success-1',
  Pending: 'bg-caars-warning-2 text-caars-warning-1',
  Unavailable: 'bg-caars-error-2 text-caars-error-1',
};

const columnHelper = createColumnHelper<PatientDocument>();

const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'w-[180px] shrink-0' },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full px-3 py-1.5 font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold',
            statusBadgeClass[status as PatientDocumentStatus],
          )}
        >
          {status}
        </span>
      );
    },
    meta: { colClass: 'w-[180px] shrink-0' },
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'w-[180px] shrink-0' },
  }),
  columnHelper.accessor('previousSummaries', {
    header: 'Previous Summaries',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
  columnHelper.accessor('date', {
    header: 'Patient Documents',
    cell: (info) => (
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
        {info.getValue()}
      </span>
    ),
    meta: { colClass: 'flex-1 min-w-0' },
  }),
];

export interface PatientDocumentsTabProps {
  patientId: string;
}

export default function PatientDocumentsTab({ patientId }: PatientDocumentsTabProps) {
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPatientDocuments(patientId)
      .then((data) => {
        if (!cancelled) setDocuments(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const table = useReactTable({
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-caars-neutral-white px-8 py-6">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
          Loading documents...
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-caars-neutral-white px-8 py-6">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-caars-neutral-grey-4 bg-caars-neutral-white">
        <div className="flex w-full shrink-0 bg-caars-neutral-grey-3 px-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={cn(
                  'flex h-[46px] min-h-[46px] items-center border-b border-caars-neutral-grey-4 px-4 py-2',
                  (header.column.columnDef.meta as { colClass?: string })?.colClass ?? 'flex-1 min-w-0',
                )}
              >
                {!header.isPlaceholder && (
                  <span className="whitespace-nowrap font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-6">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                )}
              </div>
              ))}
            </div>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-x-clip overflow-y-auto">
          {table.getRowModel().rows.length === 0 ? (
            <div className="flex min-h-[120px] items-center justify-center">
              <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                No documents found
              </span>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                onClick={() => openDocumentIfAvailable(row.original)}
                className={cn(
                  'flex w-full shrink-0 cursor-pointer items-center border-b border-caars-neutral-grey-3 px-2 transition-colors last:border-b-0',
                  row.original.title === DEMO_DOCUMENT_TITLE &&
                    'hover:bg-caars-neutral-grey-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-caars-primary-1/40',
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className={cn(
                      'flex min-h-[52px] items-center px-4 py-3',
                      (cell.column.columnDef.meta as { colClass?: string })?.colClass ?? 'flex-1 min-w-0',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
