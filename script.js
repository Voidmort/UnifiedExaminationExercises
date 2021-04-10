var jsonObject = "";
var target = "data.json"
if (document.title == "往届考题")
  target = "previous.json"
var url = "https://raw.githubusercontent.com/Voidmort/UnifiedExaminationExercises/main/Resource/"+target

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

  if (answer.length < 2)
  {
    nextIssue();
    return;
  }

  document.getElementById("Topic").innerHTML = topic;
  document.getElementById("Answer").innerHTML = answer;
}

