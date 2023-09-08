import { GetServerSideProps } from 'next'

import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize, useTheme } from "@mui/material"
import { Layout } from "../../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from "../../../interfaces";
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { dbEntries } from '../../../database';
import { EntriesContext } from '../../../context/entries';

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
    entry: Entry
}

// Aqui caen props de SSR
export const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext( EntriesContext )
    
    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status );
    const [touched, setTouched] = useState(false);
    const isNotValue = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => (
        
        setInputValue( event.target.value )

    )

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {

        console.log( event.target.value );
        setStatus( event.target.value as EntryStatus )

    }

    const onSave = () => {

        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {

            ...entry,
            status,
            description: inputValue

        }

        // console.log({ inputValue, status });
        updateEntry( updatedEntry, true )

    }


  return (


    <Layout title={ inputValue.substring(0, 20) + '...' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada hace: ${ entry.createAt } minutos`}
                            />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={ inputValue }
                                onBlur={ () => setTouched( true ) }
                                onChange={ onInputValueChanged }
                                helperText={ isNotValue && 'Ingrese un valor' }
                                error={ isNotValue }
                                />
                            
                            <FormControl>
                                <RadioGroup
                                    row
                                    value={ status }
                                    onChange={ onStatusChanged }
                                >
                                    {

                                        validStatus.map( option => (
                                            <FormControlLabel
                                                key={ option }
                                                value={ option }
                                                control={ <Radio/> }
                                                label={ capitalize(option) }
                                            />
                                        ))

                                    }
                                </RadioGroup>
                            </FormControl>

                            
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={ <SaveOutlinedIcon/> }
                                variant="contained"
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'red'
        }}>
            <DeleteOutlinedIcon/>
        </IconButton>

    </Layout>

  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// Genera la pagina el servidor cada que el usuario la solicita. Si un millon de usuarios la solicita se renderizara esa misma cantidad de veces
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // const { data } = await  // your fetch function here 

    // ctx contiene informacion sobre la request
    // console.log( params )

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    // Si el Id no pertence a la BD redireccion a Home y no permite que se cargue la pagina.
    if ( !entry ) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
        
    }

    return {
        // Props son mandadas al componente principal
        props: {
            entry
        }
    }
}

export default EntryPage