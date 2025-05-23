// public taskList = [
//   { id: '123', title: 'tarea 1', dueDate: '12/09/1989' },
//   { id: '234', title: 'tarea 2', dueDate: '12/09/1989' },
//   { id: '546', title: 'tarea 3', dueDate: '12/09/1989' },
// ];

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  expired?: boolean
}

export type TaskListType = Task[];
