//establishing ajax connection

var responseData= null; // json will be  stored using this global variable.
var matrixValue =[]; // global variable for storing matrix value based on adigami json file.
var graphData="";
var matrix1Select="";
var connection="";
var dataRange="";
var matrix2Select="";


function changeConnection(select){
    if (select.name=="id"){
        connection=select.value;
    }
    else if (select.name=="dataRange"){
        dataRange=select.value;
    }
    makeUrl();
}
function makeUrl(){
    var url=`https://api191.herokuapp.com/posts${dataRange}`;
    loadDoc(url);
}

function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jsonParse(this);
    }
    
    console.log("The connection state is " + this.readyState + "\ The status is " + this.status)
    
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


//parsing json files and preceed to drawing graphs.
function jsonParse(xml){
    responseData =JSON.parse(xml.responseText);
    draw();
}



function newChart(element){
    if (typeof element === 'undefined'){
        element="myfirstchart"
    }
    return `new Morris.Line({
          element: '${element}',`
}
//Processing json file and making data template
function chartData(){
    var data= ``;
    for (var item of responseData.graph){
        data+=`{${chartRow(Object.keys(item),item)}},`;
        }
    return `data: [${data} ],`

} 
//Processing each row data and return string back to chartData();
function chartRow (keyvalue,item){
   matrixValue=keyvalue;
    var data='';
    for (var i = 0; i < keyvalue.length; i++){
        key=keyvalue[i];
            
            if ( key.valueOf()== "date".valueOf()){
                data+=`${key}:'${String(item[key])}',`;
                 
            }
            else if (i == keyvalue.length -1 ){
               data+=`${key}:${Number(item[key])}`;
            }
            else{
            data+=`${key}:${Number(item[key])},`;
                
              }
            }
   
    return data;
}

//Making template that contains attribute of y & x axis, color etc
function editChart(xkey,ykey1,ykey2){
     if (typeof ykey1 === 'undefined'){
        ykey1="";
    }
      if (typeof ykey2 === 'undefined'){
        ykey2="";
    }
    return `xkey: '${xkey}',
          ykeys: ['${ykey1}', '${ykey2}'],
          labels: ['${ykey1}', '${ykey2}'],
          lineColors: ['#607d8b','#ff3321'],
        });`
}
//create selection of the matrix
function drawSelection(){
   //remove date from matrix array
   for (var i = 0; i< matrixValue.length; i++){
       if (matrixValue[i].valueOf() == "date".valueOf()){
           matrixValue.splice(i,1);
       }
   }
   document.getElementById("matrix1").options.length = 0;
   document.getElementById("matrix2").options.length = 0;
   for (var i = 0; i< matrixValue.length; i++){
       var select1= document.getElementById("matrix1");
       var option=  document.createElement("option");
       option.text= matrixValue[i];
       option.value= matrixValue[i];
       select1.appendChild(option);
   }
     for (var i = 0; i< matrixValue.length; i++){
       var select2= document.getElementById("matrix2");
       var option=  document.createElement("option");
       option.text= matrixValue[i];
       option.value= matrixValue[i];
       select2.appendChild(option);
   }
    reloadSelect();// reinitiating selection by calling materialilze jquery method.
   
}
// draw() will be called everytime making ajax calls.
function draw(){
    document.getElementById("myfirstchart").innerHTML="";
    matrixValue=[];
    var beginning= newChart();
    graphData = chartData();
    var graphAttribute=  editChart("date");
    drawSelection();
    eval(beginning+graphData+graphAttribute);        
}

function changeSelection(select){
    if (select.id=="matrix1"){
        matrix1Select=select.value;
    }
    else if (select.id=="matrix2"){
        matrix2Select=select.value;
    }
    Redraw();
}
//redraw chart everytime selection changes
function Redraw(){
    document.getElementById("myfirstchart").innerHTML="";
    var beginning= newChart();
    graphData = chartData();
    var graphAttribute=  editChart("date",matrix1Select,matrix2Select);
    drawSelection();
    eval(beginning+graphData+graphAttribute);        
}


