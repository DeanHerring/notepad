// localStorage.clear()
import * as vars from './vars.js'
let production_url = 'https://deanherring.github.io/notepad'

// text_field
vars.text_field.addEventListener('input', e => {
	vars.characters.innerText = vars.text_field.innerText.length

	// ../music/najatie-knopki-zapuska-lunohoda.mp3
	let audio = new Audio(`${production_url}/music/kompyuternaya-klaviatura-nepreryivno-najimaet-neskolko-klavish-43255.mp3`)
	audio.volume = 0.5
	audio.play()
	setTimeout(() => {
		audio.pause()
		audio.currentTime = 0
	}, 100)
})

// download
const download = () => {
	let el = document.createElement('a')

	el.href = 'data:attachment/text,' + encodeURI(vars.text_field.innerText);
	el.target = '_blank';
	el.download = `${vars.title.innerText.toLowerCase()}.txt`;
	el.click()
}
vars.exportButton.addEventListener('click', download);

// localStorage
if ( localStorage.title ) {
	vars.title.innerText = localStorage.title
}

if ( localStorage.text && localStorage.text != '' && localStorage.text != 'undefined' ) {
	vars.text_field.innerText = localStorage.text
} else {
	vars.text_field.innerText = ''
}

if ( !localStorage.getItem('background') ) {
	vars.backgroundImage.style.backgroundImage = 'url(' + vars.defaultImage  + ')'
} else {
	vars.backgroundImage.style.backgroundImage = 'url(' + localStorage.getItem('background')  + ')'
}

if ( localStorage.tabs && localStorage.tabs != "{}" ) {
	let map = new Map(Object.entries(JSON.parse(localStorage.tabs)))

	for ( let data of map.values() ) {
		let html = `<p>${data.title}</p>
		<span class="files-delete"><i class="fa-solid fa-trash"></i></span>`
		let li = document.createElement('li')
		li.classList.add('files-item')
		li.innerHTML = html
		li.setAttribute('data-id', data.id)
		vars.files_list.appendChild(li)
	}
}

// Edit
const editTitle = () => {
	vars.titleEdit.value = vars.title.innerText
	vars.titleEdit.classList.add('active')
	vars.title.classList.add('hidden')

	vars.titleEdit.addEventListener('change', () => {
		vars.title.innerText = vars.titleEdit.value
		vars.titleEdit.classList.remove('active')
		vars.title.classList.remove('hidden')

		localStorage.title = vars.title.innerText
	})
}
vars.title.addEventListener('click', editTitle)

const settingUpdate = (event) => {	
	localStorage.setItem('background', vars.inputBackgroundUrl.value)
	vars.backgroundImage.style.backgroundImage = 'url('+ localStorage.getItem('background') +')'
}

vars.settingSave.addEventListener('click', settingUpdate)

// Autosave every 60 seconds
setInterval(() => {
	localStorage.text = vars.text_field.innerText;
}, 10000)

// Import files
const uploadText = async () => {
	return new Promise(res => {
		vars.filesUpload.addEventListener('change', () => {
			const files = vars.filesUpload.files

			if (files.length) {
				const reader = new FileReader()
				reader.addEventListener('load', () => {
					res(reader.result)
				})
				reader.readAsText(files[0])
			}
		})
	})
}

vars.importButton.addEventListener('click', e => {
	vars.filesUpload.click();

	uploadText().then(text => {
		vars.text_field.innerText = ''
		vars.text_field.innerText = text

		let event = new Event("input")

		vars.text_field.dispatchEvent(event)
	})
})

// Files
// const checkFiles = () => {
// 	( vars.files_list.children.length == 0 ) ?
// 	vars.files_empty.classList.add('show') :
// 	vars.files_empty.classList.remove('show')
// }
// checkFiles()

// const overwriteFiles = () => {
// 	[...vars.files_list.children].forEach((item, index) => {
// 		item.setAttribute('data-id', index)
// 	})
// }

// const addFile = () => {
// 	let html = `<p>${vars.files_title.value}</p>
// 	<span class="files-delete"><i class="fa-solid fa-trash"></i></span>`
// 	let li = document.createElement('li')
// 	let filesLength = vars.files_list.children.length

// 	li.classList.add('files-item')
// 	li.innerHTML = html

// 	overwriteFiles()
// 	vars.files_list.appendChild(li)

// 	checkFiles()

// 	vars.files_map.set(li.getAttribute('data-id'), {
// 		id: li.getAttribute('data-id'),
// 		title: vars.files_title.value,
// 		text: '',
// 	})

// 	if ( localStorage.tabs ) {
// 		let map = new Map(Object.entries(JSON.parse(localStorage.tabs)))
// 		let id = (filesLength).toString()
// 		let content = vars.files_map.get(id)

// 		map.set(id, content)
		
// 		localStorage.tabs = JSON.stringify(Object.fromEntries(map))
// 	} else {
// 		localStorage.tabs = JSON.stringify(Object.fromEntries(vars.files_map));
// }

// [...vars.files_list.children].forEach(item => {
// 	item.children[1].addEventListener('click', deleteFile)
// })

// vars.files_title.closest('.hitman-modal').children[0].click()
// }

// const deleteFile = (event) => {
// 	let parent = event.target.closest('.files-item')

// 	vars.files_list.removeChild(parent)

// 	checkFiles()

// 	let map = new Map(Object.entries(JSON.parse(localStorage.tabs)))
	
// 	map.delete(parent.getAttribute('data-id'))

// 	localStorage.tabs = JSON.stringify(Object.fromEntries(map))
// }

// vars.files_create.addEventListener('click', addFile)