import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Dashboard from '../layouts/Dashboard/Dashboard';
import {  makeStyles, Grid } from '@material-ui/core';
import { EsaButton, Portlet, PortletContent, PortletHeader, PortletLabel, PortletToolbar } from '../layouts/components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EsaList from './EsaList';
import EsaLogo from '../EsaLogo';
import styles from '../theme/styles'
import { handleSelect, isSelected } from './listFunctions';
import { fetchData } from '../store/actions/actions';
import { isDisabled, hasData } from '../utils'
const useStyles = makeStyles(styles);

const  Wellbore = () => {
  const dispatch = useDispatch();
  const { wells, logs, formations, selectedWellOptions, selectedLogOptions, selectedFormationOptions } = useSelector(state => ({
    wells: state.state.wells,
    logs: state.state.logs,
    formations: state.state.formations,
    selectedWellOptions: state.state.selectedWellOptions,
    selectedLogOptions: state.state.selectedLogOptions,
    selectedFormationOptions: state.state.selectedFormationOptions
  }), shallowEqual);

  useEffect(() => {
    if(!hasData(wells, logs, formations)){
      dispatch(fetchData('wells'));
      dispatch(fetchData('logs'));
      dispatch(fetchData('formations'));
    }
  });

  const classes = useStyles();
  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={12} container spacing={2}>
            <Grid item xs={7} md={2}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Wells" />
                  <PortletToolbar>
                    <MoreVertIcon />
                  </PortletToolbar>
                </PortletHeader>
                <PortletContent className={`${classes.portletContent} ${classes.longerPortletContent}`} noPadding>
                  <EsaList
                    handleSelect={handleSelect}
                    list='well'
                    isSelected={isSelected}
                    selectedItems={selectedWellOptions}
                    items={wells}
                    dispatch={dispatch}
                    styles={classes.listItem}
                  />
                </PortletContent>
              </Portlet>
            </Grid>
          <Grid item xs={7} md={2}>
            <Portlet>
              <PortletHeader className={classes.header}>
                <PortletLabel title="Logs" />
                <PortletToolbar>
                  <MoreVertIcon />
                </PortletToolbar>
              </PortletHeader>
              <PortletContent className={`${classes.portletContent} ${classes.longerPortletContent}`} noPadding>
                <EsaList
                  handleSelect={handleSelect}
                  list='log'
                  isSelected={isSelected}
                  selectedItems={selectedLogOptions}
                  items={logs}
                  dispatch={dispatch}
                  styles={classes.listItem}
                />
              </PortletContent>
            </Portlet>
          </Grid>
          <Grid item xs={7} md={2}>
            <Portlet>
              <PortletHeader className={classes.header}>
                <PortletLabel title="Formations" />
                <PortletToolbar>
                  <MoreVertIcon />
                </PortletToolbar>
              </PortletHeader>
              <PortletContent className={`${classes.portletContent} ${classes.normalPortletContent}`} noPadding>
                <EsaList
                  handleSelect={handleSelect}
                  list='formation'
                  isSelected={isSelected}
                  selectedItems={selectedFormationOptions}
                  items={formations}
                  dispatch={dispatch}
                  styles={classes.listItem}
                />
              </PortletContent>
            </Portlet>
            <div className={classes.buttonWrapper}>
              <EsaButton
                disabled={isDisabled(selectedWellOptions, selectedLogOptions, selectedFormationOptions)}
                fullWidth
                className={classes.button}>
                Show Plot
              </EsaButton>
            </div>
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

export default Wellbore;
