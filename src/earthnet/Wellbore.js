import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { makeStyles, Grid } from '@material-ui/core';
import {
  EsaButton,
  Portlet,
  PortletContent,
  PortletHeader,
  PortletLabel,
  PortletToolbar
} from '../layouts/components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EsaList from './EsaList';
import EsaLogo from '../EsaLogo';
import styles from '../theme/styles';
import { handleSelect, isSelected } from './listFunctions';
import { fetchData, fetchSelectedPlots } from '../store/actions/actions';
import { isDisabled } from '../utils';
import Plot from 'react-plotly.js';
const useStyles = makeStyles(styles);

const Wellbore = () => {
  const dispatch = useDispatch();
  const {
    wells,
    logs,
    formations,
    plots,
    selectedPlots,
    selectedWellOptions,
    selectedLogOptions,
    selectedFormationOptions
  } = useSelector(
    state => ({
      wells: state.state.wells,
      logs: state.state.logs,
      formations: state.state.formations,
      plots: state.state.plots,
      selectedPlots: state.state.selectedPlots,
      selectedWellOptions: state.state.selectedWellOptions,
      selectedLogOptions: state.state.selectedLogOptions,
      selectedFormationOptions: state.state.selectedFormationOptions
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchData('wells'));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchData('logs'));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchData('formations'));
  }, [dispatch]);

  useEffect(() => {
    if(plots.length){
      dispatch(fetchSelectedPlots(selectedWellOptions));
    }
  }, [plots, selectedWellOptions, dispatch]);

  const showPlots = () => {
    dispatch(fetchData('plots'));
  };

  const classes = useStyles();
  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Wells" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </PortletHeader>
                <PortletContent
                  className={`${classes.portletContent} ${classes.longerPortletContent}`}
                  noPadding
                >
                  <EsaList
                    handleSelect={handleSelect}
                    list="well"
                    isSelected={isSelected}
                    selectedItems={selectedWellOptions}
                    items={wells}
                    dispatch={dispatch}
                    styles={classes.listItem}
                  />
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Logs" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </PortletHeader>
                <PortletContent
                  className={`${classes.portletContent} ${classes.longerPortletContent}`}
                  noPadding
                >
                  <EsaList
                    handleSelect={handleSelect}
                    list="log"
                    isSelected={isSelected}
                    selectedItems={selectedLogOptions}
                    items={logs}
                    dispatch={dispatch}
                    styles={classes.listItem}
                  />
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Formations" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </PortletHeader>
                <PortletContent
                  className={`${classes.portletContent} ${classes.normalPortletContent}`}
                  noPadding
                >
                  <EsaList
                    handleSelect={handleSelect}
                    list="formation"
                    isSelected={isSelected}
                    selectedItems={selectedFormationOptions}
                    items={formations}
                    dispatch={dispatch}
                    styles={classes.listItem}
                  />
                </PortletContent>
              </Portlet>
              <Grid
                className={classes.buttonWrapper}
                item
                xs={12}
                direction="column"
                container
                justify="flex-end"
              >
                <EsaButton
                  disabled={isDisabled(
                    selectedWellOptions,
                    selectedLogOptions,
                    selectedFormationOptions
                  )}
                  fullWidth
                  className={classes.button}
                  onClick={showPlots}
                >
                  Show Plot
                </EsaButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          {!isDisabled(
            selectedWellOptions,
            selectedLogOptions,
            selectedFormationOptions
          ) && selectedPlots.length > 0 ? (
            <Plot
              style={{ height: '85vh' }}
              data={selectedPlots}
              layout={{
                autosize: true,
                title: 'Wells Plot',
                useResizeHandler: true
              }}
            />
          ) : (
            <div className={classes.logoContainer}>
              <EsaLogo />
            </div>
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default Wellbore;
