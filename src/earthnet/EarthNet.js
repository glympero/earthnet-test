import React  from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import EsaLogo from '../EsaLogo';

import styles from '../theme/styles'

const useStyles = makeStyles(styles);

const EarthNet = () => {
  const classes = useStyles();

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container spacing={2}>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h2">Welcome to Earthnet.</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className={classes.logoContainer}>
            <EsaLogo />
          </div>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default EarthNet;
