import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logo from "../svgs/rsca_logo.png";
import { authContext } from '../../contexts/AuthContext/AuthProvider'
import './navbar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [logoutEl, setLogoutEl] = React.useState(null);
    const [postsEl, setPostsEl] = React.useState(null);
    const [userData, setUserData] = React.useState({});

    const { logout, getUsersData } = useContext(authContext);


    const logoutOpen = Boolean(logoutEl);
    const postsOpen = Boolean(postsEl);


    const handleMenuLogout = (event) => {
        setLogoutEl(event.currentTarget);
    };

    const handleCloseLogout = () => {
        setLogoutEl(null);
    };

    const handleMenuPosts = (event) => {
        setPostsEl(event.currentTarget);
    };

    const handleClosePosts = () => {
        setPostsEl(null);
    };

    useEffect(() => {
        getUsersData()
            .then(response => {
                setUserData(response.data);
                console.log(response.data, "ye wala asli")
            })
    }, [getUsersData])

    return (
        <div className={`${classes.root} navbar-container`}>

            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        <img style={{ height: "3rem", width: "4rem" }} src={Logo} alt="Logo" />
                    </Typography>
                    <div>
                        {
                            userData.user_type === "AD" && <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleMenu}
                                color="inherit"
                            >
                                <Link to='/admin'>
                                    Admin
                                </Link>
                            </IconButton>
                        }

                        {
                            (userData.user_type === "AD" || userData.user_type === "CR") && <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuPosts}
                                color="inherit"
                            >
                                <Link to="">Posts</Link>
                                <ExpandMoreIcon />
                            </IconButton>
                        }
                        {
                            (userData.user_type === "AD" || userData.user_type === "CR") && <Menu
                                id="menu-appbar"
                                anchorEl={postsEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={postsOpen}
                                onClose={handleClosePosts}
                            >
                                <MenuItem onClick={handleClosePosts}><Link to='/'>Add Post</Link></MenuItem>
                                <MenuItem onClick={handleClosePosts}><Link to='/posts/all'>Delete Post</Link></MenuItem>
                                <MenuItem onClick={handleClosePosts}>Delete Marker</MenuItem>
                            </Menu>
                        }
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={handleMenu}
                            color="inherit"
                        >
                            <Link to='/search'>
                                Search
                            </Link>

                        </IconButton>


                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuLogout}
                            color="inherit"
                        >
                            Hi, {userData.first_name}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={logoutEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={logoutOpen}
                            onClose={handleCloseLogout}
                        >
                            <MenuItem onClick={() => { handleCloseLogout(); logout(); }}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}