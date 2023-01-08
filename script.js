//show today's date
currentDay = $('#currentDay');
$(currentDay).text(moment().format('MMM Do YYYY'));


//show timeblocks for every hour from 9-5
var container = $('.container');

var timeblocks = {
   9: '',
   10: '',
   11: '',
   12: '',
   13: '',
   14: '',
   15: '',
   16: '',
   17: ''
}

function updateSchedule(){
    $.each(timeblocks, function(key, value){
       var hour = key;
       var tasks = value;
       container.append(`
       <section class="row" id="hourSlot">
       <div class="timeblock hour">${hour}</div>
       <span> hs</span>
       <textarea name="tasks" id="tasks" rows="5" cols="80">${value}</textarea>
       <button class="saveBtn">Save</button>
       </section>
       `);
    })
 }
 
//Show data from LS when the page is reloaded
if (JSON.parse(localStorage.getItem('hourly_tasks')) != null) {
    timeblocks = JSON.parse(localStorage.getItem('hourly_tasks'));
    updateSchedule();
 }else{
    updateSchedule()
 }
 
//timeblock colour changes according to past present future

var currentHour = $('.hour');


currentHour.each(function(){
   if((moment().format('H'))==$(this).text()){
      $(this).parent().addClass('present');
   } else if(parseInt((moment().format('H'))) > $(this).text()) {
      $(this).parent().addClass('past');
   }else{ 
      $(this).parent().addClass('future');
   }
})

//text can be added to text area by the user
var hourSlot = $('#hourSlot');
var tasks = $('#tasks');
var saveBtn = $('.saveBtn');
var dayplans = [];
var success = $('.success')

saveBtn.on('click',function(){
   tasks = ($(this).siblings('#tasks').val());
   hourSlot = ($(this).siblings('.hour').text()); 
   timeblocks[hourSlot] = tasks;

   
   //the text can be saved to the ls
   localStorage.setItem('hourly_tasks', JSON.stringify(timeblocks));
   success.show(1500);
   success.hide(1000);
})

