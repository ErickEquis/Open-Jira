import { createContext } from "react"

// Interfaz que permite pasar toda la informacion a los componentes que ocupen el 'context'
interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean

    // Metodos
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void
    startDragging: () => void
    endDragging: () => void
}

// Context: permite mandar argumentos a distintos componentes que se encuentren en un mismo nivel 
export const UIContext = createContext( {} as ContextProps )