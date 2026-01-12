import ContainerLayout from '@/components/layouts/container-layout';
import DashboardHeader from '../components/dashboard/dashboard-header';
import TaskList from '../components/dashboard/task-list';

export default function TaskDashboardView() {
  return (
    <ContainerLayout className="py-10">
      <DashboardHeader />
      <TaskList />
    </ContainerLayout>
  );
}
