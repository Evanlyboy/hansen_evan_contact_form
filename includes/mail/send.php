<?php
// required headers
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");

if($_POST) {
    $receipient = "evanhansen@evanly.ca";
    $subject = "Email from my porfolio site";
    $visitor_name = "";
    $visitor_email = "";
    $message = "";
    $fail = array();

    // checks to see if the first name has been created
    if(isset($_POST['firstname']) && !empty($_POST['firstname'])) {
        // cleans the text
        $visitor_name .= filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
    }else{
        // adds the fail check to the fail array to be shamefully displayed to the user at the end
        array_push($fail, "firstname");
    }

    if(isset($_POST['lastname']) && !empty($_POST['lastname'])) {
        $visitor_name .= " ".filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
    } else {
        array_push($fail, "lastname");
    }

    // Checks for email and cleans the text
    if(isset($_POST['email']) && !empty($_POST['email'])) {
        $visitor_email = str_replace(array("\r", "\n", "%0a", "%0d"), "", $_POST['email']);
        $visitor_email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
    } else {
        array_push($fail, "email");
    }

    // Checks our message and cleans it
    if(isset($_POST['message']) && !empty($_POST['message'])) {
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);
    } else {
        array_push($fail, "message");
    }

 
    $headers = "From: ".$visitor_email."\r\n"."Reply-To: ".$visitor_email."\r\n"."X-Mailer: PHP/".phpversion();

    if(count($fail)==0) {
        mail($receipient, $subject, $message, $headers);
        $results['message'] = sprintf("Thanks for contacting me, %s! I'll get back to you as soon as I can", $visitor_name);
    } else {
        header('HTTP/1.1 488 You did not fill out the form. Fill out the form. NOW!');
        die(json_encode(["message"=> $fail]));
    }

} else {
    $results['message'] = "Please fill out the form.";
}

echo json_encode($results);

?>