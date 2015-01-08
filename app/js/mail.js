function sendMail() {
    var link = "mailto:hello@thibaudcarpentier.com"
             + "?cc=" + escape(document.getElementById('mail_adress').value)
             + "&subject=" + escape(document.getElementById('mail_subject').value)
             + "&body=" + escape(document.getElementById('mail_msg').value)
    ;

    window.location.href = link;
}