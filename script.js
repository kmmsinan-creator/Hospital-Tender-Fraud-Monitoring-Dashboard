const shapChart = new Chart(
document.getElementById('shapChart'),
{
type:'bar',
data:{
labels:[
'Skewness',
'Std',
'Obs Count',
'Mean',
'Median'
],
datasets:[{
label:'Importance',
data:[0.24,0.18,0.14,0.05,0.03]
}]
}
}
);

const modelChart = new Chart(
document.getElementById('modelChart'),
{
type:'bar',
data:{
labels:[
'Random Forest',
'Gradient Boost',
'XGBoost',
'LightGBM',
'SVM'
],
datasets:[{
label:'AUC',
data:[
0.989,
0.972,
0.968,
0.965,
0.915
]
}]
}
}
);

Papa.parse("train.csv",{
download:true,
header:true,
complete:function(results){

const data=results.data;

let skew=data
.map(x=>parseFloat(x.skew))
.filter(x=>!isNaN(x));

let std=data
.map(x=>parseFloat(x.std))
.filter(x=>!isNaN(x));

createHistogram(
'skewChart',
skew,
'Skewness'
);

createHistogram(
'stdChart',
std,
'Standard Deviation'
);

}
});

function createHistogram(id,data,label){

const bins=10;

const min=Math.min(...data);
const max=Math.max(...data);

const step=(max-min)/bins;

let counts=new Array(bins).fill(0);

data.forEach(v=>{
let index=Math.min(
Math.floor((v-min)/step),
bins-1
);
counts[index]++;
});

const labels=[];

for(let i=0;i<bins;i++){
labels.push(
(min+i*step).toFixed(2)
);
}

new Chart(
document.getElementById(id),
{
type:'bar',
data:{
labels:labels,
datasets:[{
label:label,
data:counts
}]
}
}
);
}
