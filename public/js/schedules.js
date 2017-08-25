$(document).ready(function(){
    addItemClickListener();
    modalSubmit();
    blockSubmit();
});

function addItemClickListener(){
    $('.list-group-item').click(function(e) {
        e.preventDefault()
        var listItems =$('.list-group-item');
        listItems.each(function(i, elem) {
            var item = $(elem);  
            item.removeClass('active');
          });
        $(this).addClass('active');


        var time = $(this).text()
        var id = $(this).attr('id');
        //sessionStorage.setItem('current_selected_time', time);
        $('#currSel').attr('value',id);
        $('#currSel').text(time);
    });
    
}
function modalSubmit(){
    $('#confirm').click(function(e){
        var currSel = $('#currSel');
        var currSelId = currSel.attr('value');
        $.ajax({
            type: "POST",
            url: '/schedules',
            data: {'data':currSelId},
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                if (typeof(data.redirect) == 'string'){
                    window.location = data.redirect
                }
            }
          });

    });
}

function blockSubmit(){
    $('.list-group-item').on('click', function(event) {
        var activeListItems =$('.list-group-item.active').length;
        $('#submit').prop('disabled', activeListItems==0);
        
    });
    

}