/**
 * parses two floats present in string anywhere
 * @param str- string containing two numbers
 * @returns {number[]} float array of length 2 containing parsed numbers
 */
export function getNumbersFromString(str) {
  //get index of first digit in string
  var firstDigit = str.match(/\d/);
  var indexed = str.indexOf(firstDigit);
  //remove string before first digit
  var refinedString = str.substring(indexed, str.length);
  //parse float from string that starts from digit
  var firstNum = parseFloat(refinedString);
  //remove firstNum string from overall string
  refinedString = refinedString.replace(firstNum.toString(), "");
  //get index of second num
  var secondNumIndex = refinedString.indexOf(refinedString.match(/\d/));
  //remove everything before that
  refinedString = refinedString.substring(
    secondNumIndex,
    refinedString.length
  );
  //parse float from string that starts from digit
  var secondNum = parseFloat(refinedString);
  return [firstNum, secondNum];
}

/**
 * parses full path string got from server
 * @param pathString- path string containing comma separated tuples (1,2),(3,4)
 * @returns {[[float]]} 2d array with each element a [lat,lon] coordinates.
 */
export function parseFullPath(pathString) {
  return pathString
    .split(")")
    .filter((item) => item.trim().length !== 0)
    .map((item) => getNumbersFromString(item));
}

/**
 * returns a color object from present randomly
 * @returns {{color: string}} color object that can be used in map
 */
export function getRandomColorOptions() {
  const options = [{ color: "blue" }, { color: "purple" }, { color: "red" }];
  return options[Math.floor(Math.random() * 3)];
}

/**
 * cleans response data, changes its format, gets necessary info
 * @param response- response returned from server
 * @returns {[]} array of post objects
 */
export function cleanPostsData(response) {
  var cleanedDataArray = [];
  for (var i = 0; i < response.data.length; i++) {
    var post = response.data[i];
    var obj = {
      id: post.id,
      title: post.title,
      completePath: parseFullPath(post.complete_path_gps),
      creationDate: post.creation_date,
      modificationDate: post.modified_date,
      authorID: post.author.id,
      authorUserName: post.author.username,
      authorUserType: post.author.user_type
    };
    console.log(obj);
    cleanedDataArray.push(obj);
  }
  return cleanedDataArray;
}

/**
 * cleans response data, changes its format, gets necessary info
 * @param response- response returned from server
 * @returns {[]} array of marker objects
 */
export function cleanMarkersData(response) {
  var markersDataArray = [];
  for (var i = 0; i < response.data.length; i++) {
    const obj = response.data[i];
    var marker = {};
    marker.id = obj.id;
    var classes = obj.marker_classes.split("and");
    marker.classes = classes.map((item) => item.trim().toLowerCase());
    marker.lat = parseFloat(obj.marker_lattitude);
    marker.lon = parseFloat(obj.marker_longitude);
    marker.postID = obj.post;
    marker.imagePath = obj.marker_image;
    marker.title = "marker id:" + marker.id + " | Post id: " + marker.postID;
    markersDataArray.push(marker);
  }
  return markersDataArray;
}