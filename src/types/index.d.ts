export interface ITask {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  error?: Error | null;
}

export interface TaskInputProps {
  placeholder: string;
  buttonText: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
}
