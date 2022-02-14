const app = express()

//hardcoded user credentials for the purpose of testing
//usually, this would relate to an external database with secure bcrypt hashing for passwords
function validate(){
    var username=document.getElementById("username").value 
    var password=document.getElementById("password").value 
    //direct this tutor to the tutor view page
    if(username =="Young"&& password=="Park"){
        window.open("/tutorview")
    }
    //direct this student to the student view page
    else if (username == "Olly"&& password=="Ives"){
        window.open("/studentview")

    }
    else{
        //render a pop-up alert box to say that the Login Failed
        alert("Login Failed")
    }

}