import MuiDrawer from '@mui/material/Drawer'

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';
import { List, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const drawerWidth = process.env.REACT_APP_DRAWER_WIDTH;

const menu = [
 {title:'Dashboard', icon:<DashboardIcon/> , path:'/stock/dashboard'},
 {title:'Products', icon:<InventoryIcon/> , path:'/stock/products'},
 {title:'Sales', icon:<ReceiptIcon/> , path:'/stock/sales'},
 {title:'Purchases', icon:<ShoppingCartIcon/> , path:'/stock/purchases'},
 {title:'Firms', icon:<AccountBalanceIcon/> , path:'/stock/firms'},
 {title:'Brands', icon:<StarsIcon/> , path:'/stock/brands'},
 {title:'Categories', icon:<CategoryIcon/> , path:'/stock/categories'},

]

const Drawer = styled(MuiDrawer)(({theme, open})=>({
"& .MuiDrawer-paper":{
  position:'relative', 
  whiteSpace:'noWrap',
  width:`${drawerWidth}px`,
  backgroundColor: '#1976D2',
  boxSizing:"border-box",
  transition: theme.transitions.create("width"),
  ...(!open && {
    width: theme.spacing(7),
    overflowX:'hidden',
    transition: theme.transitions.create('width')
  }),
}
}))


export default function Sidebar() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
<Drawer open={sidebarOpen} variant='permanent'>
  <Toolbar/>
  <List sx={{color:'white'}} component="nav">

    {menu.map((item)=>(
      <ListItemButton key={item.title} component={NavLink} to={item.path} title={item.title}>
        <ListItemIcon sx={{color:'white'}}> {item.icon}</ListItemIcon>
        <ListItemText primary={item.title}/>
      </ListItemButton>
    ))}
  </List>
</Drawer>
  )
}
