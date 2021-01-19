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
    setSelectedPostID
  } = useContext(PostsContext);
  const classes = useStyles();
  const [checked, setChecked] = React.useState(showAll);


  const handleClick = () => {
    console.log("handle click called");
    if (!checked) {
      return;
    } else {
      props.onPostItemClick(props.postID, checked);
    }

  };

  const handleCheckChange = () => {

    if(checked){
      setSelectedPostID(-1)
      removePostFromFilteredPosts(props.postID)
    }else{
      setSelectedPostID(props.postID)
      importPostFromFilteredPosts(props.postID)
    }
    setChecked(!checked);
  };


  useEffect(()=>{
    setChecked(showAll)
    setSelectedPostID(-1)
  },[showAll])

  return (
    <div>
      <ListItem button key={props.innerKey} selected={props.selected} autoFocus={props.selected}>
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
        {(props.selected) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={(props.selected)} timeout="auto" unmountOnExit>
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
