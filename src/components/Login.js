import React, {useCallback} from "react";
import { Container } from 'react-bootstrap';
import app from "../firebase";
import {Form, Button, Card } from 'react-bootstrap'

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event =>{
            event.preventDefault();
            const {email, password} = event.target.elements;
            try{
                await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            }
            catch(error){
                alert(error);
            }
        },
        [history]
    );

   
    return(
        <Container
    className="d-flex align-items-center justify-content-center"
    style={{minHeight:"100vh" }}
    >
        <div className="w-100" style={{ maxWidth:"400px"}}>
    <Card>  
        <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
                    
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control input name ="email" type="email" placeholder= "Email" />
                </Form.Group>
                   <br></br>
                <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control input name ="password" type="password" placeholder= "Password" />
                </Form.Group>
                   
                
                    <br></br>
                    <Button type ="submit" className="w-100"type="submit">Login</Button>
                        </Form>    
                </Card.Body>
                
            </Card>
            </div>
            </Container>

    );
};
export default Login;
