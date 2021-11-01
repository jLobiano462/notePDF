const toggle = document.querySelector('.toggle')
const sideBar = document.querySelector('.sidebar')
const fileContent= document.getElementById('fileContent')
const fontFamily = document.getElementById('font-family')
const fontSize = document.getElementById('font-size')
const saveButton = document.getElementById('save')
const download = document.getElementById('download')
const title = document.getElementById('title')
const show = document.getElementById('show')
const texts = document.getElementById('texts-container')
const modal = document.querySelector('.modal')
const close = document.getElementById('close')
const clear = document.getElementById('clear')

let disabled = true;
let notesLead;
const notes = JSON.parse(localStorage.getItem('notesLead'))

if (notes){
  fileContent.value = notes
  texts.innerHTML =store(notes)
  texts.style['font-family'] = fontFamily.value
  texts.style['font-size'] = fontSize.value
}


toggle.addEventListener('click',()=>{
  if (sideBar.classList.contains('side')){
    sideBar.classList.remove('side')
    sideBar.classList.add('hide')
  }else{
    sideBar.classList.add('side')
    sideBar.classList.remove('hide')
  }
})


fontSize.addEventListener('change',()=>{
  fileContent.style['font-size'] = fontSize.value
})

fontFamily.addEventListener('change',()=>{
  fileContent.style['font-family'] = fontFamily.value
})



saveButton.addEventListener('click',()=>{

  if (disabled){
    saveButton.innerHTML = `
    Edit
    <span class ='icon'>
    <ion-icon name="pencil-outline"></ion-icon>
    </span>

    `
    fileContent.disabled = true;
    disabled=false


  }else{
    saveButton.innerHTML = `
    Save
    <span class ='icon'>
      <ion-icon name="save-outline"></ion-icon>
    </span>
    `
    fileContent.disabled = false;
    disabled = true

  }
  notesLead = fileContent.value
  localStorage.setItem('notesLead',JSON.stringify(notesLead))
  texts.innerHTML=store(fileContent.value)
  texts.style['font-family'] = fontFamily.value
  texts.style['font-size'] = fontSize.value
})

show.addEventListener('click',()=>{
  modal.classList.add('Notes')
})

close.addEventListener('click',()=>{
  modal.classList.remove('Notes')
})

clear.addEventListener('click',()=>{
  fileContent.value = ''
})




download.addEventListener('click',()=>{
  if (!title.value){
    toPdf('pdfNotes_file')
  }else{
    toPdf(title.value)
  }

})


function toPdf(fileName){

  let opt = {filename:fileName + '.pdf'}
  html2pdf(texts,opt)



}


function store(value){
  let txttoStore = '<p>' + value.replace(/\n/g, "</p>\n<p>") + '</p>'
  return txttoStore
}
