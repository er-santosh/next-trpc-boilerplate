import { ChartAreaInteractive } from '@/components/features/dashboard/chart-area-interactive';
import { DataTable } from '@/components/features/dashboard/data-table';
import { SectionCards } from '@/components/features/dashboard/section-cards';

import data from './data.json';

export default function Page() {
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </>
  );
}
