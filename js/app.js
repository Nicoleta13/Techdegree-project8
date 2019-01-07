    const photos    = document.getElementById('photos');
    const overlay   = document.querySelector('.overlay-modal');
    const closeBtn  = document.querySelector('.closeBtn');
    const prev      = document.querySelector('.prev');
    const next      = document.querySelector('.next')




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
    }

    const largeImg   = document.querySelector('.large-img');
    const name       = document.querySelector('.name');
    const email      = document.querySelector('.email');
    const cell       = document.querySelector('.cell');
    const city       = document.querySelector('.city');
    const address    = document.querySelector('.address');
    const birthday   = document.querySelector('.birthday');

    function generateModalPopup(data) {
      if(index >= 0 && index <= 11) {
        return;
      }
      let modalBox = `
        <div class="popup-modal">
          <div class="modal-img">
            <img class="large-img" src=${largeImg} alt=${name}>
          </div>
          <div class="employee-info">
            <span class="name">${name}</span><br>
            <span class="email">${email}</span><br>
            <span class="city">${city}</span>
          </div><hr>
          <div class="extra-info">
            <span class="cell">${cell}<span><br>
            <span class="address">${address}</span><br.
            <span class="birthday">Birthday: ${birthday}</span>
          </div>
        </div>`;
      overlay.innerHTML = modalBox;
    }

      // NEXT PREVIOUS BUTTONS

    let i = 0;
    function mySlide(param) {
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


    // ------------------------------------------
    //  EVENT LISTENERS
    // ------------------------------------------

    // When the user clicks on <span> (x), close the modal
  function closeEmployeeCard () {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = "none";
    });
  }

  const popupModal = document.querySelector('popup-modal');
  let employeeById = document.getElementById('id');
  employeeById.addEventListener('click', () => {
    overlay.style.display = "block";
    generateModalPopup();
    closeEmployeeCard();
  });
