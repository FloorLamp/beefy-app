import React, { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const PoolTitle = ({ name, logo, description, url, columns = 3 }) => {
  const classes = useStyles();

  return (
    <Grid item xs={columns} className={classes.container}>
      <Avatar
        alt={name}
        variant="square"
        imgProps={{ style: { objectFit: 'contain' } }}
        src={require(`../../../../../images/${logo}`)}
      />
      <div className={classes.texts}>
        <Typography className={classes.title} variant="body2" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.subtitle} variant="body2">
          {description}
        </Typography>
      </div>
    </Grid>
  );
};

export default memo(PoolTitle);
