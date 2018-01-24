
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
    }
};

app.initialize();

var add, expens, index, back, card, submit, exp, price, myarray = [],
    d, date, month, year, day, available=[];
var months=['JAN','FEB','MAR','APR','MAY','JUN','JULY','AUG','SEP','OCT','NOV','DEC'];
var days=['SUNDAY','MONDAY','TUESDAY','WENSDAY','THURSDAY','FRIDAY','SATURDAY'];

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
    index = $('#index');
    back=$('#back');
    exp=$('#exp');
submit=$('#submit');
price = $('#price');
mydate(); //  get current date


      //back button
      back.on('click',function () { 
            // alert();
            console.log(getAll);
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

  $(document).on('click','.card',function() {
     $('#index').show();
     $('#home').hide();
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
         var old = database.get(month);
         var temp = database.get('available');
         var Total;
          var myobj = {
              'exp': expval,
              'priceval': priceval
          };
// console.log(typeof (temp));
// console.log(temp);
        if(temp!=null && temp.length>0)
        {
            console.log('temp: ',temp);
            Total = temp[month].total + priceval;
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
             'month': add
         };
         console.log(available);
        localStorage.setItem(month, JSON.stringify(myarray));
        // localStorage.setItem('available', JSON.stringify(available));
    },
    'get': function (month) { 
        return (JSON.parse(localStorage.getItem(month)));
     },

     'getAll':function () {
         var available = localStorage.getItem('available');
        return(JSON.parse(localStorage.getItem(available)));
         
       },

       'setTotal':function () { 

        }
  }
  