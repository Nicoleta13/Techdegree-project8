    const search = document.querySelector('search');
    const photos = document.getElementById('photos');
    const imageContainer = document.querySelector('image-container');



    // ------------------------------------------
    //  FETCH FUNCTIONS
    // ------------------------------------------
        //Make a fetch request
        fetch("https://randomuser.me/api/?results=12&nat=us")
          .then(checkStatus)
          .then(response => response.json())
          .then(data => generateImage(data.results))
          .catch(error => alert('Looks like there is a problem!'));

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

      function generateImage(data, index) {
        //create the mark up for images using interpolation
        // ${data} will be the url returned from the API
        const html = data
          .map(employee => `
            <div id="${index}"class="image-container">
              <div class="delimitation">
                  <img class="large-img" src=${employee.picture.large} alt=${employee.name.first}>
              </div>
              <div class="employee-info">
                <span class="name">${employee.name.first} ${employee.name.last} </span><br>
                <span class="email">${employee.email}</span><br>
                <span class="city">${employee.location.city}</span>
              </div>
            </div>`).join("");
          photos.innerHTML = html;
          addId();
      }
      function addId() {
        for(i = 0; i < photos.length; i++) {
          photos[i].setAttribute("id", i);
        } }

      // get the modal popup

    // When the user clicks on <span> (x), close the modal
      // span.onclick = function() {
      //   modal.style.display = "none";
      // };

      function generateModalPopup(data) {
        let idVal = imageContainer.getAttribute('id');
        if(idVal < 0 && idVal >= 11) {
          return;
        }

        // const modalBox = data
        // .map()`
        //     <div class="popup-modal" style="display: none">
        //       <div class="modal-img">
        //         <img class="large-img" src=${employee.picture.large} alt=${employee.name.first}>
        //       </div>
        //       <div class="employee-info">
        //         <span class="name">${employee.name.first} ${employee.name.last} </span><br>
        //         <span class="email">${employee.email}</span><br>
        //         <span class="city">${employee.location.city}</span>
        //       </div><hr>
        //       <div class="extra-info">
        //         <span>${employee.cell}<span><br>
        //         <span>${employee.location.street} ${employee.location.city} ${employee.location.state} ${employee.location.postcode}</span><br.
        //         <span>Birthday: ${new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language)}</span>
        //       </div>
        //     </div>`;
        //   overlay-modal.innerHTML = modalBox;
      }



    // ------------------------------------------
    //  EVENT LISTENERS
    // ------------------------------------------

    function popupEmployeeData(employees) {
    employees.forEach((employee) => {
        let card = document.getElementById(employee.id);
        card.addEventListener("click", event => employee.generateEmployeeModal());
    });
}

  // for(i = 0; i<employees.length; i++) {
  //   let index = employees[i];
  // }


    // imageContainer.addEventListener('click', => function(employee-data) {
    //   generateModalPopup();
    //   overlay-modal.style.display = "block";
    //   popup-modal.style.display = "block";
    //
    // });


    // ------------------------------------------
    //  SEARCH
    // ------------------------------------------


        //search bar

    // $('.search').keyup(function() {
    //   var srchInput = $('.search').val();
    //   var regex = new RegExp('(?=[^\\s])' + srchInput, 'gi');
    //   var sorted = '';
    //   var results = [],
    //   sortedResultNames = [];
    //   $.getJSON('data.json', function(data) {
    //     $.each(data, function(key, val) { // index, obj
    //       if (val.name.search(regex) != -1) {
    //         results.push(val);
    //         sortedResultNames.push(val.name);
    //       } else {
    //         $.each(val.keywords, function(i, keyword) {
    //           if (keyword.search(regex) != -1) {
    //             results.push(val);
    //             sortedResultNames.push(val.name);
    //             return false;
    //           }
    //         });
    //       }
    //     });
    //     sortedResultNames = sortedResultNames.sort();
    //     $.each(sortedResultNames, function(i, nameVal) {
    //       $.each(results, function(key, val) {
    //         if (val.name == nameVal) {
    //           sorted += '<li><h2><a href="' + val.web + '">' +
    //                     val.name + '</a></h2>';
    //           sorted += '<p>' + val.description + '</p></li>';
    //         }
    //       });
    //     });
    //     $('.results').html(sorted);
    //   });
    // });
    // document.getElementById('home').addEventListener('click', function() {
    //   window.location.href = 'index.html';
    // });
