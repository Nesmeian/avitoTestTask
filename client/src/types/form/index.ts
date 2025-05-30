import { Control, FieldError } from 'react-hook-form';
export type IssueFormValues = {
  title: string;
  description: string;
  boardId: number;
  assigneeId: number;
  priority: string;
  status: string;
};
export type ControlledMenuFieldProps = {
  name: keyof IssueFormValues;
  label: string;
  list: Record<number | string, string>;
  control: Control<IssueFormValues>;
  error?: FieldError;
  isDisabled?: boolean;
};
