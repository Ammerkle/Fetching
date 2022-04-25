import React, {useCallback} from 'react'
import {withRouter} from "react-router";
import app from "../firebase";
import {Form, Button, Card} from 'react-bootstrap'
import { Container } from 'react-bootstrap';


const Register = ({history}) => {

const database = app.database();
const auth = app.auth();

    const handleRegister = useCallback(async event =>{
        event.preventDefault();
        const {email, password}= event.target.elements;
        try{
            await app.auth()
            .createUserWithEmailAndPassword(email.value, password.value).then(()=>{
                history.push("/");
                var user = auth.currentUser
                var dbRef = database.ref();
                console.log(user.uid);

                var storeUser ={
                    email: email.value,
                    
                }


                try{
                dbRef.child("userData/" + user.uid).set(storeUser);
                
                }catch(error){alert("did not do it right")}
            })
           
        }
        catch(error){
            alert(error);
        }

    }, [history]);

    
    return(
        <div>
             <Container
    className="d-flex align-items-center justify-content-center"
    style={{minHeight:"100vh" }}
    >
            <Card>  
                <Card.Body>
                    <h2 className="text-center mb-4"> Sign Up</h2>
                    <Form onSubmit={handleRegister}>
                    
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control input name ="email" type="email" placeholder= "Email" />
                    </Form.Group>
                   <br></br>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control input name ="password" type="password" placeholder= "password" />
                    </Form.Group>
                   
                
                    <br></br>
                    <Button type ="submit" className="w-100"type="submit">Sign Up</Button>
                        </Form>    
                </Card.Body>
            
            <div className="w-100 text-center mt-2">
                <h5>Already have an account?</h5>
               <form action="/login" class="inline">
               <Button type ="submit" className="w-100"type="submit">Login</Button>
               </form>
            </div>
            </Card>
            </Container>
        </div>
    )
}
export default withRouter(Register);