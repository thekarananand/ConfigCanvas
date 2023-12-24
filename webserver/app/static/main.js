const csrf = document.querySelector('[name=csrfmiddlewaretoken]');

const IPList = document.querySelector('#device .device_list');

const AddDevicesBtn = document.querySelector('#device input[type=submit]');
const NewIP = document.querySelector('#device input[name=NewIP]');
const NewUsername = document.querySelector('#device input[name=NewUsername]');
const NewPassword = document.querySelector('#device input[name=NewPassword]');

var APIdata

function Fetch_Inventory() {
    fetch('/api/inventory/')
        .then(response => response.json())
        .then(data => {
            APIdata = data
            Clear_IP_List()
            APIdata.inventory.forEach(IP => {
                Add_IP_to_IP_List(IP, APIdata.details[IP][0], APIdata.details[IP][1])
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function Clear_IP_List() {
    IPList.innerHTML = ''
}

function Add_IP_to_IP_List(IP, Status, Username) {
    var NewEntry = document.createElement("li")
    var StatusNSSHame = ''

    switch (Status) {
        case 2:
            StatusName = '👍 Connected'
            break;

        case 1:
            StatusName = '⏳ Connecting...'
            break;

        case 0:
            StatusName = '🛑 Error'
            break;

        default:
            break;
    }

    if (Status == 0) {
        NewEntry.innerHTML = `
            <span class='IP'>${IP}</span>
            <span class='Username'>${Username}</span>
            <details>
                <summary status='${Status}'>${StatusName}</summary>
                <p>${APIdata.details[IP][2]}</p>
            </details> 
        `
    } else {
        NewEntry.innerHTML = `
            <span class='IP'>${IP}</span>
            <span class='Username'>${Username}</span>
            <span class='Status' status="${Status}">${StatusName}</span>
        `
    }
    IPList.append(NewEntry)
}

AddDevicesBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const NewEntry = new FormData()
    NewEntry.append('csrfmiddlewaretoken', csrf.value)
    NewEntry.append('Purpose', 'NewDevice')
    NewEntry.append('IP', String(NewIP.value))
    NewEntry.append('SSHUsername', String(NewUsername.value))
    NewEntry.append('Password', String(NewPassword.value))

    $.ajax({
        type: 'POST',
        url: '/api/inventory/',
        enctype: 'multipart/form-data',
        data: NewEntry,
        success: (response) => {
            Fetch_Inventory()
            NewIP.value = ""
            NewUsername.value = ""
            NewPassword.value = ""
        },
        error: (error) => {
            console.log(error)
        },
        processData: false,
        contentType: false,
    })

})

Fetch_Inventory()