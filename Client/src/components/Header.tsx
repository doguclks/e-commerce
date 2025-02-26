
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const links = [
  { title: "Home", path: "/" },
  { title: "Catalog" , path: "/catalog"},
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
]

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "error.dark",
  }
}
export default function Header(){
    return (
      <AppBar position="static" sx={{mb : 4}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
          <Typography variant="h6" >E-Commerce</Typography>
          <Stack direction="row" spacing={2}>
            {links.map((link, index) => (
              <Button sx ={navStyles}key={index} component={NavLink} to={link.path} > {link.title} </Button>
            ))}
          </Stack>
          </Box>

          <Box >
            <IconButton size="large" edge="start" color="inherit" > 
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> 
      
    )
  }