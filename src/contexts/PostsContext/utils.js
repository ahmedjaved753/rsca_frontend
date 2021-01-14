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

export function parseFullPath(pathString) {
    return pathString
        .split(")")
        .filter((item) => item.trim().length !== 0)
        .map((item) => getNumbersFromString(item));
}


export function getRandomColorOptions() {
    const options = [{ color: "blue" }, { color: "purple" }, { color: "red" }];
    return options[Math.floor(Math.random() * 3)];
}


export function cleanPostsData(response){
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
        authorUserType: post.author.user_type,
      };
      console.log(obj);
      cleanedDataArray.push(obj);
    }
    return cleanedDataArray;
}


export function cleanMarkersData(response){
    var markersDataArray=[]
    for(var i=0;i<response.data.length;i++) {
      const obj=response.data[i]
      var marker={}
      marker.id=obj.id
      var classes=obj.marker_classes.split("and")
      marker.classes=classes.map((item)=>item.trim().toLowerCase())
      marker.lat=parseFloat(obj.marker_lattitude)
      marker.lon=parseFloat(obj.marker_longitude)
      marker.postID=obj.post
      marker.imagePath=obj.marker_image
      marker.title="marker id:"+marker.id+" | Post id: "+marker.postID
      markersDataArray.push(marker)  
    }

    console.log("markersdataarray",markersDataArray)
    return markersDataArray;
}