import { saveNewTask, projectArray } from './projectmanager.js';
import { startOfToday } from 'date-fns';


function removeChildElements(parent){
  while (parent.firstChild) {
     parent.firstChild.remove()
  }
}

function cancelButton() {
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancelbutton');
  cancelButton.textContent = 'Cancel';
  cancelButton.setAttribute("type", "button");
  cancelButton.addEventListener('click', function(){
    cancelForm();
    const overlay = document.getElementById('overlay');
    overlay.style.visibility = 'hidden';
  })
  return cancelButton;
}


function cancelForm() {
  let form = document.querySelector('.form')
  form.reset();
  let formcontainer = document.querySelector('.formcontainer');
  formcontainer.remove();
}

function ntform() {

  console.log(`Running the new task form function and the current projectArray is ${projectArray} and the first object in it is named ${projectArray[0].pTitle} and the length is ${projectArray.length}`);

  // New Task Form Container Div
  const ntFormContainer = document.createElement('div');
  ntFormContainer.classList.add('formcontainer');
  // Header Title
  const ntFormHeading = document.createElement('h4');
  ntFormHeading.textContent = 'Create a new task:'
  ntFormHeading.classList.add('formheading');
  // New Task Form
  const newTaskForm = document.createElement('form');
  newTaskForm.classList.add('taskform');
  newTaskForm.classList.add('form');
  newTaskForm.id = 'newtaskform';
  // create task title label
  const taskTitleLabel = document.createElement('label');
  taskTitleLabel.classList.add('formlabel');
  taskTitleLabel.setAttribute("for","ttitle");
  taskTitleLabel.textContent = ('* Title');
  // create input for project title
  const taskTitle = document.createElement('input');
  taskTitle.setAttribute("type", "text");
  taskTitle.setAttribute("name", "ttitle");
  taskTitle.setAttribute("id", "ttitle");
  taskTitle.setAttribute("required", "required");
  taskTitle.setAttribute("placeholder", "title");
  // description label
  const taskDescriptionLabel = document.createElement('label');
  taskDescriptionLabel.classList.add('formlabel');
  taskDescriptionLabel.setAttribute("for","tdescription");
  taskDescriptionLabel.textContent = ('Description');
  // description input
  const taskDescription = document.createElement('textarea');
  taskDescription.setAttribute("type", "text");
  taskDescription.setAttribute("name", "tdescription");
  taskDescription.setAttribute("id", "tdescription");
  taskDescription.setAttribute("placeholder", "description");
  // due date label
  var today = startOfToday()
  const taskDueDateLabel = document.createElement('label');
  taskDueDateLabel.classList.add('formlabel');
  taskDueDateLabel.setAttribute("for","tduedate");
  taskDueDateLabel.textContent = ('Due Date');
  // due date input
  const taskDueDate = document.createElement('input');
  taskDueDate.setAttribute("type", "date");
  taskDueDate.setAttribute("id", "tduedate");
  taskDueDate.setAttribute("name", "tduedate");
  const dueDateMin = new Date().toISOString().split('T')[0];
  taskDueDate.setAttribute("min", dueDateMin);
  // associated project label
  const taskAssociatedProjectLabel = document.createElement('label');
  taskAssociatedProjectLabel.classList.add('formlabel');
  taskAssociatedProjectLabel.setAttribute("for","tassociatedproject");
  taskAssociatedProjectLabel.textContent = ('Save to Project:');
  // associated project options
  const taskAssociatedProject = document.createElement('select');
  taskAssociatedProject.setAttribute("id", "tassociatedproject");
  taskAssociatedProject.setAttribute("name", "tassociatedproject");
  for (var i = 0; i < projectArray.length; i++) {
    var currentOption = document.createElement('option');
    currentOption.setAttribute("value", `${projectArray[i].projectUUID}`);
    currentOption.textContent = projectArray[i].pTitle;
    currentOption.id = `option-${i}`;
    taskAssociatedProject.appendChild(currentOption);
  }


  // submit button
  const newTaskSubmitButton = document.createElement('button');
  newTaskSubmitButton.classList.add('savebutton');
  newTaskSubmitButton.textContent = 'Save';
  newTaskSubmitButton.setAttribute("type", "button");

  // buttons div
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');

  // required note
  const requiredNote = document.createElement('p');
  requiredNote.classList.add('requirednote');
  requiredNote.textContent = '* = required';




  newTaskForm.appendChild(taskTitleLabel);
  newTaskForm.appendChild(taskTitle);
  newTaskForm.appendChild(taskDescriptionLabel);
  newTaskForm.appendChild(taskDescription);
  newTaskForm.appendChild(taskDueDateLabel);
  newTaskForm.appendChild(taskDueDate);
  newTaskForm.appendChild(taskAssociatedProjectLabel);
  newTaskForm.appendChild(taskAssociatedProject);
  newTaskForm.appendChild(buttonsDiv);
  newTaskForm.appendChild(requiredNote);
  buttonsDiv.appendChild(newTaskSubmitButton);
  buttonsDiv.appendChild(cancelButton());
  ntFormContainer.appendChild(ntFormHeading);
  ntFormContainer.appendChild(newTaskForm);

  // event listener
  newTaskSubmitButton.addEventListener("click", function(){
    // first put checkForRequired function here
    saveNewTask();
    newTaskForm.reset();
    ntFormContainer.remove();
    const overlay = document.getElementById('overlay');
    overlay.style.visibility = 'hidden';
  });

  return ntFormContainer;
}

export { ntform };