'use strict';

function displayResults(results,handle){
    console.log(results);
    if(results.length < 1){
        $('#search-error').text(`${handle} Does not have any repositories available.`);
    }else{
        const repos = results.map(function(entry){
            return `<li><a href="${entry.html_url}">View ${entry.name} Repository >></a></li>`;
        });
        $('#results-title').html(`Repositories for ${handle}`);
        $('#results-list').html(repos.join(""));
    }
  }
  
  function retrieveRepos(handle){
    fetch(`https://api.github.com/users/${handle}/repos?sort=created&direction=desc`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson,handle))
    .catch(error => {
        $('#search-error').text(`Sorry, there was an error: ${error.message}`);
    });
  }
  
  function initRepoFormListener() {
    $('#repo-form').submit(function(event) {
      event.preventDefault();

      //clear any previous lists/messages
      $('#search-error').html('');
      $('#results-title').html('');
      $('#results-list').html('');

      const handle = $('#github-handle').val().toLowerCase();
      retrieveRepos(handle);
    });
  }
  
  
  $(initRepoFormListener);