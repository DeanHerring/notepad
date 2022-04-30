let hitman_button = document.querySelector('.hitman-button')
let hitman_overlay = document.querySelector('.hitman-overlay')
let hitman_modal = document.querySelector('.hitman-modal')

const hitman = (kit) => {
	// Open and Hidden
	console.log(kit)
	[kit.open, kit.overlay].forEach(el => {
		el.addEventListener('click', e => {
			kit.modal.classList.toggle('show')
		})
	})
}

hitman({
	open: hitman_button,
	modal: hitman_modal,
	overlay: hitman_overlay,
})

// for ( let i = 0; i < hitman_button.length; i++ ) {
// 	console.log(hitman_button, hitman_overlay, hitman_modal)

// 	hitman({
// 		open: hitman_button[i],
// 		modal: hitman_modal[i],
// 		overlay: hitman_overlay[i]
// 	})
// }