import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import {PostsContext,CRACKS,BLEEDS,POTHOLES} from '../../contexts/PostsContext/postContext'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ClassFilterList(props) {
  const classes = useStyles();
  const{filters,setFilters}=useContext(PostsContext)

  const handleToggle = (value) => () => {
    const currentIndex = filters.indexOf(value);
    const newChecked = [...filters];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    } 
    setFilters(newChecked)
  };

  return (
    <List subheader={<ListSubheader>Filter Classes</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemText id="switch-list-label-potholes" primary="Potholes" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle(POTHOLES)}
            checked={filters.indexOf(POTHOLES) !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-potholes' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-cracks" primary="Cracks" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle(CRACKS)}
            checked={filters.indexOf(CRACKS) !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-cracks' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="switch-list-label-bleeds" primary="Bleeds" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle(BLEEDS)}
            checked={filters.indexOf(BLEEDS) !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-bleeds' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
