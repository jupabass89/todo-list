export interface Task {
  id: string;
  title: string;
  dueDate: string;
  expired?: boolean;
}

export type TaskListType = Task[];
