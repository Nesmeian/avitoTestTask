export const taskListWrapperStyles = {
  templateColumns: {
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)',
  },
  gap: 4,
  w: '100%',
};
export const taskItemStyles = {
  gap: 4,
  cursor: 'pointer',
  p: { lg: '20px', base: '12px' },
  border: '1px solid rgba(0, 0, 0, 0.08)',
  h: '300px',
  borderRadius: '8px',
};
