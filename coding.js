$(function (){


    loader();
     $("#divs").on("click",".btn-danger",handledel)
     $("#divs").on("click",".btn-secondary",handleupdate)
     $("#btn").click(adddata)
     $("#updatebtn").click( function(){
      var id=  $("#idup").val();
     var title=   $("#titleup").val();
     var body=   $("#bodyup").val();

     
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/" + id,
            method:"PUT",
            data:{title,body},
            success:function(response) {
                loader();
                $("#modelid").modal("hide");
        
            }
        })
     })
}
)
function handleupdate() {
   
    var btn=$(this)
    var parentdiv=btn.closest(".recpie")
    var divid=parentdiv.attr("data-id")
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + divid,
    function (response){
        $("#idup").val(response._id);
        $("#titleup").val(response.title);
        $("#bodyup").val(response.body);
        $("#modelId").modal("show");
        
    

    }
    
    
    
    
    
    
    )
     
    






};



function adddata(){
var title=$("#title").val();
var body=$("#body").val()
$.ajax({
    url:"https://usman-recipes.herokuapp.com/api/recipes",
    method:"POST",
    data:{title,body},
    error: $("#divs").text("Eror Data not loading!!!"),
   success: function (response) {
       console.log(response);
       $("#title").val("");
        $("#body").val("")
        loader();
        
        $("#modelId").modal("hide")
    }

})

};


 function handledel (){
     var btn=$(this)
     var parentdiv=btn.closest(".recpie")
     var divid=parentdiv.attr("data-id")
     $.ajax({
         url:"https://usman-recipes.herokuapp.com/api/recipes/" + divid,
         method:"DELETE",
         success: function (){
             loader();
         }


     })
     console.log(btn)
 };

function loader(){

$.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function(response) {
        var dove=$("#divs");
        dove.empty()
        for(var i=0;i<response.length;i++){
            var res=response[i];
      
            dove.append(`<div class="recpie" data-id="${res._id}"><h5>${res.title} </h5> <p> <button class="btn btn-secondary btn-sm float-right">Edit</button> <button class="btn btn-danger btn-sm float-right">Delete</button> ${res.body}</p> </div> `)

        }
        
    }


});

        }