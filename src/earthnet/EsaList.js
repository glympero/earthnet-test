import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const EsaList = ({ styles }) => {
  const [selectedOptions, setSelect] = useState([]);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  const isSelected = value => selectedOptions.includes(value);
  return <List>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
      option => (
        <ListItem
          key={option}
          className={styles}
          selected={isSelected(option)}
          onClick={() => handleSelect(option)}
        >
          <ListItemText primary={`item-${option}`} />
        </ListItem>
      )
    )}
  </List>;
}

export default EsaList;
