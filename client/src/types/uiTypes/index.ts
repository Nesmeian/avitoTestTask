import { ButtonProps } from '@chakra-ui/react';

export interface Crumb {
  to: string;
  label: string;
}
type BadgeStatusDifficulty = 'Low' | 'Medium' | 'High';
type BadgeStatusProgress = 'Backlog' | 'InProgress' | 'Done';
export type BadgeProps = {
  status: BadgeStatusDifficulty | BadgeStatusProgress;
};
export type DrawerType = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};
export type IssuesFormMenuType = {
  title: string | number;
  list: Record<number | string, string>;
  onSelect?: (value: string) => void;
  buttonProps?: ButtonProps;
  isDisabled?: boolean;
};
