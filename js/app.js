var data = [];

if(localStorage.getItem('data') !== null){
    data = JSON.parse(localStorage.getItem('data'));
    showData();
}
var bookmark = document.getElementById("bookmark");
var url = document.getElementById('url');
var search = document.querySelector('label input');

function addBookmark(){

    // if (!getBookmarkValidation(bookmark.value)) {
    //     alert('wrong bookmark')
    // }
    // if(!getUrlValidation(url.value)){
    //     alert('wrong url')
    // }

    // if(!getUrlValidation(url.value) || !getBookmarkValidation(bookmark.value)){
    //     return 0;
    // }

    if(validation()){

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
                            <a onclick="editBookmark(${i})" class="btn btn-warning text-white"><i class="fa fa-solid fa-edit"></i> Edit</a>
                        </td>
                        <td>
                            <a onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa fa-solid fa-trash"></i> Delete</a>
                        </td>
                    </tr>
        `
    }
    document.getElementById('body').innerHTML = html;
}

function validation () {
    if (!getBookmarkValidation(bookmark.value)) {
        alert('wrong bookmark')
        return false;
    }
    if(!getUrlValidation(url.value)){
        alert('wrong url')
        return false;
    }
    if(!getUrlValidation(url.value) || !getBookmarkValidation(bookmark.value)){
        return false;
    }
    return true
}

function getUrlValidation(input) {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}

function getBookmarkValidation(input) {
    var regex = /^[a-zA-Z0-9 ]{3,}$/;

    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}

function deleteItem (itemId) {
    data.splice(itemId,1);
    showData();
    localStorage.setItem('data',JSON.stringify(data));
}


function tableSearch (term) {
    
    if(localStorage.getItem('data') !== null){
        data = JSON.parse(localStorage.getItem('data'));
        showData();
    }

    var html='';

    for (let i = 0; i < data.length; i++) {

        console.log(data[i].bookmark.trim().toLowerCase().includes(term.toLowerCase()));
        if(data[i].bookmark.trim().toLowerCase().includes(term.toLowerCase())){
            console.log(data[i].bookmark);   
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].bookmark}</td>
                    <td>
                        <a href="${data[i].url}" target="_blank" class="btn btn-success"><i class="fa fa-solid fa-eye"></i> Visit</a>
                    </td>
                    <td>
                        <a onclick="editBookmark(${i})" class="btn btn-warning"><i class="fa fa-solid fa-edit"></i> Edit</a>
                    </td>
                    <td>
                        <a onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa fa-solid fa-trash"></i> Delete</a>
                    </td>
                </tr>
            `
        }
        document.getElementById('body').innerHTML = html;
    }
    // 
}


search.addEventListener('input',function(e) {
    tableSearch(e.target.value);
})

function editBookmark (item) {

    bookmark.value = data[item].bookmark;
    url.value = data[item].url;
    document.getElementById('actionButton').innerHTML = `<button onclick="updateBookmark(${item})" class="btn btn-warning px-5 mb-4">update</button>`;
    console.log(data[item]);
    


    console.log(item);
}


function updateBookmark(i) {
    data[i].bookmark = bookmark.value;
    data[i].url = url.value;    

    validation();

    localStorage.setItem('data' , JSON.stringify(data))

    document.getElementById('actionButton').innerHTML = `<button onclick="addBookmark()" class="btn btn-danger px-5 mb-4">Submit</button>`;

    showData();
    clearFields();
    
}