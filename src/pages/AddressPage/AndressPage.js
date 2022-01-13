import React, {useContext, useEffect, useState} from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, IconButton, Toolbar, AppBar } from '@material-ui/core';
import { Container } from "./styled";
import useForm from "../../hooks/useForm";
import GlobalStateContext from "../../contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";

const useStyles1 = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

}));

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '85%',
        },
    },
    margin: {
        margin: theme.spacing(1),
        width: '85%',

    },
    withoutLabel: {
        marginTop: theme.spacing(1),
        width: '85%',
        textTransform: "none",
    },
    botao: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

const AndressPage = () => {
    const classes = useStyles();
    const {states,setters,requests} = useContext(GlobalStateContext)
    const [form, onChange] = useForm(
        states.user.address ||
        {
            street: "",
            number: "",
            neighbourhood: "",
            city: "",
            state: "",
            complement: ""
        }
        )
        const [loading, setLoading] = useState(false)
        const [values, setValues] = useState({
            name: '',
            email: '',
            password: '',
        });
    const navigate = useNavigate()

    const title = states.user.address? <></> : <p>Meu endereço</p>

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        setLoading(true)
        
        requests.putAdress(form,setLoading,navigate)

    }


    return (
        <Container>
            {/* <header>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes1.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>
            </header> */}
            {
                loading
                ?<h1>Atualizando</h1>
                :<>
                    {title}

                    <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit}>

                        <TextField
                            id="filled-textarea"
                            value={form.street}
                            name="street"
                            onChange={onChange}
                            label="Logradouro"
                            placeholder="Rua / Av."
                            multiline
                            variant="outlined"
                            required
                        />
                        <TextField
                            id="outlined-number"
                            label="Número"
                            type="number"
                            variant="outlined"
                            value={form.number}
                            name="number"
                            onChange={onChange}
                            placeholder="Número"
                            required
                        />

                        <TextField
                            id="filled-textarea"
                            value={form.complement}
                            name="complement"
                            onChange={onChange}
                            label="Complemento"
                            placeholder="Apto. / Bloco"
                            variant="outlined"
                            
                        />
                        <TextField
                            id="filled-textarea"
                            value={form.neighbourhood}
                            name="neighbourhood"
                            onChange={handleChange('name')}
                            label="Bairro"
                            placeholder="Bairro"
                            multiline
                            variant="outlined"
                            required
                        />
                        <TextField
                            id="filled-textarea"
                            value={form.city}
                            name="city"
                            onChange={onChange}
                            label="Cidade"
                            placeholder="Cidade"
                            multiline
                            variant="outlined"
                            required
                        />
                        <TextField
                            id="filled-textarea"
                            value={form.state}
                            name="state"
                            onChange={onChange}
                            label="Estado"
                            placeholder="Ex: DF"
                            multiline
                            variant="outlined"
                            required
                        />
                        <>
                            <Button variant="contained" color="primary" className={classes.withoutLabel} type="submit" >
                                Salvar
                            </Button>
                        </>
                    </form >
                </>


            }
        </Container>
    )
}

export default AndressPage