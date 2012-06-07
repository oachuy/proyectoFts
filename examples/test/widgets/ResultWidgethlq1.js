(function ($) {

AjaxSolr.ResultWidgethlq1 = AjaxSolr.AbstractWidget.extend({
  beforeRequest: function () {
    
    $(this.target).html($('<img/>').attr('src', 'images/ajax-loader.gif'));
  },

  afterRequest: function () {
    after_requestHihglight(this);
    set_highlight(this,"hiliteq1");
  },
  init: function () {
    $('a.more').livequery(function () {
      $(this).toggle(function () {
        $(this).parent().find('span').show();
        $(this).text('less');
        return false;
      }, function () {
        $(this).parent().find('span').hide();
        $(this).text('more');
        return false;
      });
    });
  },
});

})(jQuery);
