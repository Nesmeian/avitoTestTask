export const loaderOverlayStyles = {
  h: '100vh',
  w: '100vw',
  bg: 'rgba(0, 0, 0, 0.7)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
} as const;
export const loaderWrapperStyles = {
  h: { lg: '206px', base: '136px' },
  w: { lg: '206px', base: '136px' },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)',
};
