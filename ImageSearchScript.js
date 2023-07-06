// key from unplash --> H_mal username
const accessKey = '_kfNyKopw91kwm1_KIgjLCZkodhHHqhTvAH1bi6mJoI';

// *** *** VARIABLES *** *** 
const formEl = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const searchResultsEl = document.querySelector('.search-results');
const showMoreButton = document.getElementById('show-more-button');


// *** *** Main Function *** ***
formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    page = 1;

    if (searchInput.value === '') {
        return;
    }

    else {
        // call support function
        console.log('here');
        searchImages();

    }
});

// *** *** showMore Button *** ***
showMoreButton.addEventListener('click', function (e) {
    e.preventDefault();
    // call support function again
    searchImages();
});






// *** *** SUPPORT FUNCTIONS *** ***
let inputData = '';
let page = 1;

async function searchImages() {
    inputData = searchInput.value; // the submit form string value 
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${inputData}&client_id=${accessKey}`;
    // console.log(url); 
    const response = await fetch(url);
    const imageDataJSON = await response.json();
    // console.log(imageDataJSON); 

    const results = imageDataJSON.results;
    // console.log(imageDataJSON);
    // console.log(results);

    if (page == 1) {
        searchResultsEl.innerHTML = "";
    }

    // add 10 images at a time
    results.map((perItem) => {
        const imageWrapper = document.createElement('div');
        // newly created div called `imageWrapped` now has class `search-result` to it
        // imageWrapped = <div class=‘search-result’> </div>
        imageWrapper.classList.add('search-result');

        // <img> tag created.
        const image = document.createElement('img');
        image.src = perItem.urls.small;
        image.alt = perItem.alt_description;

        // <a> tag created. 
        const imageLink = document.createElement('a');
        imageLink.href = perItem.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = perItem.alt_description;

        // add info to imageWrappper = <div class='search-result'> `image` `imageLink`  </div>
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        // now the imageWrapped div looks like this
        /* imageWrapper = <div> 
                             <img>
                             <a> 
                          div>
        */
        searchResultsEl.appendChild(imageWrapper);
    }); // map over

    page++;
    if (page > 1) {
        showMoreButton.style.display = 'block';
    }
};





// Video Link: https://youtu.be/g6v_vbqKYeU?t=11721