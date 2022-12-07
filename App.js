//create commentContainer variable 
const commentContainer = document.getElementById('allComments');

// part 1   => function to get the local data
window.onload = function setTemplate() {
    // document.getElementById('allComments').innerHTML = localStorage.getItem('template');
    commentContainer.innerHTML = localStorage.getItem('template');
};

// part 2  => function to save data in local storage
function setOnLocalStorage() {
    localStorage.setItem('template', document.getElementById('allComments').innerHTML);
    localStorage.setItem('template', commentContainer.innerHTML);
}

// part 5  
// checking class name present or not ..if class present return true otherwise false
function hasClass(elem, className) {
    // console.log(elem.className.split(' ').indexOf(className)); // output: true or false
    return elem.className.split(' ').indexOf(className) > -1;
}

// part 3  => Add comments dynamically
//reply, like ,delete buttons  
function addComment(ev) {
    let commentText, wrapDiv;
    const textBox = document.createElement('div');

    // create button structure for reply
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = 'Reply';

    // for like
    const likeButton = document.createElement('button');
    likeButton.className = 'likeComment';
    likeButton.innerHTML = `Like`;

    // for dislike
    const dislikeButton = document.createElement('button');
    dislikeButton.className = 'dislikeComment';
    dislikeButton.innerHTML = `Dislike`;

    // for delete
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteComment';
    deleteButton.innerHTML = `Delete`;


    // add comment from main container with textBox, replyButton, likeButton,dislikeButton deleteButton.
    if (hasClass(ev.target.parentElement, 'container')) {
        // console.log(ev.target.parentElement);
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrapper';
        wrapDiv.style.marginLeft = 0;
        // storing textarea value of main textarea
        commentText = document.getElementById('comment').value;
        // after click on add button empty main textarea
        document.getElementById('comment').value = '';

        //adding text from main commentBox
        if (commentText.length > 0) {
            textBox.innerHTML = commentText;
            textBox.style.backgroundColor = "cornflowerblue";
            //append all 
            wrapDiv.append(textBox, replyButton, likeButton, dislikeButton, deleteButton);
            commentContainer.appendChild(wrapDiv);
        }
    }
    else {
        // this is for child comment add
        // it will work after reply comment on click add button
        wrapDiv = ev.target.parentElement;
        // console.log(ev.target.parentElement);
        commentText = ev.target.parentElement.firstElementChild.value;

        console.log('commentText', commentText);

        if (commentText.length > 0) {
            textBox.innerHTML = commentText;
            textBox.style.backgroundColor = "tomato";
            // remove textarea after add reply on child
            wrapDiv.innerHTML = '';
            // add all button same as like parenth comment
            wrapDiv.append(textBox, replyButton, likeButton, dislikeButton, deleteButton);
        }
    }
    setOnLocalStorage();
}

// // part 4
// adding event listner onbutton click to call addComment
document.getElementById('addComments').addEventListener('click', function (ev) {
    // call addComment function
    addComment(ev);
});
// Add comments dynamically  ends here

// part 6
let flag = 0;    
console.log('outside-flag',flag);

document.getElementById('allComments').addEventListener('click', function (e) {
    // creating HTML for reply
    if (hasClass(e.target, 'reply')) {
        const parentDiv = e.target.parentElement;
        const wrapDiv = document.createElement('div');
        wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
        wrapDiv.className = 'wrapper';
        const textArea = document.createElement('textarea');
        textArea.style.marginRight = '20px';

        // ADD button create for reply box on click
        const addButton = document.createElement('button');
        addButton.className = 'addReply';
        addButton.innerHTML = 'Add';

        // cancel button  create for reply box on click
        const cancelButton = document.createElement('button');
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className = 'cancelReply';

        if(flag === 0){
           wrapDiv.append(textArea, addButton, cancelButton);     
           parentDiv.appendChild(wrapDiv);
           document.getElementsByClassName("reply").disabled = true;
           flag++;
          console.log('inside-flag',flag);
       }
    }

    // adding all the html data from addComment function for reply

    else if (hasClass(e.target, 'addReply')) {
        addComment(e);
        flag--;
        document.getElementsByClassName("reply").disabled = false;
        console.log('after addreply-flag',flag);
    }

    // adding like on button click

    else if (hasClass(e.target, 'likeComment')) {
        const likeBtnValue = e.target.innerHTML;
        e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 + " Like" : 1 + " Like";
        setOnLocalStorage();
    }
    // adding dislike on button click
    else if (hasClass(e.target, 'dislikeComment')) {
        const dislikeBtnValue = e.target.innerHTML;
        e.target.innerHTML = dislikeBtnValue !== 'Dislike' ? Number.parseInt(dislikeBtnValue) + 1 + " Dislike" : 1 + " Dislike";
        setOnLocalStorage();
    }

    // cancel reply on button click

    else if (hasClass(e.target, 'cancelReply')) {
        e.target.parentElement.innerHTML = '';
        setOnLocalStorage();
        flag--;
        document.getElementsByClassName("reply").disabled = false;
    }

    // delete entire  comment chain
    else if (hasClass(e.target, 'deleteComment')) {
        e.target.parentElement.remove();
        setOnLocalStorage();
    }
});
