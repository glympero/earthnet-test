import { setSelectedWells, setSelectedLogs, setSelectedFormations } from '../store/actions';

export const handleSelect = (value, items, list, dispatch) => {
  const currentIndex = items.indexOf(value);
  const newSelectedOptions = [...items];
  if (currentIndex === -1) {
    newSelectedOptions.push(value);
  } else {
    newSelectedOptions.splice(currentIndex, 1);
  }
  if(list === 'well') dispatch(setSelectedWells(newSelectedOptions));
  if(list === 'log') dispatch(setSelectedLogs(newSelectedOptions));
  if(list === 'formation') dispatch(setSelectedFormations(newSelectedOptions));
};

export const isSelected = (value, items) => {
  return items.includes(value);
};
