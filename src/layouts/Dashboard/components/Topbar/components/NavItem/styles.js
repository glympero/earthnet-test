export default theme => ({
  navItem: {
    cursor: 'pointer',
    width: 'auto',
    color: theme.palette.text.secondary,
    fontWeight: 500,
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.default.light
    }
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  }
});
