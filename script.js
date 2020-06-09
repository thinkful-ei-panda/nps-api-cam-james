const apiKey = '8oAFsfvogYIiYXdz2cWZJxRaqpRrKkO7NN7n4KOU',
  searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(jsonData) {
  // if there are previous results, remove them
  console.log(jsonData);
  console.log('display results ran!')
  const html = [];
  // iterate through the items array
  console.log(jsonData.data.length);
  for (let i = 0; i < jsonData.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    // console.log(jsonData.data[i].url);
    // console.log(jsonData.data[i].fullName);
    // console.log(jsonData.data[i].addresses[0]);
    // console.log(jsonData.data[i].description);
    html.push(`
      <li>
        <a href='${jsonData.data[i].url}' class='park-heading'>${jsonData.data[i].fullName}</a>
        <p>${jsonData.data[i].addresses[0].line1}</p>
        <p>${jsonData.data[i].addresses[0].line2}</p>
        <p>${jsonData.data[i].addresses[0].line3}</p>
        <p>${jsonData.data[i].addresses[0].city}, ${jsonData.data[i].addresses[0].stateCode} ${jsonData.data[i].addresses[0].postalCode}</p>
        <p>${jsonData.data[i].description}</p>
      </li>`
    );
  }

  console.log(html);

  $('#results-list').html(html.join(''));
  console.log(html.join(''));
  //display the results section  
  $('#results').removeClass('hidden');
}

function getResults (searchTerm, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: searchTerm,
    limit: maxResults
  };
  const queryString = formatQueryParams(params),
    url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log('Response is ok!')
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson);
      console.log('displayResults finished running!')
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function handleSubmit () {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val(),
      maxResults = $('#js-max-results').val();
    getResults(searchTerm, maxResults);
  });
}

$(handleSubmit);