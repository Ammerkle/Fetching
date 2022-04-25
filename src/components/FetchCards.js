import React,{useEffect,useState} from "react";
import app from "../firebase";
import "../Styles/Header.css"
import PetsIcon from '@mui/icons-material/Pets';
import IconButton from "@material-ui/core/IconButton"
import { Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import { getDatabase, ref, child, get } from "firebase/database";
import { getDownloadURL, getStorage } from "firebase/storage";
import AdminHome from './AdminHome'






// function discard_gone(){}
//    document.getElementById("fetchcard").style.display="none"
        
    
// }



const FetchCards = () => {
    

    const dbRef = ref(getDatabase());

    const db = app.database();
    const [dogInfo,setDogInfo]=useState([]);

    const [isAdmin,setAdmin]=useState(false);


    const storage = getStorage();

    const currentuserID = app.auth().currentUser.uid
    // console.log(currentuserID);
   
const addmatches =(name,age,link)=>{
    
  console.log(name);
        get(child(dbRef, `userData/${currentuserID}`)).then((snapshot) => {
          if (snapshot.exists()) {
      
             console.log(snapshot.val());

             var yepyepyep={
                dogPicc:link,
                dogName:name,
                dogAge:age
                 
             }

            //  var newPostKey = db.ref(`userData/${currentuserID}`).child(`/myDogs/${name}`).key;
            //  console.log(newPostKey);
             var updates = {};
             updates[`userData/${currentuserID}/myDogs/${name}`] = yepyepyep;
            app.database().ref().update(updates);
             alert("Dog added to matches!")
          }
         else {
            console.log("No user here lol");
          }
        }).catch((error) => {
          console.error(error);
        });
}


const dogHandler = (name,age,link)=>{
setDogInfo(state => [...state,{
    dogName:name,
    dogAge:age,
    dogPicc:link
 
}]);

}


  useEffect(() => {
        app.database().ref('dogData').once('value', function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                dogHandler(ChildSnapshot.val().name,ChildSnapshot.val().age,ChildSnapshot.val().link);
               
            }
        );
    });
          }, [])

         


          var listRef = app.storage().ref();

        console.log(currentuserID);
        
          get(child(dbRef, `adminAccounts/${currentuserID}`)).then((snapshot) => {
            if (snapshot.exists()) {
        
               console.log("this is admin account");
               setAdmin(true);

            }
            else{
                console.log("this is regular user account");
                setAdmin(false);
            }
        })


    return(
        <>

    {isAdmin === true? (
        <div>
        
            <AdminHome/>


        </div>
        ) : (
            <>
            <div className="header">
            

            <button onClick={() => app.auth().signOut()}>Sign Out</button>
            <h2 className="title">FETCHING</h2>
            <IconButton> 
            <Link to = "/matches"> <PetsIcon fontSize="large"/> </Link>
            </IconButton>
            </div>
        
        
        
        <Container className="d-flex align-items-center justify-content-center" >
            
            <div>
                    {dogInfo.map((element,index)=>{
               return <div className ="card" id= "fetchcard"><img src = {element.dogPicc} className= "dogpic" />
<h2> {element.dogName}</h2>  Age: {element.dogAge}
            
            <div>
            <IconButton onClick = {() => addmatches(element.dogName,element.dogAge,element.dogPicc)} className= "favorite" >
            <FavoriteIcon fontSize="large"/> 
            </IconButton>
            <IconButton className= "discard">
            <ClearIcon fontSize="large"/> 
            </IconButton>
    </div>

</div> 
                       })}
                    
           </div>
        </Container>

       
       
        </>


        )}


       
       
        </>
    );  
}
export default FetchCards;