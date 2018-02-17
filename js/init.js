(function($){
	$(function(){
	    $('.button-collapse').sideNav();
	    $(".dropdown-button").dropdown({belowOrigin: true,});
        $(".dropdown-content>li>a").css("color", "black");
        $('select').material_select();
	})
})(jQuery);

$(document).ready(function(){
    $('table.editable').editableTableWidget({editor: $('<textarea>')});
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

function reloadSelect(){
    $('select').material_select();//will be called by dashboard.js after dynamically create selection.
}
