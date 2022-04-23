let hitman_button = document.querySelectorAll('.hitman-button')
let hitman_overlay = document.querySelectorAll('.hitman-overlay')
let hitman_modal = document.querySelectorAll('.hitman-modal')

const hitman = (kit) => {
	// Open and Hidden
	[kit.open, kit.overlay].forEach(el => {
		el.addEventListener('click', e => {
			kit.modal.classList.toggle('show')
		})
	})
}

for ( let i = 0; i < hitman_button.length; i++ ) {
	hitman({
		open: hitman_button[i],
		modal: hitman_modal[i],
		overlay: hitman_overlay[i]
	})
}