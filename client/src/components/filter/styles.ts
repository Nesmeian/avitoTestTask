export const filterMenuBtnStyles = {
  height: '100%',
  w: '234px',
  background: 'white',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  fontSize: '17.5px',
  textAlign: 'left',
  _active: {
    background: 'white',
    border: '1px solid #c4ff61',
    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
  _hover: { background: 'white' },
} as const;
