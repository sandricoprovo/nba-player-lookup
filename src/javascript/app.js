(function(){
  let searchedPlayer = document.querySelector('[name="search-name"]');
  let searchedSeason = document.querySelector('[name="search-season"]');
  let searchSubmitBtn = document.querySelector('.form__submitbtn');
  let toggleThemebtn = document.querySelector('.page__theme-toggle');
  let playerName = document.querySelector('.stat__player-name');
  let playerPosition = document.querySelector('.stat__position');
  let playerTeamName = document.querySelector('.stat__team');
  let playerTeamLogo = document.querySelector('.player__teamlogo');
  let playerHeight = document.querySelector('.stat__height');
  let currentSeason = document.querySelector('.stat__season');
  let playerPoints = document.querySelector('.stat__points');
  let playerRebounds = document.querySelector('.stat__rebounds');
  let playerAssists = document.querySelector('.stat__assists');
  let playerSteals = document.querySelector('.stat__steals');
  let playerBlocks = document.querySelector('.stat__blocks');
  let playerMinsPG = document.querySelector('.stat__mpg');
  let playerFgPct = document.querySelector('.stat__fgpct');
  let player3ptPct = document.querySelector('.stat__3ptpct');
  let playerFTPct = document.querySelector('.stat__ftpct');

  // FUNCTION: This function takes in the first name, last name and season that were entered by the user, fetchs the player details such as their name, team, etc., and then fetchs the player seasons by season using the player id and the season entered by the user. 
  let fetchPlayerData = async (firstName, lastName, season = 2019) => {
    // fetch player details
    const detailsReponse = await fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}_${lastName}`);
    const { data: [ detailsJson ] } = await detailsReponse.json();
    const playerID = detailsJson.id;

    // fetch player season stats
    const seasonStatsResponse = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerID}`);
    const { data: [ seasonStatsJson ] } = await seasonStatsResponse.json();

    // makes sure that both datasets are returned
    if (detailsJson === undefined || seasonStatsJson === undefined) {
      showErrorPopup();
    } else {
      createPlayerObject(detailsJson, seasonStatsJson); // creates player object
    }
  };

  // FUNCTION: This function takes in the playerDetails and season stats objects, and create one object with all of the data that'll be displayed to the page. 
  let createPlayerObject = (playerDetails, statsSeason) => {
    // The main player object.
    let playerObj = {
      details: {
        name: `${playerDetails.first_name} ${playerDetails.last_name}`,
        team: playerDetails.team.full_name,
        teamAbbr: playerDetails.team.abbreviation,
        position: playerDetails.position,
        height: `${playerDetails.height_feet}'${playerDetails.height_inches}`
      },
      stats: {
        season: statsSeason.season,
        points: statsSeason.pts,
        rebounds: statsSeason.reb,
        assists: statsSeason.ast,
        steals: statsSeason.stl,
        blocks: statsSeason.blk,
        minspg: statsSeason.min,
        fgpct: statsSeason.fg_pct,
        pct3pt: statsSeason.fg3_pct,
        ftpct: statsSeason.ft_pct
      }
    }
    showPlayerDetails(playerObj); // displays player details to page
  };

  // FUNCTION: This function destructures the playerObj object, and uses its properties to load the player information to the page. 
  let showPlayerDetails = ({ details, stats }) => {
    // Player Information
    playerName.textContent = details.name;
    playerTeamName.textContent = `Current Team: ${details.team}`;
    playerPosition.textContent = `Position: ${details.position}`;
    if (details.height.length > 0) {
      playerHeight.textContent = `Height: ${details.height}`;
    }
    playerTeamLogo.setAttribute('src', `./src/images/${details.teamAbbr}_LOGO.png`);
    playerTeamLogo.setAttribute('alt', `The team logo for the ${details.team}.`);
    // Player Stats
    currentSeason.textContent = `${stats.season} Season Per Game Stats`;
    playerPoints.textContent = stats.points;
    playerRebounds.textContent = stats.rebounds;
    playerAssists.textContent = stats.assists;
    playerSteals.textContent = stats.steals;
    playerBlocks.textContent = stats.blocks;
    playerMinsPG.textContent = stats.minspg;
    playerFgPct.textContent = stats.fgpct;
    player3ptPct.textContent = stats.pct3pt;
    playerFTPct.textContent = stats.ftpct;
  };

  // FUNCTION: This function shows the error popup if either sets of data return empty
  let showErrorPopup = () => {
    let errorPopup = document.querySelector('.search__error-popup');
    errorPopup.style.display = "block";
    errorPopup.style.opacity = 1;
  };

  // Event Listeners =====================================
  // submits the search variables entered by the user
  searchSubmitBtn.addEventListener('click', (event) => {
    // prevents the form from submitting and refreshing the page
    event.preventDefault();
    // search values from user input
    const [playerFirstName, playerLastName] = searchedPlayer.value.split(" ");
    const searchSeason = searchedSeason.value;
    // calling the fetch data function
    fetchPlayerData(playerFirstName.toLowerCase(), playerLastName.toLowerCase(), searchSeason.toLowerCase());
  });

  // Toggles the site color themes
  toggleThemebtn.addEventListener('click', () => {
    let contentContainer = document.querySelector('.container');
    if (contentContainer.dataset.theme !== "default") {
      contentContainer.dataset.theme = "default";
    } else {
      contentContainer.dataset.theme = "dark"
    }
  })

  document.querySelector('.error__exit').addEventListener('click', () => {
    let errorPopup = document.querySelector('.search__error-popup');
    errorPopup.style.display = "none";
    errorPopup.style.opacity = 0;
  })
})();