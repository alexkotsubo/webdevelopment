'use strict';
let body = document.querySelector('body');

// Burger

let check = document.getElementById('burg-check');
let burg_link = document.getElementsByClassName('burg-link-txt');

if (check.checked) {
	body.style.overflow = 'hidden';
} else {
	body.style.overflow = 'auto';
}

for(let i = 0, length = burg_link.length; i < length; i++) {
	burg_link[i].addEventListener('click', function(e) {
		if (check.checked) {
			check.checked = false;
		}
	});
}

check.addEventListener('click', function(e) {
	if (check.checked) {
		body.style.overflow = 'hidden';
	} else {
		body.style.overflow = 'auto';
	}
});

document.documentElement.addEventListener('click', function(e) {
	if (!e.target.closest('.burger') || e.target.closest('.black-bg')) {
		check.checked = false;
	}
});

// Tabs

let tab_btn = document.getElementsByClassName('tab-btn');
let tabs_content = document.getElementsByClassName('tabs-content');
let errorTabs = document.getElementById('error-tabs');
let prevTab;
let errorTab;

for(let i = 0, length = tab_btn.length; i < length; i++) {
	if (tab_btn[i].classList.contains('tab-btn-active')) {
		tabs_content[i].classList.add('tabs-content-active');
		prevTab = i;
	}

	tab_btn[i].addEventListener('click', function(e) {
		if (!(errorTab == undefined)) {
			tab_btn[errorTab].classList.remove('tab-btn-active');
			errorTabs.classList.remove('error-tabs-active');
		}
		tab_btn[prevTab].classList.remove('tab-btn-active');
		tab_btn[i].classList.add('tab-btn-active');
		tabs_content[prevTab].classList.remove('tabs-content-active');

		try {
			tabs_content[i].classList.add('tabs-content-active');
			prevTab = i;
		} catch(e) {
			errorTab = i;
			errorTabs.classList.add('error-tabs-active');
		}
	});
}

// Smooth

let nav = document.getElementById('nav');

window.onload = function() {
	let anchors = document.querySelectorAll('.scroll-to');

	for(let i = 0, length = anchors.length; i < length; i++) {
		anchors[i].addEventListener('click', function(e) {
			body.style.overflow = 'auto';
			let class_anchors = anchors[i].className.split('');
			let blockid = '';
			for(let i = 0, length = class_anchors.length; i < length; i++) {
				if (class_anchors[i] == 's' && class_anchors[i + 1] == '-') {
					for(let index = i + 2, length = class_anchors.length; index < length; index++) {
						if (class_anchors[index] !== '' && class_anchors[index] !== ' ') {
							blockid = blockid + class_anchors[index];
						} else {
							break;
						}
					}
				}
			}

			let scroll = document.getElementById(blockid).offsetTop - nav.offsetHeight;

			window.scrollTo({
				top: scroll,
				behavior: 'smooth',
			});
		});
	}
}

// Slider, Active

$(document).ready(function() {
	$('.team-slider-list').on('init', function(slick) {
		let menu = document.querySelector('.menu');
		let menu_txt = document.querySelectorAll('.menu-txt');
		let heightV = 0;
		let widthV = 0;
		let body_height = 0;
		let scroll = [];
		let max_scroll = [];
		let prevMenu;

		function active_else() {
			heightV = document.body.clientHeight;
			widthV = document.body.clientWidth;
			body_height = document.body.scrollHeight;

			for(let i = 0, length = menu_txt.length; i < length; i++) {
				let class_name = menu_txt[i].className.split('');
				let blockId = '';

				for(let i = 0, length = class_name.length; i < length; i++) {
					if (class_name[i] == 's' && class_name[i + 1] == '-') {
						for(let index = i + 2, length = class_name.length; index < length; index++) {
							if (class_name[index] !== '' && class_name[index] !== ' ') {
								blockId = blockId + class_name[index];
							} else {
								break;
							}
						}
					}
				}

				scroll[i] = document.getElementById(blockId).offsetTop - nav.offsetHeight;
				max_scroll[i] = document.getElementById(blockId).offsetHeight + scroll[i];
			}

			for(let i = 0, length = menu_txt.length; i < length; i++) {
				if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
					if (!(prevMenu == undefined)) {
						menu_txt[prevMenu].classList.remove('menu-txt-active');
					}

					if (pageYOffset <= max_scroll[i]) {
						menu_txt[i].classList.add('menu-txt-active');
						prevMenu = i;
					}
				}
			}
		}

		active_else();

		window.addEventListener('scroll', function(e) {
			if (!(menu.style.display == 'none')) {
				if (document.body.clientHeight == heightV && document.body.clientWidth == widthV && document.body.scrollHeight == body_height) {
					for(let i = 0, length = menu_txt.length; i < length; i++) {
						if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
							if (!(prevMenu == undefined)) {
								menu_txt[prevMenu].classList.remove('menu-txt-active');
							}

							if (pageYOffset <= max_scroll[i]) {
								menu_txt[i].classList.add('menu-txt-active');
								prevMenu = i;
							}
						}
					}
				} else {
					active_else();
				}
			}
		});
	});

	$('.team-slider-list').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1,
	      }
	    },
	    {
	      breakpoint: 576,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	      }
	    },
	  ],
	});
});