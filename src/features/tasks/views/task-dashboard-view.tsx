import ContainerLayout from '@/components/layouts/container-layout';
import ModeToggle from '@/components/mode-toggle';
import DashboardHeader from '../components/dashboard/dashboard-header';
import TaskTableList from '../components/dashboard/task-table-list';

export default function TaskDashboardView() {
  return (
    <ContainerLayout className="py-10">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <DashboardHeader />
      <TaskTableList />
    </ContainerLayout>
  );
}
