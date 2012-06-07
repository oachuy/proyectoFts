(function ($) {

// For a TextWidget that uses the q parameter, see:
// https://github.com/evolvingweb/ajax-solr/blob/gh-pages/examples/reuters/widgets/TextWidget.q.js
//AjaxSolr.TextWidget = AjaxSolr.AbstractFacetWidget.extend({
AjaxSolr.TextWidgetQuery1 = AjaxSolr.AbstractTextWidget.extend({

  init: function () {
    var self = this;
    
    var myId= this.id;

    $(this.target).find('input').bind('keydown', function(e) {   
      
      if (e.which == 13) {
        var value = $(this).val();
        if(value ==''){
          value = '-id:[* TO *]&hl=true';
        }
        
        self.clear();
        if (value && self.set(value)) {
          self.manager.doRequest(0, myId);
        }
      }
    });
  },

  
  afterRequest: function () {
    $(this.target).find('input').val('');
  }
});

})(jQuery);
