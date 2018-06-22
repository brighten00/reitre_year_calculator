var errorTime = 0;
function errorReact(){
  if (errorTime == 4){
      document.getElementsByClassName('conversation')[0].innerHTML = "Are you kidding me right now?";
      document.getElementById('character-picture').setAttribute("src","img/s_angry1.png");
  }
  if (errorTime == 5){
      document.getElementsByClassName('conversation')[0].innerHTML = "You serious?";
      document.getElementById('css').setAttribute("href","css/style2.css");
      document.getElementById('character-picture').setAttribute("src","img/s_angry2.png");
  }
  if (errorTime > 5){
      document.getElementById('character-picture').setAttribute("src","img/s_angry1.png");
      document.getElementsByClassName('conversation')[0].innerHTML = "...............work until you die";
      document.getElementsByClassName('calculator')[0].innerHTML = "";
      var child = document.getElementsByClassName('calculator')[0].setAttribute("class","kuhaku");
      //document.getElementsByClassName('flex-test')[0].removeChild(child);
      document.getElementById('years').innerHTML = "Never rest";
  }
}

function calculateResult(){
  var expectedLife = parseInt(document.getElementById('expected-life').value);
  if (isNaN(expectedLife)){
    alert("Please enter expected life span!");
    errorTime = errorTime + 1;
    return false;
  }
  var curretnAge = parseInt(document.getElementById('current-age').value);
  if (isNaN(curretnAge)){
    alert("Please enter currenr age!");
    errorTime = errorTime + 1;
    return false;
  }
  var monthIncome = parseInt(document.getElementById('monthly-income').value);
  if (isNaN(monthIncome)){
    alert("Please enter monthly income!");
    errorTime = errorTime + 1;
    console.log(errorTime);
    return false;
  }
  var monthExpense = parseInt(document.getElementById('monthly-expense').value);
  if (isNaN(monthExpense)){
    alert("Please enter monthly expense!");
    errorTime = errorTime + 1;
    return false;
  }
  var retireIncome = parseInt(document.getElementById('retired-income').value);
  if (isNaN(retireIncome)){
    alert("Please enter income after retirement!");
    errorTime = errorTime + 1;
    return false;
  }
  var retireExpense = parseInt(document.getElementById('retired-expense').value);
  if (isNaN(retireExpense)){
    alert("Please enter expense after retirement!");
    errorTime = errorTime + 1;
    return false;
  }
  var yearInvestment = parseInt(document.getElementById('year-investment').value);
  if (isNaN(yearInvestment)){
    alert("Please enter investment!");
    errorTime = errorTime + 1;
    return false;
  }
  var retirePension = parseInt(document.getElementById('retired-pension').value);
  if (isNaN(retirePension)){
    alert("Please enter pension!");
    errorTime = errorTime + 1;
    return false;
  }
  var irr = parseInt(document.getElementById('irr').value);
  if (isNaN(irr)){
    alert("Please enter investment return rate!");
    errorTime = errorTime + 1;
    return false;
  }
  var currentSaving = parseInt(document.getElementById('current-saving').value);
  if (isNaN(currentSaving)){
    alert("Please enter current saving!");
    errorTime = errorTime + 1;
    return false;
  }
  var currentInvestment = parseInt(document.getElementById('current-investment').value);
  if (isNaN(currentInvestment)){
    alert("Please enter current investment!");
    errorTime = errorTime + 1;
    return false;
  }
  var x = (expectedLife + curretnAge)/2;
  var y = (expectedLife - x);
  var bottomLine = curretnAge;
  var topLine = expectedLife;
  var monthSaving = monthIncome - monthExpense - yearInvestment / 12;
  if (monthSaving < 0){
    document.getElementsByClassName('conversation')[0].innerHTML = "Your income and spending do not match with each other."
    errorTime = errorTime + 1;
    document.getElementById('character-picture').setAttribute("src","img/s_ken.png");
    return false;
  }
  var retireRemain = retireExpense - retireIncome;
  if (retireRemain < 0){
    document.getElementsByClassName('conversation')[0].innerHTML = "Looks like you can still have a stable income after retirement. How about retire now?"
    document.getElementById('character-picture').setAttribute("src","img/s_ure.png");
    return false;
  }
  do{
    var returnFactor = 1
    if (irr == 0){
      returnFactor = 1
    }
    else{
      returnFactor = (1 - Math.pow((1 + irr/100),(x - curretnAge))) / (1 - (1 + irr/100))
    }
    equationLeft = monthSaving * x * 12 + retirePension + currentInvestment
    * Math.pow((1 + irr/100),x) + yearInvestment * returnFactor
    + currentSaving;
    console.log( (1 - Math.pow((1 + irr/100),x)) , (1 - (1 + irr/100)));
    equationRight = retireRemain * y * 12;
    equationLeftS = equationLeft.toPrecision(6);
    equationRightS = equationRight.toPrecision(6);
    console.log(equationRight, equationLeft);
    if (equationLeft > equationRight){
      topLine = x;
      x = (x+bottomLine)/2;
      y = (expectedLife - x);
    }
    else if (equationLeft < equationRight){
      bottomLine = x;
      x = (x+topLine)/2;
      y = (expectedLife - x);
    }
    var goOut = Math.abs(equationLeft - equationRight);
    console.log(goOut);
  }while(goOut > 0.00001)
  x = Math.ceil(x);
  document.getElementById('years').innerHTML = "You can retire at " + x ;
  errorTime = 0;
  if (x < 45){
    document.getElementsByClassName('conversation')[0].innerHTML = "Looks like you can live a easy and relax life."
    document.getElementById('character-picture').setAttribute("src","img/s_normal2.png");
  }
  if (x > 70){
    document.getElementsByClassName('conversation')[0].innerHTML = "Maybe it is time to find a new job or re-examine ypur life style."
    document.getElementById('character-picture').setAttribute("src","img/s_kon.png");
  }
  if (irr > 70){
    document.getElementsByClassName('conversation')[0].innerHTML = "Have you ever considered to be a professional trader?"
    document.getElementById('character-picture').setAttribute("src","img/s_gimonn.png");
  }

}
