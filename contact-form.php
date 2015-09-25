<?php
//echo "hello"; die;
    //    $to      = 'vijay.panwar@nachron.com';
    $to  = 'jainishshah@yahoo.com'; // note the comma
    //$to .= 'info@nachron.com';

    // subject
    $subject = 'Contact US';

    // message
    $message = '
    <html>
    <head>
    <title>Contact US</title>
    </head>
    <body>
    <table>
    <tr>
    <td>Name : </td><td>'.$_REQUEST['inputName'].'</td>
    </tr>

    <tr>
    <td>Email : </td><td>'.$_REQUEST['inputEmail'].'</td>
    </tr>
    <tr>
    <td>Number : </td><td>'.$_REQUEST['inputSubject'].'</td>
    </tr>

    <tr>
    <td>Country : </td><td>'.$_REQUEST['inputMessage'].'</td>
    </tr>
    </table>
    </body>
    </html>
    ';

    // To send HTML mail, the Content-type header must be set
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    // Additional headers
    //    $headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
    $headers .= 'From: Contact Us <info@nachron.com>' . "\r\n";
//    $headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
//    $headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";

    // Mail it

    if(mail($to, $subject, $message, $headers))
   {
   echo "success";
   }

?>