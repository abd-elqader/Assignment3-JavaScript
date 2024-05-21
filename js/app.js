var data = [];

if(localStorage.getItem('data') !== null){
    data = JSON.parse(localStorage.getItem('data'));
    showData();
}
var bookmark = document.getElementById("bookmark");
var url = document.getElementById('url');

function addBookmark(){

    if (!getBookmarkValidation(bookmark.value)) {
        alert('wrong bookmark')
    }
    if(!getUrlValidation(url.value)){
        alert('wrong url')
    }

    if(!getUrlValidation(url.value) || !getBookmarkValidation(bookmark.value)){
        return 0;
    }
    var record = {
        "bookmark": bookmark.value,
        "url": url.value,
    }

    data.push(record);
    var strObj = JSON.stringify(data);
    localStorage.setItem('data', strObj);

    showData();
    clearFields();
}

function clearFields () {
    bookmark.value = "";
    url.value = "";
}

function showData() {
    var html = ""
    for(var i=0; i < data.length; i++){
        html += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].bookmark}</td>
                        <td>
                            <a href="${data[i].url}" target="_blank" class="btn btn-success"><i class="fa fa-solid fa-eye"></i> Visit</a>
                        </td>
                        <td>
                            <a onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa fa-solid fa-trash"> Delete</i></a>
                        </td>
                    </tr>
        `
    }
    document.getElementById('body').innerHTML = html;
    console.log(data);
}

function getUrlValidation(input) {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (regex.test(input)) {
        return 1;
    } else {
        return 0;
    }
}

function getBookmarkValidation(input) {
    var regex = /^[a-zA-Z0-9]{3,}$/;

    if (regex.test(input)) {
        return 1;
    } else {
        return 0;
    }
}

function deleteItem (itemId) {
    console.log(typeof(data));
    data.splice(itemId,1);
    showData();
    localStorage.setItem('data',JSON.stringify(data));
}