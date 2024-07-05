(function () {
    emailjs.init("IcnFGk-ORziW89X4Z");
})();

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const templateID = 'template_kw0ddb6'
    const serviceID = 'service_xuiu5au'

    emailjs.sendForm(serviceID, templateID, this)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensaje enviado con éxito!');
        }, function (error) {
            console.log('FAILED...', error);
            alert('Ocurrió un error al enviar el mensaje.');
        });
});