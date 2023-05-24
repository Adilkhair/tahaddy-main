 

if ("serviceWorker" in navigator) {
   navigator.serviceWorker
    .register(host+"tahaddy/sw.js")
    .then(reg => console.log("service worker registered"))
    .catch(err => console.log("service worker not registered", err));/* */
}

  
  
    let question_count=1;
    
/*####### get 10 numbers no repeate ################################*/
var min = 0;
var max = 10;

let correctAnsIndex=0;
    let correctAns ="";
   let data2=null; 

var stop = 10;
var numbers = [];
for (let i = 0; i < stop; i++) {
  var n =  Math.floor(Math.random() * max) + min;
  var check = numbers.includes(n);
  if(check === false) {
    numbers.push(n);
  } else {
    while(check === true){
      n = Math.floor(Math.random() * max) + min;
      check = numbers.includes(n);
        if(check === false){
          numbers.push(n);
        }
     }
  }
}
/*##########End##################################################################*/
var ranNums = shuffle(numbers);
    randomnumber =ranNums.next().value;
     
    $('#question_count').text(question_count+"-"+10);
    console.log("randomnumber:"+randomnumber);
    let points=0;
    let id= parseURLParams(window.location.href).id;  //topic id
    let name= parseURLParams(window.location.href).name;  //topic id
    $("#topic_name").text(name);
/////////////////////get vister counter form dash /////////////////////////////////////
$.ajax({   
  method : 'GET',
  url:api_url+'public/vister_counter',
  dataType: 'json', 
  success:function newQuestion(data){
    // alert(data);
     $("#vister_counter").text( " المتواجدون حاليا "+ data);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////
    $.ajax({   
    method : 'GET',
    url:api_url+'public/test?id='+id,
    dataType: 'json', 
    success:function newQuestion(data){
      data2 = data;
      if(data2.length < 10){
         alert("لا توجد اسئلة");
          window.location.href="index.html";
        //  window.location.href="";
          return;
      }
   $('#randomquestion').text(data2[randomnumber].question);
   
let options=Object.keys(data2[randomnumber].question_choice).length;
$("#options").empty();
for(let i=0; i<options; i++){
      var r= $(' <div class="row  center-align" > <a   class="waves-effect waves-light  btn btn-large home_scr btn_opt"  >'+data2[randomnumber].question_choice[i].choice+'</a></div>');
        $("#options").append(r);  
}
     /*  $('#btn1').text(data2[randomnumber].question_choice[0].choice);
      $('#btn2').text( data2[randomnumber].question_choice[1].choice);
      $('#btn3').text( data2[randomnumber].question_choice[2].choice); */
   
    let correctAnsIndex=0;
    let correctAns ="";
    data2[randomnumber].question_choice.forEach(myFunction);
    function myFunction(item, index, arr) {
      if(arr[index].is_right == "y"){
        correctAnsIndex=index;
        correctAns=arr[index].choice;
      } 
    } 

   //{id ,created_at ,updated_at ,question_id ,is_right ,o} 
    console.log("correctAns:" +correctAns);


    }//seccess func
  }) //$ajax


//////////////////////////////////////////////////////////////////////
    var count =0;
    var timer = setInterval(function() {
    $('h3').text("مضي من الوقت ["+ count+ "] ثانية ");
    count ++  ;
    /* if(count == 0) {
    stopInterval()
    } */
    
    }, 2000);
    /////////////////////////////////////////////////////////////////
    var stopInterval = function() {
      $("#options").empty();
    $('h3').text("انتهي الإختبار");
    $('#randomquestion').hide();
      $('h3').text(" " + points + " درجة! "); // if you see final score then open this comment
    
    $(".submit").hide();
    clearInterval(timer);
    $("#after_result_action #points").text(" :"+(points/10)*100 + "%");
    $("#after_result_action  #correct_count").text(" "+ points );
    $("#after_result_action  #rowng_count").text(" "+   (10-points)  );
    
     
    
    $("#after_result_action").show();
    $("#after_result_action_btn").show();

 

    }//stop
    /////////////////////////////////////

    /* }) */


 

      function* shuffle(array) {

        var i = array.length;
    
        while (i--) {
            yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }
    
    }
    /*var ranNums = shuffle([1,2,3,4,5,6,7,8,9,10]);
ranNums.next().value;    // first random number from array
ranNums.next().value;    // second random number from array
ranNums.next().value;    // etc.*/


function passing(parama1, page){
var firstDate=document.getElementsByName("firstDate");
var secondDate=document.getElementsByName("secondDate");
var queryString = "?para1=" + parama1  ;
window.location.href = page + queryString;
}
 

 ///////////////////////////////////////////////////////////////////////////
 function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
      queryEnd   = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}
 

///////////////////////////////////////////////////////////////////////////////////
    //$('#options  a').on('click', function(){
 //     function answer_click(){
  $(document).on("click", ".btn_opt", function(){
        //console.log(data)
    //    alert("clicked");
             question_count++;
        let userAns=$(this).text();
        /* alert("user ans:"+ userAns);
        alert("user correctAns:"+ correctAns); */
        if (userAns  == correctAns ){
        $('h3').text("إجابة صحيحة")
        points += 1;
        $(this).attr('style', 'background-color: green !important');
       
       $(this).append('<i class="material-icons">check</i>');
        }
        else{
        $('h3').text("إجابة خاطئة");
        $(this).attr('style', 'background-color: red !important');
       $(this).append('<i class="material-icons">clear</i>');
        }
       setTimeout(function() 
        {
          if(question_count <= 10) { $('.btn').attr('style', 'background-color: #fff !important');
           $('#randomquestion').text(data2[randomnumber].question);
           $('#question_count').text(question_count+"-"+10);
           $('.determinate').css('width', (question_count*10)+""+'%');
    
           let options=Object.keys(data2[randomnumber].question_choice).length;
        //   alert("options:"+options);
           $("#options").empty();
            for(let i=0; i<options; i++){
            //  alert("kkkkk");
                  var r= $(' <div class="row  center-align" > <a    class="waves-effect waves-light  btn btn-large home_scr btn_opt"  >'+data2[randomnumber].question_choice[i].choice+'</a></div>');
                    $("#options").append(r);  
            }
           /* $('#btn1').text(data2[randomnumber].question_choice[0].choice);
           $('#btn2').text( data2[randomnumber].question_choice[1].choice);
           $('#btn3').text( data2[randomnumber].question_choice[2].choice); */
        }
      }, 300);
        
      if(question_count <= 10) {
        randomnumber=ranNums.next().value;//Math.floor( Math.random() * 4 );     
           
        data2[randomnumber].question_choice.forEach(myFunction);
        function myFunction(item, index, arr) {
          if(arr[index].is_right == "y"){
            correctAnsIndex=index;
            correctAns=arr[index].choice;
          } 
        } 
      }
       
        if(question_count > 10) { stopInterval();} 
       
         })
    /////////////////////////onclick///////////////////////////////////////////////////////