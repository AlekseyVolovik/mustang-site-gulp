import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation }  from 'swiper'
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation ])

import { gsap, Power2 } from 'gsap'

import MicroModal from 'micromodal'


document.addEventListener('DOMContentLoaded', () => {

	//Modal

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	});

	//Swiper-slider

	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function(swier, current, total) {
				return `0${total}`
			} 
		}
	});

	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		mousewheel: {
			invert: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	});

	swiperIMG.controller.control = swiperText;
	swiperText.controller.control = swiperIMG;

	//Gear

	let gear = document.querySelector('.slider-gear');

	swiperText.on('slideNextTransitionStart', function(){
		gsap.to(gear, 2.8, {
			rotation: '+=40', 
			ease: Power2.easeOut
		})
	});

	swiperText.on('slidePrevTransitionStart', function(){
		gsap.to(gear, 2.8, {
			rotation: '-=40', 
			ease: Power2.easeOut
		})
	});

	//Slide Change

	let curnum = document.querySelector('.slider-pagination-count .current');
	
	swiperText.on('slideChange', function() {
		let index = swiperText.realIndex + 1
		gsap.to(curnum, 0.2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeInOut,
			onComplete: function() {
				gsap.to(curnum, 0.1, {
					force3D: true, 
					y: 10
				})
				curnum.innerHTML = `0${index}`
			}
		})
		gsap.to(curnum, 0.2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeInOut,
			delay: 0.3
		})
	})
})
