export const taskListWrapperStyles = {
  templateColumns: {
    base: '1fr',
    lg: 'repeat(2, 1fr)',
    xl: 'repeat(3, 1fr)',
    '2xl': 'repeat(4, 1fr)',
  },
  justifyItems: 'center',
  gap: 4,
  w: '100%',
};
export const taskItemStyles = {
  gap: 4,
  cursor: 'pointer',
  p: { lg: '20px', base: '12px' },
  border: '1px solid rgba(0, 0, 0, 0.08)',
  maxW: {
    '2xl': '350px',
    xl: '400px',
    lg: '500px',
    md: '600px',
    base: '360px',
  },
  h: '300px',
  borderRadius: '8px',
};
