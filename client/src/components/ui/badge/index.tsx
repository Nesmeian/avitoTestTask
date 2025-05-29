import { BADGE_STATUS } from '@/constants/ui/Badge';
import { BadgeProps } from '@/types/uiTypes';
import { Badge as BadgeComponent } from '@chakra-ui/react';

export const Badge = ({ status }: BadgeProps) => (
  <BadgeComponent p="10px" colorScheme={BADGE_STATUS[status]}>
    {status}
  </BadgeComponent>
);
