
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
       
    }
};

app.initialize();

var add, expens, index, back, card, submit, exp, price, myarray = [],
    d, date, month, year, day, available = [], home, card;
var months=['JAN','FEB','MAR','APR','MAY','JUN','JULY','AUG','SEP','OCT','NOV','DEC'];
var days=['SUNDAY','MONDAY','TUESDAY','WENSDAY','THURSDAY','FRIDAY','SATURDAY'];
var longpress = 500;
var start;

$().ready(function () {
 $('.modal').modal(
     {
         dismissible: false, // Modal can be dismissed by clicking outside of the modal
         opacity: .5, // Opacity of modal background
         inDuration: 300, // Transition in duration
         outDuration: 200, // Transition out duration
         startingTop: '10%', // Starting top style attribute
         endingTop: '10%', // Ending top style attribute
         ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            //  alert("Ready");
             console.log(modal, trigger);
         },
         complete: function () {
            //  alert('Closed');
         } // Callback for Modal close
     }
 );
    add=$('#add');
    expens = $('#expens');
    back=$('#back');
    exp=$('#exp');
submit=$('#submit');
price = $('#price');
home=$('#home');
mydate(); //  get current date
displayExpense();

      //back button
      $('#back').on('click', function () {
            // alert();
            // console.log(getAll);
            displayExpense();
       });

       //submit click
       submit.on('click',function () {
            var expval = exp.val();
            var priceval=price.val();
            if(expval!=='' && priceval!=='')
            {
                    database.set(expval, priceval);
            }
            else{
                // alert('Please fill both');
            }

         });     
  });

   $(document).on('touchstart mousedown', ".card", function (e) {
       //    e.preventDefault();
       start = new Date().getTime();
   });
   $(document).on('touchend mouseup',".card", function (e) {
       var tempDate = new Date().getTime();
       if (tempDate >= (start + longpress)) {
           //    alert('long press!');
           $(this).parent('.wrappcard').addClass('delete');
       } else {
           //    alert('short press!');
            // $(this).parent
           displayCollection('JAN');
            
           $(this).parent('.wrappcard').removeClass('delete');
           $('#index').show();
           $('#home').hide();
           $('.back').show();
       }
   });

  $('#goback').on('click', function () {
      $('#home').show();
      $('#index').hide();
      $('.back').hide();
      displayExpense();
  });

 $(document).on('click', '.wrappcard .del', function () {
     console.log('del');
     var t=$(this);
    var del = t.attr('id');
     t.parent('.wrappcard').remove();
     database.delete(del);
 });


  function mydate() {
      //current date
      d = new Date(); //date object
      date = d.getDate(); //28
      day = days[d.getDay()]; //sunday
      month = months[d.getMonth()]; // JAN
      year = d.getFullYear(); //2018
  }


  var database={
    'set': function (expval, priceval) {
        myarray=[];
         var old = database.get(month);
         var temp = database.get('available');
         var Total;
          var myobj = {
              'exp': expval,
              'priceval': priceval
          };
        if (temp != null && temp.length > 0 && temp[months.indexOf(month)] !== null)
        {
            console.log('temp: ',temp);
            Total = parseFloat(temp[months.indexOf(month)].total) + parseFloat(priceval);
        }
        else{
            Total = priceval;
        }
         if (old) {
             myarray = old;
         }
         
         var add={
          'total': Total
         };
         myarray[0] = add;
         myarray.push(myobj);
         available[months.indexOf(month)] = {
             month: month,
             'total': Total
         };
         console.log(available);
        localStorage.setItem(month, JSON.stringify(myarray));
        localStorage.setItem('available', JSON.stringify(available));
    },
    'get': function (month) { 
        return (JSON.parse(localStorage.getItem(month)));
     },

     'getAll':function () {
        return(JSON.parse(localStorage.getItem('available')));
       },

       'setTotal':function () { 

        },
'delete': function (del) {
    var arraypos = months.indexOf(del);
    var temp=database.getAll();
    console.log('arraypos ', arraypos);
    temp[arraypos]=null;
    localStorage.setItem('available',JSON.stringify(temp));
    localStorage.removeItem(del);
}
  }
  
 var displayExpense=function () { 
     var available= database.getAll();
      var showExpense=$('#home .showExpense');
      showExpense.html('');
     var li='';
     $.each(available,function (key,val) {
        if(val)
        {
         console.log(val);
            
          li = '<div class="wrappcard"><a class="waves-effect waves-light btn del" id="'+val.month+'">Delete</a><div class="card teal"><div class="card-content white-text"><span class="card-title">'+val.month+'</span><p>I am a very simple card.I am good at containing small bits of information.I am convenient because I require little markup to use effectively.</p></div><div class="card-action"><a href="#">Total:</a><a href="#">'+val.total+'</a></div></div></div > ';
        console.log('li ',li);
               showExpense.append(li);
                   }
       });


  }

  var displayCollection=function (month) {
      $('#index .wrapp .collection').html('');
      var data = database.get(month);
       var li='';
$.each(data,function (key,val) {
    if (val.exp!=undefined)
    {
  li = '<li class="collection-item avatar"><i class="material-icons circle red">attach_money</i><img src="images/yuna.jpg" alt="" class="circle"><span class="title">' + date + "/" + day + '</span><p> ' + val.exp + '<br>' + val.priceval + '</p><a href="#!" class="secondary-content"><i class="material-icons">grade</i></a></li>';
    $('#index .wrapp .collection').append(li);
    }
  });

  var payment = data[0].total;
  li = '<li class="collection-item avatar"><i class="material-icons circle red">attach_money</i><img src="images/yuna.jpg" alt="" class="circle"><span class="title">Total: ' + payment + '</span><a href="#!" class="secondary-content"><i class="material-icons">grade</i></a></li>';
  $('#index .wrapp .collection').append(li);
    }