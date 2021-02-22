const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.primary,
    padding: '24px',
    border: '1px solid ' + theme.palette.background.border,
  },
  summary: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  statusIcon: {
    marginRight: '.5rem',
  },
  status: {
    padding: '24px',
    marginBottom: '8px',
    background: pool =>
      pool.status === 'eol'
        ? theme.palette.background.retired
        : pool.depositsPaused
        ? theme.palette.background.paused
        : theme.palette.background.primary,
  },
  description: {
    padding: '8px',
  },
});

export default styles;
