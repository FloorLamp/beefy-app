const styles = theme => ({
  summary: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid ' + theme.palette.background.border,
    paddingTop: '24px',
    paddingBottom: '24px',
    margin: '24px 0',
    background: pool =>
      pool.status === 'eol'
        ? theme.palette.background.retired
        : pool.depositsPaused
        ? theme.palette.background.paused
        : theme.palette.background.primary,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.03, 1.03, 1)',
    },
  },
});

export default styles;
