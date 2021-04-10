
var httpRequest = new XMLHttpRequest();
var jsonObject = "";

httpRequest.open('GET', 'https://raw.githubusercontent.com/Voidmort/UnifiedExaminationExercises/main/Resource/data.json', true);
httpRequest.send()

httpRequest.onreadystatechange = function getdata() {
if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    jsonStr  = httpRequest.responseText;//获取到json字符串，还需解析
    jsonObject = jQuery.parseJSON(jsonStr);
    nextIssue()
  }};

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

