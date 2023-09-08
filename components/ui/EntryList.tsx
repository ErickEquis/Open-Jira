import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../interfaces"
import { FC, useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import style from "./EntryList.module.css"

interface Props {
    status: EntryStatus;
}


export const EntryList: FC<Props> = ({ status }) => {

    // console.log(status)

    const { entries, updateEntry } = useContext( EntriesContext )
    const { isDragging, endDragging } = useContext( UIContext )

    const entriesByStatus = useMemo( () => entries.filter ( entry => entry.status === status ) , [ entries ] )

    const allowDrop = ( event: DragEvent ) => {
        event.preventDefault()
    }

    const onDropEntry = ( event: DragEvent ) => {
        // console.log(event)
        const id = event.dataTransfer.getData('text')
        // console.log({ id })
        const entry = entries.find( e => e._id === id )!
        entry.status = status
        updateEntry( entry )
        endDragging()
    }

    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? style.dragging : "" }
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px', '&::-webkit-scrollbar': { display: 'none' }}}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ) )
                    }
                </List>
            </Paper>
        </div>
    )
}
