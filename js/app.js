const photos    = document.getElementById('photos');
const overlay   = document.querySelector('.overlay-modal');

let employeeById;


//Make a fetch request
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(checkStatus)
  .then(response    => response.json())
  .then(data        => generateImage(data.results))
  .catch(error      => alert('Looks like there is a problem!'));


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

  employeeById = document.querySelectorAll('.image-container');
  for( let i = 0; i < employeeById.length; i++) {
    employeeById[i].addEventListener('click', () => {

      overlay.style.display = "block";
      $(employeeById[i]).addClass('selected');
      // **** passes api array to modal, and employee index position (currently manually set to index position 0, replace with what you use with your for or forEach iteration counter)
      generateModalPopup(data, i);
    });
  }
}

function generateModalPopup(data, index) {
  let employee = data[index];
  let modalBox = `
    <div class="popup-modal">
      <div class="nav">
        <img class="closeBtn" src="icons/close.png">
        <img class="prev" src="icons/prev.png">
        <img class="next" src="icons/next.png">
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
  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    overlay.style.display = "none";
    $(employeeById).removeClass('selected');
      });


      // Next prev buttons
      if(index <= 0 ) {
          $('.prev').hide();
        }

        if(index === employeeById.length - 1) {
          $('.next').hide();
        }

        $('.next').click(function () {
          $('.prev').show();
          if (index < employeeById.length - 1) {
            generateModalPopup(data, index + 1);
          } else {
            $('.next').hide();
          }
        });

        $(".prev").click(function () {
          $('.next').show();
          if (index > 0) {
            generateModalPopup(data, index - 1);
          } else {
            $(".prev").hide();
          }
        });
      }
