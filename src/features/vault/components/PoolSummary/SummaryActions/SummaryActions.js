import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const SummaryActions = () => {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid item container justify="flex-end" alignItems="center" spacing={2}>
        <Hidden mdDown>
          <Grid item>
            <IconButton
              classes={{
                root: classes.icon,
              }}
            >
              <i className={'fas fa-arrow-right'} />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default memo(SummaryActions);
