var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};var responseData=null,matrixValue=[],graphData="",matrix1Select="",connection="",dataRange="",matrix2Select="";
function changeConnection(a){"id"==a.name?connection=a.value:"dataRange"==a.name&&(dataRange=a.value);makeUrl()}function makeUrl(){loadDoc("https://api191.herokuapp.com/posts"+dataRange)}function loadDoc(a){var b=new XMLHttpRequest;b.onreadystatechange=function(){4==b.readyState&&200==b.status&&jsonParse(this)};b.open("GET",a,!0);b.send()}function jsonParse(a){responseData=JSON.parse(a.responseText);draw()}
function newChart(a){"undefined"===typeof a&&(a="myfirstchart");return"new Morris.Line({\n          element: '"+a+"',"}function chartData(){for(var a="",b=$jscomp.makeIterator(responseData.graph),c=b.next();!c.done;c=b.next())c=c.value,a+="{"+chartRow(Object.keys(c),c)+"},";return"data: ["+a+" ],"}
function chartRow(a,b){matrixValue=a;for(var c="",d=0;d<a.length;d++)key=a[d],c=key.valueOf()=="date".valueOf()?c+(key+":'"+String(b[key])+"',"):d==a.length-1?c+(key+":"+Number(b[key])):c+(key+":"+Number(b[key])+",");return c}function editChart(a,b,c){"undefined"===typeof b&&(b="");"undefined"===typeof c&&(c="");return"xkey: '"+a+"',\n          ykeys: ['"+b+"', '"+c+"'],\n          labels: ['"+b+"', '"+c+"'],\n          lineColors: ['#607d8b','#ff3321'],\n        });"}
function drawSelection(){for(var a=0;a<matrixValue.length;a++)matrixValue[a].valueOf()=="date".valueOf()&&matrixValue.splice(a,1);destroySelect();for(a=0;a<matrixValue.length;a++){var b=document.getElementById("matrix1"),c=document.createElement("option");c.text=matrixValue[a];c.value=matrixValue[a];b.appendChild(c)}for(a=0;a<matrixValue.length;a++)b=document.getElementById("matrix2"),c=document.createElement("option"),c.text=matrixValue[a],c.value=matrixValue[a],b.appendChild(c);reloadSelect();drawBox()}
function drawBox(){var a=document.getElementById("box1"),b=document.getElementById("box2"),c=document.getElementById("box3"),d=responseData.matrix;[a,b,c].forEach(function(a){a.children[0].textContent=d[a.id].title;a.children[1].textContent=d[a.id].data})}function draw(){document.getElementById("myfirstchart").innerHTML="";matrixValue=[];var a=newChart();graphData=chartData();var b=editChart("date",matrix1Select,matrix2Select);drawSelection();eval(a+graphData+b)}
function changeSelection(a){"matrix1"==a.id?matrix1Select=a.value:"matrix2"==a.id&&(matrix2Select=a.value);Redraw()}function Redraw(){document.getElementById("myfirstchart").innerHTML="";var a=newChart();graphData=chartData();var b=editChart("date",matrix1Select,matrix2Select);eval(a+graphData+b)};