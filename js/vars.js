let textarea = document.querySelector('.autoresize')
let key = document.querySelector('#key')

let title = document.querySelector('.title')
let titleEdit = document.querySelector('.title-edit')

let settingOpenButton = document.querySelector('.setting-open')
let settingBody = document.querySelector('.setting');

let exportButton = document.querySelector('.export');
let importButton = document.querySelector('.import');

let backgroundImage = document.querySelector('.main-img');
let defaultImage = 'https://files.wallpaperpass.com/2019/10/gravity%20falls%20wallpaper%20077%20-%201920x1080.jpg'
let imageUrl = undefined
let inputBackgroundUrl = document.querySelector('.url-background')
let settingSave = document.querySelector('.setting__save')
let characters = document.querySelector('.characters')

let filesUpload = document.querySelector('.files__upload')
let filesSend = document.querySelector('.files__send')
let text = undefined

export {
	textarea,
	key,
	title,
	titleEdit,
	settingOpenButton,
	settingBody,
	exportButton,
	importButton,
	backgroundImage,
	defaultImage,
	imageUrl,
	inputBackgroundUrl,
	settingSave,
	characters,
	filesUpload,
	text
}