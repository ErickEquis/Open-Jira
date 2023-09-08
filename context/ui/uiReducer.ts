import { UIState } from ".";

// Tipos de acciones que recibira uiReducer
type UIActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar' }
| { type: 'UI - Set isAddingEntry', paylod: boolean }
| { type: 'UI - Start Dragging' }
| { type: 'UI - End Dragging' }

// Funcion 'Reducer' creada para ser utilizada con hook 'useReducer'
// Recibe argumentos; 'state', recibe los tipos de estado de cada atributo usados en los metodos. 'action', es el tipo de accion asignado para cada uno de los metodos.
export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
    // Condicional que permite manejar los estados cada que se solicita algun tipo de accion (UIActionType)
    switch (action.type) {
        case "UI - Open Sidebar":
            return {
                // '...state' permite 'heredar' la informacion de 'state' (UIState) 
                ...state,
                sidemenuOpen: true,
            }
        
        case "UI - Close Sidebar":
            return {
                ...state,
                sidemenuOpen: false,
            }

        case "UI - Set isAddingEntry":
            return {
                ...state,
                isAddingEntry: action.paylod
            }
        
        case "UI - Start Dragging":
            return {
                ...state,
                isDragging: true
            }

        case "UI - End Dragging":
            return {
                ...state,
                isDragging: false
            }

        default:
            return state;
    }
}