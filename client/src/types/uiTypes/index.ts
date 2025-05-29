export interface Crumb {
  to: string;
  label: string;
}
type BadgeStatusDifficulty = 'Low' | 'Medium' | 'High';
type BadgeStatusProgress = 'Backlog' | 'InProgress' | 'Done';
export type BadgeProps = {
  status: BadgeStatusDifficulty | BadgeStatusProgress;
};
