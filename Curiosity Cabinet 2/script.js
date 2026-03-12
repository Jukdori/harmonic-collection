const rows = {
row1:{
label:"😌 calm",
message:"quiet things can still hold meaning"
},
row2:{
label:"😅 social awkwardness",
message:"connection often begins with discomfort"
},
row3:{
label:"😭 nostalgia",
message:"some feelings only return when we look back"
},
row4:{
label:"🤔 curiosity",
message:"questions are small doors to wonder"
},
row5:{
label:"😁 joy",
message:"happiness grows when shared"
}
}

Object.keys(rows).forEach(row=>{

const cards = document.querySelectorAll(`.${row}`)
const label = document.getElementById(`label${row.slice(-1)}`)

cards.forEach(card=>{
card.addEventListener("toggle",()=>{

const opened = [...cards].filter(c=>c.open).length

if(opened===5){

label.classList.add("revealed")

label.innerHTML=`
<div class="reveal-text">
${rows[row].label}<br>
${rows[row].message}
</div>
`

}

})
})

})
