import ContainerLayout from '@/components/layouts/container-layout';
import DashboardHeader from '../components/dashboard/dashboard-header';
import TaskList from '../components/dashboard/task-list';
import ModeToggle from '@/components/mode-toggle';

export default function TaskDashboardView() {
  return (
    <ContainerLayout className="py-10">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <DashboardHeader />
      <TaskList />
    </ContainerLayout>
  );
}
