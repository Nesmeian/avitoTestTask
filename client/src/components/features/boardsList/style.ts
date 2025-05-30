export const boardItemStyles = {
  width: '100%',
  templateColumns: { md: '1fr 1fr 160px', base: '1fr' },
  p: '20px',
  alignItems: 'center',
  shadow: 'md',
  _hover: { shadow: 'lg' },
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'md',
} as const;
