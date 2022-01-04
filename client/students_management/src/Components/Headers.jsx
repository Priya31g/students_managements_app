import "./Headers.css";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const sideNavData =[{
    id:0,
    title :"Student List",
    src:"https://cdn-icons-png.flaticon.com/512/3050/3050482.png",
    components:"/studentlist"
},{id:1,
    title:"Add Student",
    src:"https://cdn-icons-png.flaticon.com/512/2583/2583145.png",
    components:"/addstudent"
},{
  id:2,
  title:"Add Contest",
  src:"https://cdn-icons-png.flaticon.com/512/2921/2921226.png",
  components:"/addcontest"
}]

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14srBumsgHaVUnkPD65P7sZOBhSRIYDwlvJ0SK1m7C_Mtv7CwEKcUOk1iM63A3oqQ4dg&usqp=CAU" alt="headers" width="25%" height="100%" />
          </Typography>

          <Typography variant="h6"  component="div">
          <span id="contest" onClick={()=>{
            history.push("/")
          }}>Contest</span>
          </Typography>

            <>
            
             <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
             <Avatar src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"{...bindTrigger(popupState)} className="account"/>
            <Menu {...bindMenu(popupState)}>

           
            <MenuItem onClick={()=>{
              popupState.close();
              history.push("/signIn");}}>
              Sign In</MenuItem>
              <MenuItem onClick={()=>{
                popupState.close();
                history.push("/signup");}}>Sign Up</MenuItem>
              <MenuItem onClick={()=>{
                popupState.close();
                localStorage.setItem("b_token",null)
              }}>Logout</MenuItem> 
            </Menu>
          
        </React.Fragment>
      )}
    </PopupState>
            </>
         

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideNavData.map((el) => (
            <ListItem button key={el.id} onClick={()=>
                history.push(el.components)
            }>
              
                
                <img src={el.src} alt="student_list" className="icon"/>
                
              <ListItemText primary={el.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
        
        </Typography>
        <Typography paragraph>
         
        </Typography>
      </Main>
    </Box>
  );
}

