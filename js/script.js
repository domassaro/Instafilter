$(function() {
	//max Width and Height for the Canvas
	var	maxWidth = 500,
		maxHeight = 500,
		//easy way to grab the information by creating variables
		photo = $('#photo'),
		preimg = $('#pimg a img'),
		originalCanvas = null,
		filters = $('#presetfilters li a'),
		filterSliders = $('#FilterSliders'),
		filterSliderInput = $('#FilterSliders Filter FilterSetting input'),
		filterContainer = $('#filterContainer');


	// Use the fileReader plugin to listen for
	// file drag and drop on the photo div:

	photo.fileReaderJS({
		on:{
			load: function(e, file){

				// An image has been dropped.

				var img = $('<img>').appendTo(photo),
					imgWidth, newWidth,
					imgHeight, newHeight,
					ratio;

				// Remove canvas elements left on the page
				// from previous image drag/drops.

				photo.find('canvas').remove();
				filters.removeClass('active');

				// When the image is loaded successfully,
				// we can find out its width/height:

				img.load(function() {

					imgWidth  = this.width;
					imgHeight = this.height;

					// Calculate the new image dimensions, so they fit
					// inside the maxWidth x maxHeight bounding box

					if (imgWidth >= maxWidth || imgHeight >= maxHeight) {

						// The image is too large,
						// resize it to fit a 500x500 square!

						if (imgWidth > imgHeight) {

							// Wide
							ratio = imgWidth / maxWidth;
							newWidth = maxWidth;
							newHeight = imgHeight / ratio;

						} else {

							// Tall or square
							ratio = imgHeight / maxHeight;
							newHeight = maxHeight;
							newWidth = imgWidth / ratio;

						}

					} else {
						newHeight = imgHeight;
						newWidth = imgWidth;
					}

					// Create the original canvas.

					originalCanvas = $('<canvas>');
					var originalContext = originalCanvas[0].getContext('2d');

					// Set the attributes for centering the canvas

					originalCanvas.attr({
						width: newWidth,
						height: newHeight
					}).css({
						marginTop: -newHeight/2,
						marginLeft: -newWidth/2
					});

					// Draw the dropped image to the canvas
					// with the new dimensions
					originalContext.drawImage(this, 0, 0, newWidth, newHeight);

					// We don't need this any more
					img.remove();
					$('#left_col').hide();
					$('#right_col').hide();
					$('#box').css("padding-left", "200px");
					$('#refresh').fadeIn();
					filterContainer.fadeIn();
					filterSliders.fadeIn();
					filterSliders.css("display", "inline-block")

					// Trigger the default "normal" filter
					filters.first().click();
				});

				// Set the src of the img, which will
				// trigger the load event when done:

				img.attr('src', e.target.result);
			},

			beforestart: function(file){

				// Accept only images.
				// Returning false will reject the file.

				return /^image/.test(file.type);
			}
		}
	});

	preimg.click(function(e){
		if($('canvas').length == 0) {
			$("#photo").html("<canvas width='200px' height='200px'></canvas>" + $("#photo").html());
			}
			
		  	
			another_image = preimg;
			originalCanvas = $('canvas');
			context = originalCanvas[0].getContext('2d');
					originalCanvas.attr({
						width: 500,
						height: 375
					}).css({
						marginTop: -152,
						marginLeft: -200.5
					});
			base_image = new Image();
			base_image.onload = function(){
				context = $('canvas')[0].getContext('2d');
				context.drawImage(this, 0, 0, 500, 375);
			};
				
					base_image.src = $(this).attr('src');
					$('#left_col').hide();
					$('#right_col').hide();
					$('#box').css("padding-left", "200px");
					filterContainer.fadeIn();
					filterSliders.fadeIn();
					filterSliders.css("display", "inline-block");
					$('#refresh').fadeIn();

	});


	// Update functions for all the filter sliders 
	// gets the class value 
    BrightnessSliderVal = $('.BrightnessValue')
    //on changing of the slider, you update the number value
    //and apply the filter to the image
	$('#brightness').on("change", updateBrightness);

	function updateBrightness() {
    BrightnessSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);
		//applying the rendering
		Caman(clone[0], function () {
			this.brightness(change).render();
		})
		//showDownload when changed
		showDownload(clone[0]);
	}

    ContrastSliderVal = $('.ContrastValue')

	$('#contrast').on("change", updateContrast);
	function updateContrast() {
    ContrastSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.contrast(change).render();
		})

		showDownload(clone[0]);
	}

    SaturationSliderVal = $('.SaturationValue')

	$('#saturation').on("change", updateSaturation);
	function updateSaturation() {
  	SaturationSliderVal.html(this.value);
  	// Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.saturation(change).render();
		})

		showDownload(clone[0]);
	}

    VibranceSliderVal = $('.VibranceValue')

	$('#vibrance').on("change", updateVibrance);
	function updateVibrance() {
    VibranceSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.vibrance(change).render();
		})

		showDownload(clone[0]);
	}

    ExposureSliderVal = $('.ExposureValue')

	$('#exposure').on("change", updateExposure);
	function updateExposure() {
    ExposureSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.exposure(change).render();
		})

		showDownload(clone[0]);
	}


    HueSliderVal = $('.HueValue')

	$('#hue').on("change", updateHue);
	function updateHue() {
    HueSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.hue(change).render();
		})

		showDownload(clone[0]);
	}

   SepiaSliderVal = $('.SepiaValue')

	$('#sepia').on("change", updateSepia);
	function updateSepia() {
    SepiaSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.sepia(change).render();
		})

		showDownload(clone[0]);
	}

    GammaSliderVal = $('.GammaValue')

	$('#gamma').on("change", updateGamma);
	function updateGamma() {
    GammaSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.gamma(change).render();
		})

		showDownload(clone[0]);
	}

    NoiseSliderVal = $('.NoiseValue')

	$('#noise').on("change", updateNoise);
	function updateNoise() {
    NoiseSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.noise(change).render();
		})

		showDownload(clone[0]);
	}

    ClipSliderVal = $('.ClipValue')

	$('#clip').on("change", updateClip);
	function updateClip() {
    ClipSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.clip(change).render();
		})

		showDownload(clone[0]);
	}

    SharpenSliderVal = $('.SharpenValue')

	$('#sharpen').on("change", updateSharpen);
	function updateSharpen() {
    SharpenSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.sharpen(change).render();
		})

		showDownload(clone[0]);
	}

    StackBlurSliderVal = $('.StackBlurValue')

	$('#stackBlur').on("change", updateStackBlur);
	function updateStackBlur() {
    StackBlurSliderVal.html(this.value);
    // Clone the canvas
	var clone = originalCanvas.clone();
    var change = this.value;
	// Clone the image stored in the canvas as well
	clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);
	// Add the clone to the page and trigger
	// the Caman library on it
	photo.find('canvas').remove().end().append(clone);

		Caman(clone[0], function () {
			this.stackBlur(change).render();
		})

		showDownload(clone[0]);
	}


	// click function for presetFilters

	filters.click(function(e){

		e.preventDefault();

		var f = $(this);
		// if filter is active, you don't apply it twice
		if(f.is('.active')){
			return false;
		}
		// if you click on a filter it adds the class active
		filters.removeClass('active');
		f.addClass('active');
		// Clone the canvas
		var clone = originalCanvas.clone();

		// Clone the image stored in the canvas as well
		clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);


		// Add the clone to the page and trigger
		// the Caman library on it

		photo.find('canvas').remove().end().append(clone);
	
		var effect = $.trim(f[0].id);

		Caman(clone[0], function () {

			// If such an effect exists, use it:

			if( effect in this){
				this[effect]();
				this.render();
				// if the canvas is filtered show download button
				showDownload(clone[0]);
			}
			else{
				// hides download button until needed
				hideDownload();
			}
		});

	});
	// downloadImage refers to the class of the photo
	var downloadImage = $('a.downloadImage');

	function showDownload(canvas) {

	downloadImage.off('click').click(function(){
			
			var url = canvas.toDataURL("image/png;base64;");
			downloadImage.attr('href', url);
			
		}).fadeIn();

	}

	function hideDownload() {
		downloadImage.fadeOut();
	}

});
