let chart;

const semesterSelect=document.getElementById("semesterCount");
const gpaInputs=document.getElementById("gpaInputs");

semesterSelect.addEventListener("change",()=>{
const count=parseInt(semesterSelect.value);
gpaInputs.innerHTML='';

for(let i=1;i<=count;i++){
gpaInputs.innerHTML+=`
<label>Semester ${i} GPA</label>
<input class="gpa" type="number" min="0" max="5" step="0.01">
`;
}
});

function getClassification(cgpa){
if(cgpa>=4.5) return "🏆 First Class Honours";
if(cgpa>=3.5) return "🥇 Second Class Upper";
if(cgpa>=2.4) return "🥈 Second Class Lower";
if(cgpa>=1.5) return "🥉 Third Class";
if(cgpa>=1.0) return "Pass";
return "Fail";
}

function calculateCGPA(){

const inputs=document.querySelectorAll(".gpa");

if(inputs.length===0){
alert("Select semesters first");
return;
}

let total=0;
let values=[];

for(let input of inputs){
if(input.value===""){
alert("Fill all GPA fields");
return;
}
const val=parseFloat(input.value);
total+=val;
values.push(val);
}

const cgpa=total/values.length;

window.currentGPAs = values;

document.getElementById("cgpaDisplay").innerText=cgpa.toFixed(2)+"/5.00";
document.getElementById("classification").innerText=getClassification(cgpa);

document.getElementById("highest").innerText=Math.max(...values).toFixed(2);
document.getElementById("lowest").innerText=Math.min(...values).toFixed(2);
document.getElementById("average").innerText=cgpa.toFixed(2);
document.getElementById("remaining").innerText=8-values.length;

document.getElementById("progressBar").style.width=(cgpa/5*100)+"%";

let badgeHTML='';

if(cgpa>=4.5){
badgeHTML+='<span class="badge">🏆 First Class Candidate</span>';
confetti({particleCount:200,spread:120});
}

if(values.filter(v=>v>=4.5).length>=3){
badgeHTML+='<span class="badge">🔥 Consistent Performer</span>';
}

if(cgpa>=4.0){
badgeHTML+='<span class="badge">⭐ Dean\'s List Potential</span>';
}

document.getElementById("badges").innerHTML=badgeHTML;

drawChart(values);
}

function drawChart(values){

const ctx=document.getElementById("trendChart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:'line',
data:{
labels:values.map((_,i)=>'Sem '+(i+1)),
datasets:[{
label:'GPA',
data:values,
tension:.3
}]
}
});
}

function predictCGPA(){

const future=parseFloat(document.getElementById("futureGpa").value);

if(isNaN(future)){
alert("Enter expected GPA");
return;
}

const current = window.currentGPAs || [];

if(current.length===0){
alert("Calculate CGPA first");
return;
}

const remaining=8-current.length;

let total=current.reduce((a,b)=>a+b,0);
total+=future*remaining;

const projected=total/8;

document.getElementById("prediction").innerHTML=
`Projected CGPA: ${projected.toFixed(2)} (${getClassification(projected)})`;
}

function toggleTheme(){
document.documentElement.classList.toggle("light");
}
const themes = {

ocean:{
bg:"#0f172a",
bg2:"#1e293b",
accent:"#3b82f6",
accent2:"#06b6d4"
},

emerald:{
bg:"#052e16",
bg2:"#064e3b",
accent:"#22c55e",
accent2:"#10b981"
},

purple:{
bg:"#2e1065",
bg2:"#4c1d95",
accent:"#8b5cf6",
accent2:"#c084fc"
},

gold:{
bg:"#1c1917",
bg2:"#292524",
accent:"#f59e0b",
accent2:"#fbbf24"
},

crimson:{
bg:"#450a0a",
bg2:"#7f1d1d",
accent:"#ef4444",
accent2:"#f97316"
},

midnight:{
bg:"#020617",
bg2:"#0f172a",
accent:"#64748b",
accent2:"#94a3b8"
}

};

function setTheme(name){

const theme = themes[name];

document.documentElement.style.setProperty(
"--bg",
theme.bg
);

document.documentElement.style.setProperty(
"--bg-secondary",
theme.bg2
);

document.documentElement.style.setProperty(
"--accent",
theme.accent
);

document.documentElement.style.setProperty(
"--accent2",
theme.accent2
);

}

const accentPicker =
document.getElementById("accentPicker");

if(accentPicker){

accentPicker.addEventListener("input",(e)=>{

document.documentElement.style.setProperty(
"--accent",
e.target.value
);

});

}
const themeToggleBtn =
document.getElementById("themeToggle");

const themePanel =
document.querySelector(".theme-panel");

themeToggleBtn.addEventListener("click", () => {
    themePanel.classList.toggle("open");
});