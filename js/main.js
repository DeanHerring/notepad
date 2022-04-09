const textarea = document.querySelector('.autoresize')
const key = document.querySelector('#key')

let title = document.querySelector('.title')
let titleEdit = document.querySelector('.title-edit')

let settingOpenButton = document.querySelector('.setting-open')
let settingCloseButton = document.querySelector('.setting-close')
let settingBody = document.querySelector('.setting');

let downloadButton = document.querySelector('.download');

// Download
const download = () => {
	let el = document.createElement('a')

	el.href = 'data:attachment/text,' + encodeURI(textarea.value);
	el.target = '_blank';
	el.download = `${title.innerText.toLowerCase()}.txt`;
	el.click()
}
downloadButton.addEventListener('click', download);

// localStorage
if ( localStorage.title ) {
	title.innerText = localStorage.title
}

if ( localStorage.text || localStorage.text != '' || localStorage.text != 'undefined' ) {
	textarea.value = localStorage.text
}

// Aurtoresize
textarea.style.cssText = `height: ${textarea.scrollHeight}px; overflow-y: hidden`;

textarea.addEventListener('input', () => {
	textarea.style.height = "auto";
	textarea.style.height = `${textarea.scrollHeight}px`;
})

// Edit
const editTitle = () => {
	titleEdit.value = title.innerText
	titleEdit.classList.add('active')
	title.classList.add('hidden')

	titleEdit.addEventListener('change', () => {
		title.innerText = titleEdit.value
		titleEdit.classList.remove('active')
		title.classList.remove('hidden')

		localStorage.title = title.innerText
	})
}
title.addEventListener('click', editTitle)

// Setting
// const setting = (event) => {
// 	( event.path[1].classList.contains('setting-open') ) ? 
// 	settingBody.classList.add('active') :
// 	settingBody.classList.remove('active')
// }
// settingOpenButton.addEventListener('click', setting)
// settingCloseButton.addEventListener('click', setting)

// Autosave every 60 seconds
setInterval(() => {
	localStorage.text = textarea.value;
}, 60000)