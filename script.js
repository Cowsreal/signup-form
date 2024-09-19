const inputFields = document.querySelectorAll('input');
const requiredFields = document.getElementsByClassName('required');
const errorTexts = document.getElementsByClassName('error');
const inputMap = new Map();
const submitButton = document.getElementById('formSubmitButton');
const submitFailure = document.getElementsByClassName('formSubmitFailureMessage');

for(let i = 0; i < inputFields.length; i++)
{
    inputMap.set(inputFields[i], i);
}

for(let i = 0; i < requiredFields.length; i++)
{
    let currFieldIdx = inputMap.get(requiredFields[i]);
    let currErrorDisp = errorTexts[currFieldIdx];
    inputFields[currFieldIdx].addEventListener('keyup', (event)=>
    {
        if(event.target.value === "")
        {
            currErrorDisp.textContent = "*This field is required";
        }
        else
        {
            currErrorDisp.textContent = "";
        }
    });
}

inputFields[4].addEventListener('keyup', (event)=>
{
    const phoneRegex = /^(?:\+1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let currErrorDisp = errorTexts[4];
    if(event.target.value === "")
    {
        currErrorDisp.textContent = "*This field is required";
    }
    else if(!phoneRegex.test(event.target.value))
    {
        currErrorDisp.textContent = "*Please enter a valid phone number.";
    }
    else
    {
        currErrorDisp.textContent = "";
    }
}
);

inputFields[2].addEventListener('keyup', (event)=>
{
    let currErrorDisp = errorTexts[2];
    if(event.target.value.length < 8)
    {
        currErrorDisp.textContent = "*Minimum 8 Characters";
    }
    else
    {
        currErrorDisp.textContent = "";
    }
}
);

inputFields[5].addEventListener('keyup', (event)=>
{
    let currErrorDisp = errorTexts[5];
    if(event.target.value === inputFields[2].value)
    {
        currErrorDisp.textContent = "";
    }
    else
    {
        currErrorDisp.textContent = "Passwords do not match";
    }
}
);

submitButton.addEventListener('click', (event)=>
{
    event.preventDefault();
    let reqFilled = 0;
    for(let i = 0; i < requiredFields.length; i++)
    {
        if(inputFields[inputMap.get(requiredFields[i])].value == "")
        {
            continue;
        }
        reqFilled++;
    }
    if(reqFilled != requiredFields.length)
    {
        submitFailure[0].textContent = "Please fill out all required fields!";
    }
    else
    {
        window.location.reload();
    }
}
);