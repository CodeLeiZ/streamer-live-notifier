let streamerList = []
let isdeleteBtnVisible = false

const streamerListElement = document.getElementById('streamer-list-element');
const StreamerListFromLocalStorage = JSON.parse(localStorage.getItem('streamer-list'));
const InputStreamerElement = document.getElementById('input-streamer');
const platformSelectElement = document.getElementById('platform-select');
const addBtn = document.getElementById('add-streamer');

// Test Option TODO delete the following !
const unhide = document.getElementById('more');
// End



if (StreamerListFromLocalStorage) {
    streamerList = StreamerListFromLocalStorage
    render(streamerList)
}

function render(list) {
    let itemList = ""
    for ( let i = 0, len = list.length; i < len; i++ ) {
        itemList +=
            `<li>
                ${list[i].streamer} - ${list[i].platform}
                <button class="delete-btn" data-index="${i}" style="display:${isdeleteBtnVisible ? 'inline-block' : 'none'}">X</button>
                
            </li>`
    }
    streamerListElement.innerHTML = itemList

    const deleteBtn = document.querySelectorAll('.delete-btn');
    if (deleteBtn.length > 0) {
        deleteBtn.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                deleteStreamer(index);
            })
        })
    }
}

function deleteStreamer(index) {
    streamerList.splice(index, 1);
    localStorage.setItem('streamerList', JSON.stringify(streamerList));
    render(streamerList);
}

function streamerExists(streamer, platform) {
    return streamerList.some(item => item.streamer === streamer && item.platform === platform);
}

function save() {

    let InputStreamerElementValue = InputStreamerElement.value
    let platformSelectElementValue = platformSelectElement.value

    if (InputStreamerElementValue && platformSelectElementValue) {

        // Check if the combination already exists
        if (streamerExists(InputStreamerElementValue, platformSelectElementValue)) {
            alert("This streamer and platform combination already exists!");
            return; // Don't save if it already exists
        } else {
            streamerList.push({streamer: InputStreamerElementValue, platform: platformSelectElementValue});
            InputStreamerElement.value = ''
            platformSelectElement.value = ''
            console.log(streamerList)
        }

    }else {
        alert("please select an option !")
    }
    InputStreamerElement.value = "";
    localStorage.setItem('streamerList', JSON.stringify(streamerList));
    render(streamerList);
    console.log(platformSelectElement.value);
}

addBtn.addEventListener('click', function() {
    if (streamerList.streamer && streamerList.platform){

    }
    save();
})

// Test Option TODO change the Element in the following !
unhide.addEventListener('click', function() {
    isdeleteBtnVisible = !isdeleteBtnVisible;

    const deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach(button => {
        button.style.display = isdeleteBtnVisible ? 'inline-block' : 'none';
    })
})
// End