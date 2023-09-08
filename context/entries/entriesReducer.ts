import { Entry } from "../../interfaces";
import { EntriesState } from "./"

type EntriesActionType = 
| { type: '[Entry] Add-Entry', paylod: Entry }
| { type: '[Entry] Entry-Updated', paylod: Entry }
| { type: '[Entry] Refresh-Data', paylod: Entry[] }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.paylod ]
            }

        case '[Entry] Entry-Updated':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.paylod._id ) {
                        entry.status = action.paylod.status;
                        entry.description = action.paylod.description
                    }
                    return entry
                })
            }

        case '[Entry] Refresh-Data':
            return {
                ...state,
                entries: [ ...action.paylod ]
            }
    
        default:
            return state;
    }

}