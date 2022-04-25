import React, {useCallback, useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton"
import app from "../firebase";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getDatabase, ref, child, get } from "firebase/database";

const Edit = () => {

    const dbRef = ref(getDatabase());
    const currentuserID = app.auth().currentUser.uid
    const db = app.database();
    const [dog,setDog]=useState([]);

    useEffect(() => {
        get(child(dbRef, `dogData/`)).then((snapshot) => {
            if (snapshot.exists()) {
        
               console.log(snapshot.val());

                setDog(snapshot.val());
             
            }
           else {
              console.log("No user here lol");
            }
          }).catch((error) => {
            console.error(error);
          });
          }, [])

          function deleteDog(params) {
           
            app.database().ref('userData').once('value', function(snapshot){
                snapshot.forEach(
                    function(ChildSnapshot){
                        // console.log(ChildSnapshot.val().myDogs);
                        for (let index = 0; index < Object.keys(ChildSnapshot.val().myDogs).length; index++) {
                           
                            // console.log(Object.keys(ChildSnapshot.val().myDogs)[index]);
                            // console.log(params);

                            if(Object.keys(ChildSnapshot.val().myDogs)[index] === params){


                                 console.log("passed dog:" + params + "   found match: " + Object.keys(ChildSnapshot.val().myDogs)[index]);
                           
                                }
                                                }
                        console.log(ChildSnapshot.val().myDogs[params])
                       
                    }
                );
            });


          
                    
                       try{
                        // var pet = {isAvailable:"no"}
                        // var newPostKey = db.ref("dogData/" + params + "/isAvailable/").push().key;
                        app.database().ref("dogData/"+ params).remove();
                        //app.database().ref("userData/"+ params).remove();

                       

    
                        // var updates = {};
                        // updates[`dogData/${params}/${newPostKey}`] = pet;
                        // app.database().ref().update(updates);
                        // app.database().ref("userData/"${currentUID}"myDogs/").once("value").then(function(snapshot){
                        //     snapshot.forEach(function(child){
                        //         if(child.ref.key===params){
                        //             try{
                        //                 child.ref.remove();
                        //                 window.location.reload(false);
                        //             }
                        //             catch(error){
                        //                 console.log(error);
                        //             }
                        //         }
                        //     })
                        // })


                    //  function searchUsers(){
                    //     app.database().ref('userData') 
                    //  }

                       

                       
                     alert(`Successfully removed ${params} from database`) 
                       }catch(error){console.log("here is error:" + error)}
                         
           
                     //call below to refresh page after deletion
                    window.location.reload(false);
          }

       


    return(
        <>
        <div className = "header">
            <h1 className="title">Pets</h1>
            <IconButton>
            <Link to = "/"> <HomeIcon fontSize="large"/> </Link>
            </IconButton>
        </div>
        {          Object.keys(dog).map((element,index)=>{
            return <div> <h1 key={index}>{element}</h1> <button onClick={() => deleteDog(element)}>Delete Pet</button>    </div>
                    })}

</>
      
    );
}

export default Edit;