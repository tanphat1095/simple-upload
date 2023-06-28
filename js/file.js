var fileArray = []; // storage image for upload to server

var files = document.getElementById('files');
var result = document.getElementById('result');
var pasteArea = document.getElementById('pasteArea');
var clear = () => result.innerHTML = '';
var getImage = (file) => {
    var img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    img.className = 'image';
    img.onclick = onClickImage;
    return img;
}

var showImage = (file) =>{
    if(file.type.startsWith('image/')) {
        var div = document.createElement('div');
        div.className = 'image';
        var closeButton = document.createElement('Button');
        closeButton.innerText = 'x';
        closeButton.className = 'close';
        closeButton.onclick = onDelete;
        div.appendChild(closeButton);

        div.appendChild(getImage(file));

        fileArray.push(file);

        // return div;
        result.appendChild(div);
    }
    else{
        showMessage('Only Images are supported')
    }

    
}

var onDelete = (element,event) =>{
    var parent = element?.target?.closest('#result');
    var remove = element?.target?.closest('.image');
    parent.removeChild(remove); 
    result = document.getElementById('result');
}

var onPaste = (e) => {
    if(e?.clipboardData?.files?.length > 0){
        var files = e?.clipboardData?.files;
        for(var i = 0; i< files.length; i++){
            showImage(files[i]);
        }
    }
}

var onChange = (e) =>{
    if(e?.target?.files?.length > 0){
        var files = e?.target?.files;
        for(var i =0; i < files.length; i++){
            showImage(files[i]);
        }
    }
    e.target.files = null;
}
var modal = document.getElementById('modal');
var onClickImage = (e) => {
    var src = e?.target?.src;
    document.getElementById('img01').src = src;
    modal.style.display = 'block';
    
}



pasteArea.addEventListener('paste', onPaste);
pasteArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    });

pasteArea.addEventListener("drop", (e) => {
e.preventDefault();
const files = e?.dataTransfer?.files;
for (let i = 0; i < files.length; i++){
    showImage(files[i]);
}



});


const showMessage = (message) =>{
    var x = document.getElementById('message');
    x.innerText = message;
    x.className = 'show';
    setTimeout(function(){
        x.className = '';
    }, 3000);
}



var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

files.addEventListener('change', onChange);
var closemodal = document.getElementsByClassName('close-modal')[0];
closemodal.onclick = () => modal.style.display = 'none';

            