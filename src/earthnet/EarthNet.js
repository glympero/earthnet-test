import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EsaLogo from '../EsaLogo';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton,
  PortletToolbar
} from '../layouts/components';

import styles from '../theme/styles'

const useStyles = makeStyles(styles);

const EarthNet = () => {
  const classes = useStyles();
  const [singleValue, onChangeSingle] = useState(1);
  const [multiValue, onChangeMulti] = useState([]);

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container spacing={2}>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant="body1">* Usage of Paper</Typography>
              <EsaPaper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="single select"
                      value={singleValue}
                      options={[
                        { key: 'one', value: 1, text: 'one' },
                        { key: 'two', value: 2, text: 'two' }
                      ]}
                      onChange={value => onChangeSingle(value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <EsaSelect
                      isMulti
                      label="single select"
                      value={multiValue}
                      options={[
                        { key: 'one', value: 1, text: 'one' },
                        { key: 'two', value: 2, text: 'two' }
                      ]}
                      onChange={value => onChangeMulti(value)}
                    />
                  </Grid>
                </Grid>
              </EsaPaper>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">* Usage of Portlet</Typography>
            </Grid>
            <Grid item xs={5}>
              <Portlet>
                <PortletHeader>
                  <PortletLabel title="Title" />
                </PortletHeader>
                <PortletContent>
                  Portlet Content:
                  <EsaButton fullWidth className={classes.button}>
                    Click me
                  </EsaButton>
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={7}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Title" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>

                </PortletContent>
              </Portlet>
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
