import { FC, PropsWithChildren, useReducer } from 'react'
import { UIContext, uiReducer } from './';

// 'Provider' sera el encargado de tener toda la informacion que sera proveida a los demas componentes envueltos en él

// Interfaz que permite tipar TS
export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean
}

// Constante que da estado inicial a los atributos
const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    // -------------------Hook reducer. Estudiar.
    // 'useReducer' permite manejar estados complejos con funciones de logica
    // 'state':
    // 'dispatch':
    // 'iuReducer' contiene la logica que decide cada accion.
    // 'UI_INITIAL_STATE' contiene los estadps inciales de los atributos y sera modificados por 'uiReducer'
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    // closeSideMenu
    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    
    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - Set isAddingEntry', paylod: isAdding })
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' })
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' })
    }

    return (
        // '.Provider' le dice al componente que sera el proveedor
        <UIContext.Provider value={{
            // Elementos a los cuales los componentes envueltos tendran acceso
            ...state,

            // Metodos
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDragging,
            endDragging

        }}>
            { children }
        </UIContext.Provider>
    )
}