import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import { PostsContext } from "../../contexts/PostsContext/postContext";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function PostListItem(props) {
  const {
    removePostFromFilteredPosts,
    importPostFromFilteredPosts,
    showAll,
  } = useContext(PostsContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(showAll);



  const handleClick = () => {
    console.log("handle click called");
    if (!checked) {
      return;
    } else {
      setOpen(!open);
      props.onPostItemClick(props.postID, checked);
    }

  };

  const handleCheckChange = () => {
    setOpen(!checked)
    if(checked){
      removePostFromFilteredPosts(props.postID)
    }else{
      importPostFromFilteredPosts(props.postID)
    }
    setChecked(!checked);
  };


  useEffect(()=>{
    setChecked(showAll)
    setOpen(false)
  },[showAll])

  return (
    <div>
      <ListItem button key={props.innerKey}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": props.postID }}
            onChange={handleCheckChange}
          />
        </ListItemIcon>
        <ListItemText primary={props.postTitle} id={props.postID} onClick={handleClick} />
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
