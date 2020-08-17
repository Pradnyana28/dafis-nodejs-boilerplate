import feather from 'feather-icons';

jQuery(document).ready(() => {
  feather.replace();

  const windowOnScroll = () => {
    const navbar = jQuery('nav.navbar');
    if (jQuery(window).scrollTop() === 0) {
      navbar.removeClass('sticky');
    } else {
      navbar.addClass('sticky');
    }
  }
  jQuery(window).scroll(windowOnScroll);

  const showPassword = jQuery('#show-password');
  const hidePassword = jQuery('#hide-password');
  if (showPassword.length && hidePassword.length) {
    showPassword.on('click', () => {
      const targetInput = showPassword.data('target');
      jQuery(targetInput).attr('type', 'text');
      showPassword.css('display', 'none');
      hidePassword.css('display', 'block');
    });
  }
  if (hidePassword.length && showPassword.length) {
    hidePassword.on('click', () => {
      const targetInput = hidePassword.data('target');
      jQuery(targetInput).attr('type', 'password');
      showPassword.css('display', 'block');
      hidePassword.css('display', 'none');
    });
  }
});