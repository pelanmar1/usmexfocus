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
        console.log(JSON.stringify(picker.selectedDates));
        alert(JSON.stringify(picker.selectedDates));
    });
    $('#local-time').text(Intl.DateTimeFormat().resolvedOptions().timeZone);

    

  });