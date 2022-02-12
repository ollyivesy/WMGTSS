const app = express()

function validate(){
    var username=document.getElementById("username").value 
    var password=document.getElementById("password").value 

    if(username =="Young"&& password=="Park"){
        window.open("/tutorview")
    }
    else if (username == "Olly"&& password=="Ives"){
        window.open("/studentview")

    }
    else{
        alert("Login Failed")
    }

}