var Manager;

(function ($) {

  $(function () {
  
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/'
      //proxyUrl: 'http://localhost:8983/solr/select'
   });
   Manager.addWidget(new AjaxSolr.ResultWidgethlq1({
      id: 'resultquery1',
      target: '#docs'
    }));
    Manager.addWidget(new AjaxSolr.ResultWidgethlq2({
      id: 'resultquery2',
      target: '#docs3'
      
    }));
    Manager.addWidget(new AjaxSolr.ResultWidgethlq3({
      id: 'resultquery3',
      target: '#docs4'
      
    }));
    Manager.addWidget(new AjaxSolr.ResultContractWidget({
       id: 'content',
       target: '#docs2'
    }));
     Manager.addWidget(new AjaxSolr.TextWidgetQuery1({
      id: 'textquery1',
      target: '#search',
      field: 'content'
    }));
    Manager.addWidget(new AjaxSolr.TextWidgetQuery2({
      id: 'textquery2',
      target: '#search2',
      field: 'content'
    }));
     Manager.addWidget(new AjaxSolr.TextWidgetQuery3({
      id: 'textquery3',
      target: '#search3',
      field: 'content'
    }));
   
    
    Manager.init();
    Manager.store.addByValue('q', '*:*');

    Manager.store.addByValue('fl', 'content');
    Manager.store.addByValue('indent', 'on');
    Manager.store.addByValue('hl', 'true');
    Manager.store.addByValue('hl.fl','content');
    Manager.store.addByValue('hl.fragsize','120');
    Manager.store.addByValue('hl.snippets','8');
    Manager.store.addByValue('hl.simple.pre','<strong>');
    Manager.store.addByValue('hl.simple.post','<\strong>');
    var params = {
      facet: true,
      'facet.field': ['content'],
      'facet.limit': 510,
      'facet.mincount': 1,
      'f.topics.facet.limit': 50,
      'json.nl': 'map'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
   
    Manager.doRequest(0,'content' );
    
  });

})(jQuery);
