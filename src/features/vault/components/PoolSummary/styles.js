const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    border: '1px solid ' + theme.palette.background.border,
    paddingTop: '24px',
    paddingBottom: '24px',
    background: pool =>
      pool.status === 'eol'
        ? theme.palette.background.retired
        : pool.depositsPaused
        ? theme.palette.background.paused
        : theme.palette.background.primary,
    cursor: 'pointer',
  },
});

export default styles;
