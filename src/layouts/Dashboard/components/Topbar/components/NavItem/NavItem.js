import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ListItem, ListItemText } from '@material-ui/core';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles';
const useStyles = makeStyles(styles);

const NavItem = ({ to, title }) => {

  const classes = useStyles();
  return (
    <ListItem
      button
      className={classnames({
        [classes.navItem]: true
      })}
      component={Link}
      to={to}
      selected={to === window.location.pathname}
    >
      <ListItemText classes={{ primary: classes.listItemText }} primary={title} />
    </ListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  to: PropTypes.string,
  title: PropTypes.string
};

export default NavItem;
