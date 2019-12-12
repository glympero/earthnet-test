import React, { useEffect, useState } from 'react';
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
import { fetchData } from '../store/actions/actions';
import { isDisabled } from '../utils';
import Plot from 'react-plotly.js';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';
const useStyles = makeStyles(styles);

const Histogram = () => {
  const dispatch = useDispatch();
  const {
    wells,
    logs,
    formations,
    plots,
    selectedWellOptions,
    selectedLogOptions,
    selectedFormationOptions
  } = useSelector(
    state => ({
      wells: state.state.wells,
      logs: state.state.logs,
      formations: state.state.formations,
      plots: state.state.plots,
      selectedWellOptions: state.state.selectedWellOptions,
      selectedLogOptions: state.state.selectedLogOptions,
      selectedFormationOptions: state.state.selectedFormationOptions
    }),
    shallowEqual
  );
  const [barModeValue, onChangeBarMode] = useState(1);
  const [orientationValue, onChangeOrientation] = useState(1);
  const [selectedPlots, setPlots] = useState([]);

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
    const newSelected = [];
    plots.forEach(item => {
      if (selectedWellOptions.indexOf(item.wellId) > -1) {
        let obj = {};
        obj.type = 'histogram'
        if(orientationValue === 1){
          obj.x = item.x
        }else {
          obj.y = item.y
        }
        newSelected.push(obj);
      }
    });
    setPlots(newSelected);
  }, [plots, selectedWellOptions, orientationValue]);

  const showPlots = () => {
    dispatch(fetchData('plots'));
  };

  const classes = useStyles();
  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12} >
              <EsaPaper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Bar Mode"
                      value={barModeValue}
                      options={[
                        { key: 'stack', value: 1, text: 'stack' },
                        { key: 'group', value: 2, text: 'group' }
                      ]}
                      onChange={value => onChangeBarMode(value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Orientation"
                      value={orientationValue}
                      options={[
                        { key: 'vertical', value: 1, text: 'vertical' },
                        { key: 'horizontal', value: 2, text: 'horizontal' }
                      ]}
                      onChange={value => onChangeOrientation(value)}
                    />
                  </Grid>
                </Grid>
              </EsaPaper>
            </Grid>
          </Grid>
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
                  className={`${classes.portletContent} ${classes.normalPortletContent}`}
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
                  className={`${classes.portletContent} ${classes.normalPortletContent}`}
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
                  className={`${classes.portletContent} ${classes.shorterPortletContent}`}
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
          {selectedPlots.length > 0 ? (
            <Plot
              style={{ height: '85vh' }}
              data={selectedPlots}
              layout={{
                autosize: true,
                title: 'Wells Plot',
                useResizeHandler: true,
                barmode: barModeValue === 1 ? 'stack' : 'group'
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

export default Histogram;
