console.log("Bmi Calculator");
function calculateBMI(height,weight) {
    weight=Number(weight);
    height=Number(height);
    let bmi=weight/(height*height);
    return bmi;
}
document.getElementById("calculate").addEventListener("click",function(){
let height=document.getElementById("height").value/100;
let weight=document.getElementById("weight").value;
if(height<=0 || weight<=0){
    document.getElementById("bmiresult").innerHTML="Please enter valid height and weight.";
    return;
}
let bmi=calculateBMI(height,weight);
document.getElementById("bmiResult").innerHTML="Your BMI is "+bmi.toFixed(2);
if(bmi<18.5){
    document.getElementById("result").innerHTML+="<br>You are underweight.";
    document.getElementById("bmiCategoryC").innerHTML="Underweight";
}
else if(bmi>=18.5 && bmi<24.9){
    document.getElementById("bmiResult").innerHTML+="<br>You have a normal weight.";
    document.getElementById("bmiCategory").innerHTML="Normal weight";
}
else if(bmi>=25 && bmi<29.9){
    document.getElementById("bmiResult").innerHTML+="<br>You are overweight.";
    document.getElementById("bmiCategoryC").innerHTML="Overweight";
}
else if(bmi>=30){
    document.getElementById("bmiResult").innerHTML+="<br>You are obese.";
    document.getElementById("bmiCategoryC").innerHTML="Obese";
}
});

