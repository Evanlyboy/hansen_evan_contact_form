// could wrap all of this in a class or an object and expand on the API to include all of the front-end API interactions (GET, PUT, POST for CMS etc)

// SendMail would be just one member / property in that object

// Alright looks like I'll have to analyse this bitch line by line
// SendMail is an automatic function that sends mail out. This is called by main.js
async function SendMail(targetForm) {
    // Make a new variable that holds the data we got from the target form (contact form)
    let formData = new FormData(targetForm),
        formFieldErrors = false;

        //wash and sanitize the form with php
    let result = await fetch(`./${targetForm.getAttribute("action")}`, {
        // no idea what this does
        method: targetForm.method,
        body: formData,
        // again at a loss for what is actually happening
    }).then(response => {
        // if something doesn't equal 200 then there are problems with the fields in the form
        return response;
    })
    
    // Not quite sure what this does but I think it turns the mail status into a JSON file
    let mailStatus = await result.json();
    // if there are indeed errors in the form, then we will create an official error I guess

    // So the issue is that "length" has a double meaning here. If there's an issue, the php will return an array with up to four objects, thus making it's [array] length up to four. However when everything is good, the message that comes back will have a character length of 72 that's evaluated the same way
    // This is a stupid fucking solution but it works
    if (mailStatus.message.length > 0 && mailStatus.message.length <= 4) {
        throw new Error(JSON.stringify(mailStatus));
    }    
    
    return mailStatus;
}

export { SendMail };