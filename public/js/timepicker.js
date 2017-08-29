$(document).ready(function(){
    var options = {
                      enableTime: true,
                      noCalendar: false,
                      enableSeconds: false,
                      time_24hr: false, 
                      dateFormat: "d.m.Y, H:i", 
                      defaultHour: 12,
                      defaultMinute: 0,
                      altInput:true
                      ,plugins: [new confirmDatePlugin({})]
                  }
    const picker = flatpickr("#flp", options);
    var confButton = $('#confirm');
    $('#flp').on('change',function(){
      confButton.attr('disabled',picker.selectedDates.length==0);
    })
    
    $('#confirm').click(function(e){
        //console.log(JSON.stringify(picker.selectedDates));
        //alert(JSON.stringify(moment(picker.selectedDates[0]).utcOffset(-300)));
        if(picker.selectedDates.length==0) return;
        var data = picker.selectedDates[0];
        $.ajax({
            type: "POST",
            url: '/events/add',
            data: {'data':data},
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                 if (typeof(data.redirect) == 'string'){
                    window.location = data.redirect
                }
            }
          });
    });
    //$('#local-time').text(Intl.DateTimeFormat().resolvedOptions().timeZone);
    $('#local-time').text(moment().utcOffset(-300).format('HH:mm MM-DD-YYYY'));

    

  });