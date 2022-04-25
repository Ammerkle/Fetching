//This page is designed for the Oxford Animal Shelter to input pet profiles
// information such as age, name, and picture will be associated with the Dog Name


import "../Styles/Header.css"
import { Container } from 'react-bootstrap';
import app from "../firebase";
import {Form, Button, Card } from 'react-bootstrap'
import React, {useCallback, useState} from 'react'
import { getStorage, ref } from "firebase/storage";
import PetsIcon from '@mui/icons-material/Pets';
import IconButton from "@material-ui/core/IconButton"
import {useHistory, Link} from "react-router-dom";
import { getDatabase, child, get } from "firebase/database";


const AdminHome = () => {

const[image,setImage]= useState('');
const[imgLink,setImgLink]= useState('');
const database = app.database();
const storage = getStorage();
const history = useHistory();


const handleImgSub = useCallback(async event =>{

    app.storage().ref(`/${image.name}`).put(image)
   
    
})



    const handleSubmit = useCallback(async event =>{
        event.preventDefault();

        const {name, age}= event.target.elements;
        // var fileMe = event.target.files[0];
    
        try{
                var dbRef = database.ref();
            
                var doggieData ={
                    name: name.value,
                    age: age.value,
                    picture: image.name,
                }
                
                
        dbRef.child("dogData/" + name.value).set(doggieData);
                // upload(fileMe ,name.value)

                const fileRef = ref(storage, name + '.jpg')

                // app.storage().ref(`/${image.name}`).put(image)
                // .on("state_changed" , alert("success") , alert);
                
        
                    var listRef = app.storage().ref();

                    listRef.listAll().then(function(res){
                        res.items.forEach(function(itemRef){
                         itemRef.getDownloadURL().then(function (link) {
                             if(link.includes(image.name)){
                                 
                                setImgLink(link);
                                
                             }
                             else{
                                 console.log(link);
                             }

                           
                         })
                       
                      })
                    })
              
                        get(child(dbRef, `dogData/${name.value}/`)).then((snapshot) => {
                            if (snapshot.exists()) {
                        
                               console.log(imgLink);
    
                                var yepyepyep={
                                    link:imgLink,
                                    name: name.value,
                                    age: age.value,
                                    picture: image.name,
                                }
    
                               var updates = {};
                               updates[`dogData/${name.value}/`] = yepyepyep;
                              app.database().ref().update(updates);
                              alert("Dog added successfully!")
                             
                            }
                           else {
                              console.log("Brrrr");
                            }
                          }).catch((error) => {
                            console.error(error);
                          });
                       


                 


//reroute here or refresh page

            }catch(error){console.log(error);}
    });



    return(
        
        <>
        <div className = "header">
            
            <h1 className = "title">Create and Edit Pet Profiles</h1>
            <IconButton> 
            <Link to = "/edit"> <PetsIcon fontSize="large"/> </Link>
            </IconButton>
            
        </div>
        <div>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </div>
        

        <br></br>
        <h2>Hello Oxford Animal Shelter</h2>

        <Container
    className="d-flex align-items-center justify-content-center"
    style={{minHeight:"100vh" }}
    >
        <div className="w-100" style={{ maxWidth:"400px"}}>
    <Card>  
        <Card.Body>
            <h2 className="text-center mb-4">Add Pet Profile</h2>
        <Form onSubmit={handleSubmit}>
                    
            <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control input name ="name" type="name" placeholder= "Name" required />
                </Form.Group>
                <br></br>
                <Form.Group id="age">
                <Form.Label>Age</Form.Label>
                <Form.Control input name ="age" type="age" placeholder= "Age" required/>
                </Form.Group>
                   <br></br>
                <Form.Group id="picture">
                <Form.Label>Picture</Form.Label>
                <Form.Control input name ="file" type="file" onChange={(e)=>{setImage(e.target.files[0])}}  />
                </Form.Group>
                

                   
                    <br></br>
                    <Button type ="submit" className = "w-100">Submit Image Here</Button>
                   
                    <Button onClick = {handleImgSub} type ="submit" className="w-100">Submit</Button>
                    
                        </Form>    
                </Card.Body>
                
            </Card>
            </div>
            </Container>
                




        </>
    );
}
export default AdminHome;