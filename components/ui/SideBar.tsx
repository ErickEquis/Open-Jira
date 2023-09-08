import { Box, Drawer, List, Typography, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';

// Arreglo de opciones del menu desplegable
const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const SideBar = () => {
    
    // Uso de metodos creados en 'context'
    const { sidemenuOpen, closeSideMenu } = useContext( UIContext )
  
        return (
            // Estilo de menu
            <Drawer
                anchor="left"
                open= { sidemenuOpen }
                onClose={ closeSideMenu }
            >
                <Box sx={{ width: 250}}>
                    <Box sx={{ padding: '5px 10px'}}>
                        <Typography variant="h4">Menú</Typography>
                    </Box>

                    <List>
                        {
                            menuItems.map( (text, index) =>(
                                <ListItemButton key={ text }>
                                    <ListItemIcon>
                                        { index % 2 ? <InboxOutlinedIcon/> : <EmailOutlinedIcon/> }                                
                                    </ListItemIcon>
                                    <ListItemText>{ text }</ListItemText>
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Box>

            </Drawer>
        )
}
