(function(){
  let inputForm = document.querySelector('.form__search')
  let searchedPlayer = document.querySelector('[name="search-name"]');
  let searchedSeason = document.querySelector('[name="search-season"]');
  let searchSubmitBtn = document.querySelector('.form__submitbtn');
  let playerName = document.querySelector('.stat__player-name');
  let playerNumber = document.querySelector('.stat__player-number');
  let playerPosition = document.querySelector('.stat__position');
  let playerTeam = document.querySelector('.stat__team');
  let playerHeight = document.querySelector('.stat__height');
  let playerPoints = document.querySelector('.stat__points');
  let playerRebounds = document.querySelector('.stat__rebounds');
  let playerAssists = document.querySelector('.stat__assists');
  let playerSteal = document.querySelector('.stat__steals');
  let playerBlocks = document.querySelector('.stat__blocks');
  let playerMinsPG = document.querySelector('.stat__mpg');
  let playerFgPct = document.querySelector('.stat__fgpct');
  let player3ptPct = document.querySelector('.stat__3ptpct');
  let playerFTPct = document.querySelector('.stat__ftpct');

  let fetchPlayerData = async (firstName, lastName, season = 2019) => {
    // fetch player details
    let detailsReponse = await fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}_${lastName}`);
    let { data: [ detailsJson ] } = await detailsReponse.json();
    let playerID = detailsJson.id;

    // fetch player season stats
    let seasonStatsResponse = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerID}`);
    let { data: [ seasonStatsJson ] } = await seasonStatsResponse.json();
  };

  







  // Event Listeners =====================================
  searchSubmitBtn.addEventListener('click', (event) => {
    // prevents the form from submitting and refreshing the page
    event.preventDefault();
    // search values from user input
    let [playerFirstName, playerLastName] = searchedPlayer.value.split(" ");
    let searchSeason = searchedSeason.value;
    // calling the fetch data function
    fetchPlayerData(playerFirstName, playerLastName, searchSeason);
  })


})();