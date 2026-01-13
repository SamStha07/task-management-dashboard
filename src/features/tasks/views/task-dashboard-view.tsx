import ContainerLayout from '@/components/layouts/container-layout';
import ModeToggle from '@/components/mode-toggle';
import DashboardHeader from '../components/dashboard/dashboard-header';
import TaskTableList from '../components/dashboard/task-table-list';
import { ErrorBoundary } from '@/components/error-boundary';

export default function TaskDashboardView() {
  return (
    <ContainerLayout className="py-10">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <ErrorBoundary className="min-h-auto">
        <DashboardHeader />
      </ErrorBoundary>
      <ErrorBoundary className="min-h-auto">
        <TaskTableList />
      </ErrorBoundary>
    </ContainerLayout>
  );
}
