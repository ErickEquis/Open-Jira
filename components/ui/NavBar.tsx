import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { useContext } from "react"
import { UIContext } from "../../context/ui"
import NextLink from "next/link"

export const NavBar = () => {

  // Destructuracion de 'Context'
  // 'openSideMenu' creado en 'UIContext' para que pueda ser usado por NavBar sin importar su nivel en el arbol de componentes
  // Hook 'useConext' permite utilizar el 'context'. Se puede destructurar para ocupar solo lo necesario 
  const { openSideMenu } = useContext( UIContext )

  return (
    // Componentes propios de next y ui/material que permiten estilizar NavBar
    <AppBar position="sticky" elevation={ 0 }>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                // Uso de metodo creado en 'conext'
                onClick={ openSideMenu }
            >
              {/* Uso de iconos 'ui/material' */}
              <MenuOutlined/>
            </IconButton>
            <NextLink href='/' passHref>
              <Link underline="none" color='white'>
                <Typography variant="h6">Open-Jira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar