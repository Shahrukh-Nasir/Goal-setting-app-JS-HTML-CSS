const checkboxlist = document.querySelectorAll('.customcheckbox')
const inputfields = document.querySelectorAll('.goal-input')
const progressbar = document.querySelector('.progressbar')
const progressvalue = document.querySelector('.progressvalue')
const progresslabel = document.querySelector('.progresslable')

const allqoutes = [
    'raise the bar by completing your goals !',
    'well begun is half done !',
    'just a step away keep going !',
    'woah! you just completed all the goals !'

]




// created this object for local storage and geting it from user and converting it into object by parsing
const allGoals =  JSON.parse(localStorage.getItem('allGoals')) || {

    first: {

        name: '',
        completed: false,
    },
    second: {

        name: '',
        completed: false,
    },
    third: {

        name: '',
        completed: false,
    }
}

//this is to convert allgoas into arry using object.value and then filter the completed one 
let completedgoalscount = Object.values(allGoals).filter((goal) => goal.completed).length
progressvalue.style.width = `${(completedgoalscount / inputfields.length) * 100}%`
progressvalue.firstElementChild.innerText = `${completedgoalscount}/${inputfields.length}`
progresslabel.innerText = allqoutes[completedgoalscount]



checkboxlist.forEach((checkbox)=> {
    checkbox.addEventListener('click',(e)=>{
        //every function is used here to check if all fields are filled or not.
        const allgoalsadded = [...inputfields].every((input)=>{
            //input value is returned here to check if there is any value in input fields.
            return input.value
            
        })
        if(allgoalsadded){
            checkbox.parentElement.classList.toggle('completed')
            //converting completed class if its true then become false and viseversa
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedgoalscount = Object.values(allGoals).filter((goal) => goal.completed).length
            //increasing the progress bar dynamically
            progressvalue.style.width = `${(completedgoalscount / inputfields.length) * 100}%`
            progressvalue.firstElementChild.innerText = `${completedgoalscount}/${inputfields.length}`
            progresslabel.innerText = allqoutes[completedgoalscount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }else{
            progressbar.classList.add('showerror')
        }
    })
})

inputfields.forEach((input)=>{
    //setting values for input fields to show on the app 
  input.value = allGoals[input.id].name

  //add the completed class on inputfields when clicked on checkbox
  if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed')
  }

    input.addEventListener('focus',()=> {
        progressbar.classList.remove('showerror')
    })
    input.addEventListener('input',(e)=>{

        // validation when user mark a goal completed it will not allow user to write in inout field
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
          }
        
        
        //converting allgoals into object and updating it in local storage
        allGoals[input.id].name = input.value
         
        // saving to local storage
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})