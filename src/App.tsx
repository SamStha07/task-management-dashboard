import { ErrorBoundary } from './components/error-boundary';
import TaskDashboardView from './features/tasks/views/task-dashboard-view';

function App() {
  return (
    <ErrorBoundary>
      <TaskDashboardView />
    </ErrorBoundary>
  );
}
export default App;
