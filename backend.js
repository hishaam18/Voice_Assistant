let globalUser = document.querySelector('#replyBox');
let modal = document.querySelector('.mod');

var message = document.querySelector('#message');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-Uk';
recognition.interimResults = false;

recognition.onresult = function (event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;  //variable command contains the last result of what you spoke
    message.textContent = 'Voice Input: ' + command + '.';
    console.log(command);

    if (command.toLowerCase().includes('login')) {
        readLogin(command)
        displayUserCommand(command);
        displayLogin();
    }
    else if (command.toLowerCase().includes('register')) {
        readRegister(command);
        displayUserCommand(command);
        displayRegister();
    }
    else if (command.toLowerCase().includes('contact')) { 
        readContact(command);
        openMail(command);
    } 
    else if (command.toLowerCase().includes('parts')) {
        readParts(command);
        displayParts(command);
    }
    else if (command.toLowerCase().includes('microsoft')) {
        readMicrosoft(command);
        $('#pdfModal').modal('show');
    }
    else if (command.toLowerCase().includes('open page')) {
        openLogin ();
    }
    else {
        errorMessage(command);
    }};

volume = 1;
muted = 0;

function muteFunction() {


    if (muted == 0) {
        document.getElementById('muteIcon').classList = 'fas fa-volume-mute';
        document.getElementById('btnMute').style.backgroundColor = "red";
        muted = 1;
        volume = 0;
    } else if (muted == 1) {
        document.getElementById('muteIcon').classList = 'fas fa-volume-up';
        document.getElementById('btnMute').style.backgroundColor = "white";
        muted = 0;
        volume =1;
    }

    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance
    window.speechSynthesis.speak(speech);
    speech.volume = volume;
}

//function to open login page
function openLogin () {
    window.open(" https://ethos.mdx.ac.uk/authenticationendpoint/login.do?Name=PreLoginRequestProcessor&commonAuthCallerPath=%252Fcas%252Flogin&forceAuth=true&passiveAuth=false&service=https%3A%2F%2Fmyunihub.mdx.ac.uk%2Fc%2Fportal%2Flogin&tenantDomain=carbon.super&sessionDataKey=eb20d185-8628-441a-a8b3-23b6deca2f8f&relyingParty=myunihub_portal_PROD&type=cas&sp=myunihub_portal_PROD&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL");
}

//Error message
function errorMessage(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance    
    speech.volume = volume;
    speech.text = 'Sorry, I didnt catch what you were trying to say, please refer to the help settings for the list of commands ';
    window.speechSynthesis.speak(speech);
}

//function to display command - users end
function displayUserCommand(command) {
    let userTalk='';
    userTalk += '<div class="userResponse">';
    userTalk += '<p>' + command + '</p>';
    userTalk += '</div>';
    globalUser.innerHTML += userTalk;
    return globalUser;
}

//displaying dynamically for Login
function displayLogin() {
    let login='';
    login+= '<div class="assitantResponse">';
    login += '<p> Link to unihub: </br> Link: https://myunihub.mdx.ac.uk/ </br> If you want to open the login page, say  <b>"Open page"</b> </p>';
    login+= '</div>';
    globalUser.innerHTML += login;
    return globalUser;
}

//this function reads aloud Login 
function readLogin(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance    
    speech.volume = volume;
    speech.text = ' You can access the login page of unihub using the link I have provided: </br> You will need to have your student id and a first password provided by the student office in order to login ' ;
    window.speechSynthesis.speak(speech);
}

//Displaying dynamically for register 
function displayRegister() {
    let register='';
    register+='<div class="assitantResponse">';
    register += '<p> Student office contact details:  </br> Phone Number: + 230 403 6400 </br> Email: studentoffice@mdx.ac.mu </p>' 
    register += '</div>';
    globalUser.innerHTML += register;
    return globalUser;
}

//this function reads aloud register 
function readRegister(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance
    speech.volume = volume;    
    speech.text = ' Registration on Unihub can only be done by the student office. Please get in touch with the student office to create a unihub account. I have included the contact details below ';
    window.speechSynthesis.speak(speech);
}

function readContact(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance    
    speech.volume = volume;
    speech.text = ' Here I have opened your mail. Please feel free to send us your queries ';
    window.speechSynthesis.speak(speech);
}

function readMicrosoft(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance    
    speech.volume = volume;
    speech.text = ' Here is how you can install Microsoft 365 on your device. ';
    window.speechSynthesis.speak(speech);
}

//this function reads aloud openmail
function openMail(command) {
    window.open("mailto:ithelpdesk@mdx.ac.mu");
} 

//this function reads aloud parts
function readParts(command) {
    var speech = new SpeechSynthesisUtterance(); //speech is an object of class SpeechSynthesisUtterance    
    speech.volume = volume;
    speech.text = ' Do you want to order parts ? ';
    window.speechSynthesis.speak(speech);
} 

//displaying dynamically for Login
function displayParts(command) {
    let login='';
    login+= '<div class="assitantResponse">';
    login += '<p> Link to unihub: </br> Link: https://myunihub.mdx.ac.uk/ </br> </p>';
    login+= '</div>';
    globalUser.innerHTML += login;
    return globalUser;
}

recognition.onspeechend = function () {
    recognition.stop();
};

recognition.onerror = function (event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#btnGiveCommand').addEventListener('click', function () {
    recognition.start();
});

