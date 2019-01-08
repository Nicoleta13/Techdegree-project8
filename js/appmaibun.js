const photos    = document.getElementById('photos');
const overlay   = document.querySelector('.overlay-modal');
const closeBtn  = document.querySelector('.closeBtn');
const prev      = document.querySelector('.prev');
const next      = document.querySelector('.next');
let employees;
let employee;
let employeePopup;
let cell, address, birthday;


//Make a fetch request
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(checkStatus)
  .then(response    => response.json())
  .then(data        => {
    employees = data.results;
    generateImage(employees);
  });


// function capitalize(item) {
//     return item.slice(0,1).toUpperCase()+item.slice(1);
// }

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}


function generateImage(data) {
  employees.forEach((employee, index) => {
    let container = data
      .map(employee => `
        <div "class="image-container">
            <img  class="large-img" src=${employee.picture.large} alt=${employee.name.first}>
            <div  class="employee-info">
            <span class="name">${employee.name.first} ${employee.name.last} </span><br>
            <span class="email">${employee.email}</span><br>
            <span class="cell" style="display: none">${employee.cell}</span>
            <span class="city">${employee.location.city}</span><br>
            <span class="address" style="display: none">${employee.location.street} ${employee.location.state} ${employee.location.postcode}</span><br>
            <span class="birtday" style="display: none">Birthday: ${new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language)}</span>
          </div>
        </div>`).join("");
    //Store arbitrary data associated with the matched elements
    $('.image-container').data("item", index);
    photos.innerHTML = container;
    employees[index].display = true;
    $('.cell').hide();
    $('.address').hide();
    $('.birthday').hide();

  });

}

function generateModalPopup(data) {
  if(item < 0 || item >= employees.length) {
    return;
  }
  employee = employees[item];
  console.log(employee);
  let modalBox = `
    <div class="popup-modal">
    ${employeeInfo}
    </div>`;
  overlay.innerHTML = modalBox;
  overlay.style.display = block;
  cell.show();
  address.show();
  birthday.show();
}

  // NEXT PREVIOUS BUTTONS
//
//   let i = 0;
//   function mySlide(param) {
//     if(param === 'next') {
//       i++;
//       if(i === photos.length) {
//         i = photos.length - 1;
//       } else {
//         i--;
//         if(i < 0) {
//           i = 0;
//       }
//     }
//     document.getElementById('id').id = photos[i];
//   }
// }
//
//
//   // ------------------------------------------
//   //  EVENT LISTENERS
//   // ------------------------------------------
//
//   // When the user clicks on <span> (x), close the modal
// function closeEmployeeCard () {
//   closeBtn.addEventListener('click', () => {
//     overlay.style.display = "none";
//   });
// }
//
// const popupModal = document.querySelector('popup-modal');
// let employeeById = document.getElementById('id');
// employeeById.addEventListener('click', () => {
//   overlay.style.display = "block";
//   generateModalPopup();
//   closeEmployeeCard();
// });
