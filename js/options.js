if (localStorage.phrase==undefined)
{localStorage.phrase="RANDOM!"};

if (localStorage.animation==undefined)
{localStorage.animation=true}

document.getElementById('word').value = localStorage.phrase;

if (localStorage.animation=='true'){document.getElementById('animation').checked="checked"}
if (localStorage.ownPhrase=='true'){document.getElementById('ownPhrase').checked="checked"}
else {localStorage.ownPhrase=='false'}


document.getElementById('save').onclick = function() {
localStorage.phrase = document.getElementById('word').value;
localStorage.animation=document.getElementById('animation').checked;
localStorage.ownPhrase=document.getElementById('ownPhrase').checked
};