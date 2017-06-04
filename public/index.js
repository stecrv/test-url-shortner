var connection = 'http://localhost:4000'

/**
 * Add element to the table
 *
 */
function elementAdded(data){
    console.log(data);
    var table = document.getElementById('linksList');

    var a = '<a target="_blank" href="'+connection+data.short_url+'">'+data.short_url+'"</a>';

    var row = '<li class="row"> '+a+' : '+data.url+' </li>';
    table.innerHTML += row;
}

/**
 * Post link to application
 */
function sendLink() {

    var data = {'url': document.getElementById('link').value};
    $.ajax({
        type: "POST",
        url: '/',
        data: JSON.stringify(data),
        success: function( data, textStatus,  jqXHR ){
            elementAdded(data);
        }
    }).done(function (data) {
        setMessage('Element added');
    }).fail(function (data, text, jqxhr) {
        setMessage('Error');
    })
};

function setMessage(m){
    document.getElementById('messagge').innerHTML = '<blockquote>'+m+'</blockquote>';
}


function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
};


/**
 * Check link and https
 */
function handleLink() {
    var m = '';
    var error = true;
    var e = document.getElementById('link');

    if (e.value && !validateUrl(e.value)) {
        m = 'Please insert a valid link';
        error =true;
    } else {
        if (e.value && e.value.startsWith('http:/'))  m = 'Please use https:// version of your link';
        document.getElementById('send').removeAttribute("disabled");
        error = false;
    }
    if (error) {
        document.getElementById('send').setAttribute("disabled", "disabled");
    }
    setMessage(m);
};


window.onload = function (e) {
    //Send the link to a post
    document.getElementById('send').addEventListener("click", sendLink);

    //Check the link
    var e = document.getElementById('link');
    e.oninput = handleLink;
    e.onpropertychange = e.oninput;

};