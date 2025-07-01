 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });
 console.log("AOS initialized!");

jQuery(document).ready(function($) {

	"use strict";

	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
				$this.attr('aria-expanded', 'false');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
				$this.attr('aria-expanded', 'true');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();






	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
	    type: 'image',
	    closeOnContentClick: true,
	    closeBtnInside: false,
	    fixedContentPos: true,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	     gallery: {
	      enabled: true,
	      navigateByImgClick: true,
	      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	      verticalFit: true
	    },
	    zoom: {
	      enabled: true,
	      duration: 300 // don't foget to change the duration also in CSS
	    }
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	    disableOn: 700,
	    type: 'iframe',
	    mainClass: 'mfp-fade',
	    removalDelay: 160,
	    preloader: false,

	    fixedContentPos: false
	  });
	};
	siteMagnificPopup();


	var siteCarousel = function () {
		// Initialize owl carousel for testimonials and other carousels (not services)
		if ( $('.owl-carousel-2').length > 0 ) {
			$('.owl-carousel-2').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 30,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	nav: true,
	          items: 1
	        },
	        1000:{
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        },
	        1200:{
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        }
		    }
			});
		}

		// Services are now handled by CSS Grid - no owl carousel needed

		// Initialize slide-one-item carousel
		if ( $('.slide-one-item').length > 0 ) {
			$('.slide-one-item').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    smartSpeed: 1000,
		    autoplay: true,
		    pauseOnHover: false,
		    nav: true,
		    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		  });
		}
	};
	siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	siteStellar();






	


	// ================================
	// ENHANCED UX IMPROVEMENTS
	// ================================


	// Contact Form Validation and Handling
	var contactForm = function() {
		const form = document.getElementById('contactForm');
		if (!form) return;

		const nameField = document.getElementById('contactName');
		const emailField = document.getElementById('contactEmail');
		const phoneField = document.getElementById('contactPhone');
		const serviceField = document.getElementById('contactService');
		const messageField = document.getElementById('contactMessage');
		const submitBtn = form.querySelector('button[type="submit"]');

		// Email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// Phone validation regex (French format)
		const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;

		// Real-time validation functions
		function validateField(field, isValid, errorMessage = '') {
			const errorDiv = field.nextElementSibling;
			
			if (isValid) {
				field.classList.remove('is-invalid');
				field.classList.add('is-valid');
				if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
					errorDiv.style.display = 'none';
				}
			} else {
				field.classList.remove('is-valid');
				field.classList.add('is-invalid');
				if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
					errorDiv.textContent = errorMessage;
					errorDiv.style.display = 'block';
				}
			}
		}

		function validateName() {
			const value = nameField.value.trim();
			const isValid = value.length >= 2;
			validateField(nameField, isValid, 'Veuillez entrer un nom d\'au moins 2 caractères.');
			return isValid;
		}

		function validateEmail() {
			const value = emailField.value.trim();
			const isValid = emailRegex.test(value);
			validateField(emailField, isValid, 'Veuillez entrer une adresse email valide.');
			return isValid;
		}

		function validatePhone() {
			const value = phoneField.value.trim();
			// Phone is optional, so empty is valid
			if (value === '') {
				phoneField.classList.remove('is-invalid', 'is-valid');
				return true;
			}
			const isValid = phoneRegex.test(value.replace(/[\s\-\.]/g, ''));
			validateField(phoneField, isValid, 'Veuillez entrer un numéro de téléphone français valide.');
			return isValid;
		}

		function validateMessage() {
			const value = messageField.value.trim();
			const isValid = value.length >= 10;
			validateField(messageField, isValid, 'Veuillez entrer un message d\'au moins 10 caractères.');
			return isValid;
		}

		// Add event listeners for real-time validation
		nameField.addEventListener('blur', validateName);
		nameField.addEventListener('input', function() {
			if (this.classList.contains('is-invalid')) {
				validateName();
			}
		});

		emailField.addEventListener('blur', validateEmail);
		emailField.addEventListener('input', function() {
			if (this.classList.contains('is-invalid')) {
				validateEmail();
			}
		});

		phoneField.addEventListener('blur', validatePhone);
		phoneField.addEventListener('input', function() {
			if (this.classList.contains('is-invalid')) {
				validatePhone();
			}
		});

		messageField.addEventListener('blur', validateMessage);
		messageField.addEventListener('input', function() {
			if (this.classList.contains('is-invalid')) {
				validateMessage();
			}
		});

		// Form submission handling
		form.addEventListener('submit', function(e) {
			e.preventDefault();

			// Validate all fields
			const isNameValid = validateName();
			const isEmailValid = validateEmail();
			const isPhoneValid = validatePhone();
			const isMessageValid = validateMessage();

			const isFormValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

			if (!isFormValid) {
				// Focus on first invalid field
				const firstInvalid = form.querySelector('.is-invalid');
				if (firstInvalid) {
					firstInvalid.focus();
				}
				return;
			}

			// Show loading state
			const btnText = submitBtn.querySelector('.btn-text');
			const btnLoading = submitBtn.querySelector('.btn-loading');
			
			submitBtn.disabled = true;
			btnText.classList.add('d-none');
			btnLoading.classList.remove('d-none');

			// Prepare mailto data
			const formData = {
				name: nameField.value.trim(),
				email: emailField.value.trim(),
				phone: phoneField.value.trim() || 'Non renseigné',
				service: serviceField.options[serviceField.selectedIndex].text || 'Non spécifié',
				message: messageField.value.trim()
			};

			// Create mailto link
			const subject = `Nouvelle demande de contact - ${formData.name}`;
			const body = `Bonjour,

Vous avez reçu une nouvelle demande de contact via le site Edenitude :

Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone}
Service d'intérêt : ${formData.service}

Message :
${formData.message}

---
Ce message a été envoyé depuis le formulaire de contact du site Edenitude.`;

			const mailtoLink = `mailto:info@edenitude.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

			// Open mailto link
			window.location.href = mailtoLink;

			// Simulate successful submission after a delay
			setTimeout(function() {
				// Reset loading state
				submitBtn.disabled = false;
				btnText.classList.remove('d-none');
				btnLoading.classList.add('d-none');

				// Show success message
				const successMessage = form.querySelector('.form-success-message');
				if (successMessage) {
					successMessage.classList.remove('d-none');
					
					// Reset form
					form.reset();
					
					// Remove validation classes
					const validatedFields = form.querySelectorAll('.is-valid, .is-invalid');
					validatedFields.forEach(field => {
						field.classList.remove('is-valid', 'is-invalid');
					});

					// Hide success message after 5 seconds
					setTimeout(function() {
						successMessage.classList.add('d-none');
					}, 5000);
				}

				// Scroll to success message
				successMessage.scrollIntoView({ behavior: 'smooth' });
			}, 2000);
		});
	};
	contactForm();

	// Smooth scrolling for anchor links
	var smoothScrolling = function() {
		$('a[href^="#"]').on('click', function(event) {
			var target = $($(this).attr('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - 100
				}, 800);
			}
		});
	};
	smoothScrolling();

	// Enhanced service item interactions
	var serviceInteractions = function() {
		$('.service-item').hover(
			function() {
				$(this).find('.btn').addClass('btn-primary').removeClass('btn-outline-primary');
			},
			function() {
				$(this).find('.btn').removeClass('btn-primary').addClass('btn-outline-primary');
			}
		);
	};
	serviceInteractions();
});
// Enhanced smooth scroll for hero CTA
$(document).ready(function() {
    // Smooth scroll enhancement for hero CTA
    $('.hero-cta').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000, 'easeInOutCubic');
        }
    });

    // Grid item entrance animations with intersection observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all grid items
        document.querySelectorAll('.grid-item').forEach(function(item) {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        $('.grid-item').addClass('animate-in');
    }

    // Enhanced floating animation for decorative images
    function enhanceFloatingAnimation() {
        $('.decorative-image.floating').each(function(index) {
            var delay = index * 1000; // Stagger the animations
            $(this).css('animation-delay', delay + 'ms');
        });
    }

    enhanceFloatingAnimation();

    // Parallax effect for decorative elements on scroll
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        var parallax = scrolled * 0.1;
        
        $('.decorative-image').css('transform', 'translateY(' + parallax + 'px)');
    });

    // Enhanced hover effects for service cards
    $('.service-card').hover(
        function() {
            $(this).find('img').addClass('hover-scale');
        },
        function() {
            $(this).find('img').removeClass('hover-scale');
        }
    );
});
