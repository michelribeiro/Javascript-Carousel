// Carousel

function Carousel() {
  var settings = {
    firstImg: function() {
      element = $('.one_photo').first();
      element.addClass('active');
      this.photo(element);
      this.description(element);
    },

    slide: function() {
      element = $('.one_photo.active');

      if(element.next().length > 0) {
        $(element).next().addClass('active');
        settings.photo(element.next());
        settings.description(element.next());
        $(element).removeClass('active');
      } else {
        $(element).removeClass('active');
        settings.firstImg();
      }
    },

    next: function() {
      clearInterval(interval);
      element = $('.one_photo.active');
      if(element.next().length > 0) {
        $(element).next().addClass('active');
        settings.photo(element.next());
        settings.description(element.next());
        $(element).removeClass('active');
      } else {
        $(element).removeClass('active');
        settings.firstImg();
      }
      interval = setInterval(settings.slide,10000);
    },

    prev: function() {
      clearInterval(interval);
      element = $('.one_photo.active');

      if(element.prev().length > 0) {
        $(element).prev().addClass('active');
        settings.photo(element.prev());
        settings.description(element.prev());
        $(element).removeClass('active');
      } else {
        $(element).removeClass('active');
        element = $('.one_photo:last-child');
        $(element).addClass('active');
        this.description(element);
        this.photo(element);
      }
      interval = setInterval(settings.slide,10000);
    },

    description: function(obj) {
      var description = obj.find('img').attr('alt');
      $('.photo_description').html(description);
    },

    photo: function(obj) {
      var photo = '<img src=' + obj.find('a').attr('href') + '>';
      $('.big_photo div').html(photo);
    },

    setIndex: function() {
      var total_photos = $('.one_photo').length;
      var photos = $('.one_photo');
      for (i = 0; i < total_photos; i++) {
        $(photos[i]).attr('data-index', i);
      }
    },

    changeForParticularPhoto: function(particular_photo) {
      var photo = '<img src=' + particular_photo.find('a').attr('href') + '>';
      var description = particular_photo.find('img').attr('alt');

      clearInterval(interval);
      // var total_photos = $('.one_photo').length;
      $('.one_photo.active').removeClass('active');
      particular_photo.addClass('active');
      $('.big_photo div').html(photo);
      $('.photo_description').html(description);
      interval = setInterval(settings.slide,10000);
    },

    stopOnHover: function() {
      clearInterval(interval);
    },

    getIntervalBack: function() {
      interval = setInterval(settings.slide,10000);
    }
  }

  settings.firstImg();
  settings.setIndex();
  settings.description(element);
  settings.photo(element);

  var interval = setInterval(settings.slide,10000);
  $(document).on('click', '.next', settings.next)
  $(document).on('click', '.prev', settings.prev)
  $(document).on('mouseenter', '.photo_container', settings.stopOnHover);
  $(document).on('mouseout', '.photo_container', settings.getIntervalBack);
  $(document).on('click', '.one_photo', function(e){
    settings.changeForParticularPhoto($(this));
    e.preventDefault();
  });
}

$(document).ready(function(){
  Carousel();
});
