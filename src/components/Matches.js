import React, { useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton"
import app from "../firebase";
import {Link} from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from 'react-bootstrap';
import { getDatabase, ref, child, get } from "firebase/database";
import "../Styles/Header.css"

const Matches = () => {

    const dbRef = ref(getDatabase());
    const currentuserID = app.auth().currentUser.uid

    const [dog,setDog]=useState([]);


    const dogHandler = (age,name,link)=>{
      setDog(state => [...state,{
        dogAge:age,
        dogName:name,
        dogPicc:link
          
      }]);
      
      }

    useEffect(() => {
      app.database().ref(`userData/${currentuserID}/myDogs`).once('value', function(snapshot){
      snapshot.forEach(
          function(ChildSnapshot){
              dogHandler(ChildSnapshot.val().dogAge,ChildSnapshot.val().dogName, ChildSnapshot.val().dogPicc);
              console.log(ChildSnapshot.val().dogAge)
              console.log(ChildSnapshot.val().dogName)
          }
      );
  });
        }, [])

         
          dog.map((element,index)=>{
            console.log(element.dogAge);
            console.log(element.dogName)
                    })


    return(
        <>
        <div className = "header">
            <IconButton>
            <Link to = "/"> <HomeIcon fontSize="large"/> </Link>
            </IconButton>
            <h1 className="title">Matches</h1>
            <IconButton>
            <Link to = "/matches"> <PetsIcon fontSize="large"/> </Link>
            </IconButton>
        </div>




<div>
        <Container className="d-flex align-items-center justify-content-center"
   >
     <div>
        {dog.map((element,index)=>{
            return <div className ="matchcard" id= "fetchcard">
            <img src = {element.dogPicc} className= "matchpic" />
            <h1>{element.dogName}</h1>
            Age: {element.dogAge}
            
            </div> 
                    })}
                    </div>
        </Container>
        </div>
</>
      
    );
}

export default Matches;