var url = "https://raw.githubusercontent.com/Voidmort/UnifiedExaminationExercises/main/Resource/data.json"
var jsonObject = "";

Initialization()

function Initialization(){
  $.get(url, function(data, status){
    jsonObject = jQuery.parseJSON(data);
    nextIssue()
  });
}

function nextIssue()
{
  data = jsonObject["data"]
  title = jsonObject["title"]
  item = data[Math.floor(Math.random() * data.length)];
  topic = "parentName<br>titleName".replace("titleName", item["titleName"]).replace("parentName", title[item["parentID"]]);
  answer = item["content"].replace(/(\r\n|\n|\r)/gm, "<br>");

  document.getElementById("Topic").innerHTML = topic;
  document.getElementById("Answer").innerHTML = answer;
}

