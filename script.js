var jsonObject = "";
var target = "data.json"
if (document.title == "往届考题")
  target = "previous.json"
var url = "http://38324.cn/UnifiedExaminationExercises/Resource/"+target

Initialization()

function Initialization(){
  $.get(url, function(data, status){
    jsonObject = data;//jQuery.parseJSON(data);
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
  reg = new RegExp("[\\u4E00-\\u9FFF]+","g");

  if(!reg.test(answer))
  {
    nextIssue();
    return;
  }

  document.getElementById("Topic").innerHTML = topic;
  document.getElementById("Answer").innerHTML = answer;
}
