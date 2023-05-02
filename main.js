const postalDropDown = document.querySelector('#postal')
const inputField = document.querySelector('#postal-value')
const searchButton = document.querySelector('#search')
const displayArea = document.querySelector('.display-box')


getType()
postalDropDown.addEventListener('click', () => {
    getType()
})

function getType() {
    let type = postalDropDown.options[postalDropDown.selectedIndex].getAttribute('data-type');
    // console.log(type)
    inputField.setAttribute('type', type)
}


searchButton.addEventListener('click', () => {
    let type = postalDropDown.options[postalDropDown.selectedIndex].getAttribute('data-type');
    if (type === 'number') {
        let pincode = inputField.value
        let urlToSend = `https://api.postalpincode.in/pincode/${pincode}`
        fetchData(urlToSend)
    } else {
        let branchName = inputField.value
        urlToSend = `https://api.postalpincode.in/postoffice/${branchName}`
        fetchData(urlToSend)
    }
})

let apiUrl = `https://api.postalpincode.in/pincode/636119`

function fetchData(url) {
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            // console.log(data)

            let arrayOfData = data[0].PostOffice

            displayArea.innerHTML = ''

            if(data[0].Status == 'Error') {
                errorDisplay()
            }else {
                arrayOfData.forEach(element => {
                    htmlInject(element)
                });

            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function htmlInject(element) {
    // console.log(element)

    let container = `
    <div>
        <p>Name: <span class="branch-name">${element.Name}</span></p>
        <p>District: <span class="branch-district">${element.District}</span> </p>
        <p>State: <span class="branch-state">${element.State}</span></p>
        <p>Division: <span class="branch-Division">${element.Division}</span></p>
        <p>Region: <span class="branch-region">${element.Region}</span></p>
        <p>Pin Code: <span class="branch-code">${element.Pincode}</span></p>
    </div>
    `
    displayArea.innerHTML += container
}

function errorDisplay() {
    let errorMessage = `
        <div>
            <p class='error-message'>Error: No records found.</p>
        </div>
    `

    displayArea.innerHTML = errorMessage
}

