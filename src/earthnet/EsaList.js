import React  from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const EsaList = ({ items, styles, handleSelect, isSelected, selectedItems, list, dispatch }) => {
  return <List>
    {items.map(
      option => (
        <ListItem
          key={option.id}
          className={styles}
          selected={isSelected(option.id, selectedItems)}
          onClick={() => handleSelect(option.id, selectedItems, list, dispatch)}
        >
          <ListItemText primary={option.name ? option.name : option.log} />
        </ListItem>
      )
    )}
  </List>;
}

export default EsaList;
