import { FC, PropsWithChildren, useEffect, useReducer } from "react";


import { entriesReducer, EntriesContext } from './';
import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";


export interface EntriesState{
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {

    //     const newEntry: Entry = {
    //         _id: uuidv4,
    //         description,
    //         createAt: Date.now(),
    //         status: "pending"
    //     }

        try {

            const { data } = await entriesApi.put('/entries', { description });
            dispatch({ type: '[Entry] Add-Entry', paylod: data });

        } catch (error) {

            console.log(error)

        }
    }

    const updateEntry = async ( { _id, description, status }: Entry, showSnackBar = false ) => {

        try {

            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: "[Entry] Entry-Updated", paylod: data });

            if (showSnackBar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: "right"
                    }
                })
            }
            
        } catch (error) {
            console.log({ error })
        }
    }

    // Se ejecuta una sola vez
    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        console.log(data)
        dispatch({ type: "[Entry] Refresh-Data", paylod: data })
    }
    
    useEffect(() => {
        refreshEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Metodos

            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}