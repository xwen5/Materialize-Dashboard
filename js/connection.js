$( document ).ready(function() {
 $('div.modal-footer a').click(function(){
  var name= $('#connection_name').val();
  var select = $('#connection_select ').find(":selected").text();
  var d = new Date();
  var strDate =  (d.getMonth()+1)+ "/" +  d.getDate() + "/" +d.getFullYear();
  $('#connection_list').append('<tr><td class="editable">'+name+'</td><td>'+select+'</td><td>'+strDate+'</td><td><i class="material-icons" title="Edit">edit</i></td> <td><i class="material-icons" title="Delete">delete</i></td> </tr>"');
  $('table.editable').editableTableWidget({editor: $('<textarea>')});
    
});
    
        
});