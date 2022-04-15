// localStorage.clear()
import * as vars from './vars.js'

// textarea
vars.textarea.addEventListener('input', e => {
	vars.characters.innerText = vars.textarea.value.length
})

// Download
const download = () => {
	let el = document.createElement('a')

	el.href = 'data:attachment/text,' + encodeURI(vars.textarea.value);
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
	vars.textarea.value = localStorage.text
} else {
	vars.textarea.value = ''
}

if ( !localStorage.getItem('background') ) {
	vars.backgroundImage.style.backgroundImage = 'url(' + vars.defaultImage  + ')'
} else {
	vars.backgroundImage.style.backgroundImage = 'url(' + localStorage.getItem('background')  + ')'
}

// Aurtoresize
vars.textarea.style.cssText = `height: ${vars.textarea.scrollHeight}px; overflow-y: hidden`;

vars.textarea.addEventListener('input', () => {
	vars.textarea.style.height = "auto";
	vars.textarea.style.height = `${vars.textarea.scrollHeight}px`;
})

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

// Setting
const toggleMenu = () => {
	vars.settingBody.classList.toggle('active');
}

vars.settingOpenButton.addEventListener('click', e => {
	e.stopPropagation()
	toggleMenu()
})

// Клик вне меню
document.addEventListener('click', e => {
	const target = e.target;
	const its_menu = target == vars.settingBody || vars.settingBody.contains(target);
	const its_btnMenu = target == vars.settingOpenButton;
	const menu_is_active = vars.settingBody.classList.contains('active');

	if (!its_menu && !its_btnMenu && menu_is_active) {
		toggleMenu();
	}
})

const settingUpdate = (event) => {
	toggleMenu()
	
	localStorage.setItem('background', vars.inputBackgroundUrl.value)
	vars.backgroundImage.style.backgroundImage = 'url('+ localStorage.getItem('background') +')'
}

vars.settingSave.addEventListener('click', settingUpdate)

// Autosave every 60 seconds
setInterval(() => {
	localStorage.text = vars.textarea.value;
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
		console.log(text)

		vars.textarea.value = ''
		vars.textarea.value = text

		let event = new Event("input")

		vars.textarea.dispatchEvent(event)
	})
})