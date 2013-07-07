var myDataRef;
var path="https://knockknock.firebaseio.com";
var mainNode= new Firebase(path);
var addChild= function(snapshot) {

    if (snapshot.val().name!=undefined&&snapshot.val().text!=undefined) {
        displayChatMessage(snapshot.val().name, snapshot.val().text,snapshot.numChildren());
    }




};


$("#submit").click(function() {

    var name = $('#name').val();
    var text = $('#message').val();





    myDataRef = new Firebase(path+'/'+name+text);



    myDataRef.setWithPriority({ name: name, text: text},new Date().getTime());
    $('#message').val("");





});

$("#back").click(function() {
    if(mainNode.parent()!=undefined)
    {path=mainNode.parent().toString();

        mainNode.off('child_added');
        $("#myTable").empty();
        $('#myTable').append('<tr><td>UserName</td><td>message</td><td>replies</td></tr>');

        path=mainNode.parent().toString();
        mainNode=new Firebase(path);
        mainNode.on('child_added', addChild);

        $('#innerP').replaceWith('<div id="innerP"></div>');
    }




});

$("#home").click(function() {
    if(mainNode.parent()!=undefined)
    {

        mainNode.off('child_added');
        $("#myTable").empty();
        $('#myTable').append('<tr><td>UserName</td><td>message</td><td>replies</td></tr>');

        path="https://knockknock.firebaseio.com";
        mainNode=new Firebase(path);
        mainNode.on('child_added', addChild);

        $('#innerP').replaceWith('<div id="innerP"></div>');
    }
});




mainNode.on('child_added', addChild);





function displayChatMessage(name, text,numChildren) {

    var row='<tr><td class="name">'+name+'</td><td class="text">'+text+'</td ><td class="numChild">'+(numChildren-2)+'</td >';
    //<td class="text">'+numChildren+'</td >
    $(row).insertAfter("#myTable tr:first");
};



$("#myTable").on('click', 'td', function() {

    var name=$(this).closest('tr').children('td.name').text();
    var text=$(this).closest('tr').children('td.text').text();
    mainNode.off('child_added');
    $("#myTable").empty();


    $('#myTable').append('<tr><th>UserName</th><th>message</th></tr>');
    $('#innerP').replaceWith('<div id="innerP" class="row-fluid alert alert-success"><h5>Parent Message</h5><div class="span2 ">'+name+'</div ><div class="span6">'+text+'</div></div>');
    path=path+'/'+name+text

    mainNode=new Firebase(path);

    mainNode.on('child_added', addChild);
});
       


