// Folders
const fileCheck = (listlength = vars.foldersList.children.length) => {
	if ( listlength == 0 ) {
		vars.foldersEmpty.classList.add('show')
	} else {
		vars.foldersEmpty.classList.remove('show')
	}
}

fileCheck()

const fileAdd = () => {
	let html = `
	<p>Пустой файл ${vars.foldersList.children.length}</p>
	<span class="delete-file"><i class="fa-solid fa-trash"></i></span>`
	let li = document.createElement('li')
	li.classList.add('folders__item')
	li.innerHTML = html
	li.setAttribute('data-id', vars.foldersList.children.length)

	vars.foldersList.appendChild(li)
	fileCheck(vars.foldersList.children.length);

	[...vars.foldersList.children].forEach(item => {
		item.children[1].addEventListener('click', fileDelete)

		console.log(item)
	})


	console.log(localStorage)
}

const fileDelete = (e) => {
	let fileBody = e.target.parentNode.parentNode

	if ( vars.foldersList.children.length > 1 ) {
		vars.foldersList.removeChild(vars.foldersList.children[fileBody.getAttribute('data-id')])
	} else {
		vars.foldersList.removeChild(vars.foldersList.children[0])
	}
}

vars.foldersAdd.addEventListener('click', fileAdd)