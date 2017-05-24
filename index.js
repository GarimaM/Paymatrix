var type = 'cc';
var rent_slider;
$(document).ready(function(){
	display_tenanat();
	rent_slider = new Slider('#rent', {
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
	$('#referral').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
	$('#rent').on("slide", function(evt) {
		var e = evt.value;			
		$('#rent_val').val(e);
		$('#card_rewards').html(parseInt(e*0.01).toString());
		$('#oad').html(parseInt((e*0.01)+100).toString());
		window[type+'_savings']();
	});
	$('#referral').on("slide", function(evt) {
		var e = evt.value;	
		$('#referral_val').val(e);
		window[type+'_savings']();
	});
	$('[data-toggle="tooltip"]').tooltip();
	$('input:radio[name="optionsRadios"]').click(
		function(){
			if (this.checked && this.value == 'creditCard') {
				$('#creditFreePeriod').show();
				$('#cardRewards').show();
				type = 'cc';
			}
			if (this.checked && this.value == 'debitCard') {
				$('#creditFreePeriod').hide();
				$('#cardRewards').show();
				type = 'dc';
			}
			if (this.checked && this.value == 'netBanking') {
				$('#creditFreePeriod').hide();
				$('#cardRewards').hide();
				type = 'nb';
			}
			window[type+'_savings']();
		});
	$('html').click(function() {
		hide_sideNav();
	});

	$('#side-nav').click(function(event){
		event.stopPropagation();
	});
	$('#menu_btn').click(function(event){
		event.stopPropagation();
	});
});
function changeSliderValue(val) {
	var v = parseInt(val);
	rent_slider.setValue(v, true);
}
function cc_savings(){
	var	rent = $('#rent_val').val();
	var referral = $('#referral_val').val();
	var	i = parseInt(rent*0.08);
	var intr = parseInt(i*45/365);
	var rewards = parseInt(rent*0.01);
	var ofd = parseInt((rent*0.01)+100);
	var	ref = parseInt(referral*100);
	var total = parseInt(intr)+parseInt(rewards)+parseInt(ofd)+parseInt(ref);
	$('#savings').html(parseInt(total).toString());
}
function dc_savings(){
	var	rent = $('#rent_val').val();
	var referral = $('#referral_val').val();
	var rewards = parseInt(rent*0.01);
	var ofd = parseInt((rent*0.01)+100);
	var	ref = parseInt(referral*100);
	var total = parseInt(rewards)+parseInt(ofd)+parseInt(ref);
	$('#savings').html(parseInt(total).toString());
}
function nb_savings(){
	var	rent = $('#rent_val').val();
	var referral = $('#referral_val').val();
	var ofd = parseInt((rent*0.01)+100);
	var	ref = parseInt(referral*100);
	var total = parseInt(ofd)+parseInt(ref);
	$('#savings').html(parseInt(total).toString());
}
function display_tenanat(){
	$('#tenant-tab').show();
	$('#tenant').addClass('active-tab');
	$('#landlord').removeClass('active-tab');
	$('#landlord-tab').hide();
	$('#tenant-glyph').show();
	$('#landlord-glyph').hide();
}
function display_landlord(){
	$('#tenant-tab').hide();
	$('#landlord-tab').show();
	$('#landlord').addClass('active-tab');
	$('#tenant').removeClass('active-tab');
	$('#tenant-glyph').hide();
	$('#landlord-glyph').show();
}
function show_sideNav(){
	$('#side-nav').removeClass('side-slide-out');
	$('#side-nav').addClass('side-slide-in');
	$('#overlay').removeClass('hidden');
	$('#overlay').show();
}
function hide_sideNav(){
	$('#side-nav').removeClass('side-slide-in');
	$('#side-nav').addClass('side-slide-out');
	$('#overlay').hide();
}
$(window).scroll(function(){
	if($(window).scrollTop() > 80){
		$('nav').addClass('nav-white');
		$('nav').addClass('nav-slide');
	} else {
		$('nav').removeClass('nav-white');
		$('nav').removeClass('nav-slide');
	}
});