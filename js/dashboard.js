function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jsonParse(this);
    }
    
        console.log("The connection state is " + this.readyState + "\ The status is " + this.status)
    
  };
  xhttp.open("GET", "http://restapi-xwen5.c9users.io:8080/posts", true);
  xhttp.send();
}
//https://api191.herokuapp.com/posts
//http://restapi-xwen5.c9users.io:8080/posts
function jsonParse(xml){
    console.log("........Parsing Json........")
    var response =JSON.parse(xml.responseText);
    console.log(response);
    draw(response);
    
}

function makeTemplate(year,a,b,length){
   console.log("making graph template");
   text=" data: [";
   for (i=0; i<length;i++){
    text+="{"+"y: "+"\'"+year[i]+"\', a: " + a[i]+","+"b: "+ b[i]+"},"
       
   }
   text+="],"
   return text;
    
    
    
    
}
function draw(response){
    var year= response["0"]["year"];
    var a= response["0"]["a"];
    var b= response["0"]["b"];
    var graph= makeTemplate(year,a,b,year.length)
    var templateA="new Morris.Area({"+
          "element:"+ "\'"+"myfirstchart"+"\'"+","
    var templateB= "xkey: \'y\',"+
          "ykeys: [\'a\', \'b\'],"+
          "labels: [\'Series A\', \'Series B\'],"+
          "lineColors: [\'#607d8b\',\'#ff3321\'],"+
        "});"    
    
  eval(templateA+graph+templateB);          
    
         
}

loadDoc();
