import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PostListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    props.onPostItemClick(props.postID);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} key={props.innerKey}>
        <ListItemIcon>
          <FeaturedPlayListOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={props.postTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.markers ? (
          <List component="div" disablePadding>
            {props.markers.map((marker) => (
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.onMarkerClick(marker.id)}
                key={marker.id}
              >
                <ListItemIcon>
                  <RoomOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    "Post ID: " +
                    marker.postID +
                    " | Classes :" +
                    marker.classes
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : null}
      </Collapse>
    </div>
  );
}
