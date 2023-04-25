import {Grid} from '@mui/material'
import React from 'react'
import {useForm} from 'react-hook-form'

type Formvalue = {
    firstname : string
    lastname: string
    email:string
    password:string
}

const Signin: React.FC = () => {
    const form = useForm<Formvalue>()
    const {handleSubmit, register} = form

    const onSubmit = (data:Formvalue)=>{
        console.log("Submitted", data)
    }
    return (
        <Grid direction={"column"} container alignItems="center" justifyContent="center">
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid  item xs={6} md={8} >
                    <label>First Name</label>
                    <input type={"text"} id="firstname" {...register("firstname")} />
                </Grid>
                <Grid  item xs={6} md={8}>
                    <label>Family Name</label>
                    <input type={"text"} id="lastname" {...register("lastname")}/>
                </Grid >
                    <label>Email</label>
                    <input type={"email"} id="email" {...register("email")}/>
                <Grid  item xs={6} md={8}>
                    <label>Password</label>
                    <input type={"password"} id="password" {...register("password")} />
                </Grid>
                    <button>Submit</button>
            </form>
        </Grid>
    )
}

export default Signin;