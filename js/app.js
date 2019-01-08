const photos    = document.getElementById('photos');
const overlay   = document.querySelector('.overlay-modal');
const prev      = document.querySelector('.prev');
const next      = document.querySelector('.next');

let employeeById;




// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
//Make a fetch request
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(checkStatus)
  .then(response    => response.json())
  .then(data        => generateImage(data.results))
  .catch(error      => alert('Looks like there is a problem!'));

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

const photoElements = document.getElementsByClassName('image-container');
function addId() {
  for (var i = 0; i < photoElements.length; i++) {
    photoElements[i].id = i;
  }
}

function generateImage(data) {
  //create the mark up for images using interpolation
  // ${data} will be the url returned from the API
  const html = data
    .map(employee => `
      <div id="${addId} "class="image-container">
        <div class="delimitation">
          <img class="large-img" src=${employee.picture.large} alt=${employee.name.first}>
        </div>
        <div class="employee-info">
          <span class="name">${employee.name.first} ${employee.name.last} </span><br>
          <span class="email">${employee.email}</span><br>
          <span class="cell" style="display: none">${employee.cell}</span>
          <span class="city">${employee.location.city}</span><br>
          <span class="address" style="display: none">${employee.location.street} ${employee.location.state} ${employee.location.postcode}</span><br>
          <span class="birtday" style="display: none">Birthday: ${new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language)}</span>
        </div>
      </div>`).join("");
  photos.innerHTML = html;
  addId();
  // **** Moved this code block due to the 'image-container' class being dynamically added by your template literal above
  // **** Changed "employeeById" variable to select ALL of your user cards by the `.image-container` class.
  // **** Currently set to target the first [0] card/index only, you will need to build a "for" or "forEach" loop to add the eventListener to all of them.

  // let employeeById = document.querySelectorAll('.image-container');
  //   employeeById[0].addEventListener('click', () => {
  //     overlay.style.display = "block";
  //     // **** passes api array to modal, and employee index position (currently manually set to index position 0, replace with what you use with your for or forEach iteration counter)
  //     generateModalPopup(data, 0);
  //   });
  // }

  let employeeById = document.querySelectorAll('.image-container');
  for(i = 0; i < employeeById.length; i++) {
    employeeById[i].addEventListener('click', () => {
      overlay.style.display = "block";
      // **** passes api array to modal, and employee index position (currently manually set to index position 0, replace with what you use with your for or forEach iteration counter)
      generateModalPopup(data, i);
    });
  }
}


function generateModalPopup(data, index) {
  let employee = data[index];
  // **** Added correctly data to be interpolated to build the modal user info
  let modalBox = `
    <div class="popup-modal">
      <div class="nav">
        <img class="closeBtn" src="icons/close.png">
        <img class="prev" src="icons/prev.png" onclick="mySlide('prev');">
        <img class="next" src="icons/next.png"  onclick="mySlide('next');">
      </div>
      <img class="picture" src=${employee.picture.large} alt=${employee.name.first}>
      <div class="employee-card">
        <span class="name">${employee.name.first} ${employee.name.last} </span><br>
        <span class="email">${employee.email}</span><br>
        <span class="city">${employee.location.city}</span>
      </div><hr>
      <div class="extra-info">
        <span class="cell">${employee.phone}<span><br>
        <span class="address">${employee.location.street} ${employee.location.state} ${employee.location.postcode}</span><br>
        <span class="birthday">Birthday: ${new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language)}</span>
      </div>
    </div>`;
  overlay.innerHTML = modalBox;
  // **** Moved this code block here due to the 'closeBtn' class being dynamically generated above
  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    overlay.style.display = "none";
  });

}


  // NEXT PREVIOUS BUTTONS


function mySlide(param) {
  let i = 0;
  if(param === 'next') {
    i++;
    if(i === photos.length) {
      i = photos.length - 1;
    } else {
      i--;
      if(i < 0) {
        i = 0;
    }
  }
  document.getElementById('id').id = photos[i];
}
}
