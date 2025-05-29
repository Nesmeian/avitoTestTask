import { STATIC_LABELS } from '@/constants/ui/breadCrumbs';
import { BoardType } from '@/types/queryTypes';
import { Crumb } from '@/types/uiTypes';

export function buildCrumbs(segments: string[], board?: BoardType): Crumb[] {
  return segments.map((segment, idx) => {
    const to = '/' + segments.slice(0, idx + 1).join('/');
    let label: string;

    if (segment in STATIC_LABELS) {
      label = STATIC_LABELS[segment];
    } else if (/^\d+$/.test(segment) && board) {
      label = board.name;
    } else {
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    return { to, label };
  });
}
