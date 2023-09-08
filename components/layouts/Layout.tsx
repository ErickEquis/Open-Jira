import { FC, ReactNode } from "react"

import Head from "next/head"
import { Box } from "@mui/material"

import { NavBar, SideBar } from "../ui"

// Interfaz que permite tipado TS
interface Props {
    title?: string
    children: ReactNode
}

// 'Layout': permite estilizar. Recibe props 'title' y 'children'
export const Layout: FC<Props> = ({ title =  'Open-Jira', children }) => {
  return (
    // Componente propio de 'ui/material'
    // Estiliza las entradas
    <Box sx={{ flexFlow: 1 }}>
        {/* 'Head' (next): permite sobre escribir <head>(HTML) */}
        <Head>
            <title>{ title }</title>
        </Head>
        {/* Componente creado para mostrar barra de navegacion */}
        <NavBar/>
        {/* Componente creado para mostrar barra de menu lateral  */}
        <SideBar/>
        <Box sx={{ padding: '10px 20px'}}>
            {/* Prop que recibe componentes y codigo */}
            { children }
        </Box>
    </Box>
  )
}

export default Layout