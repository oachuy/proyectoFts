// $Id$

/**
 * @see http://wiki.apache.org/solr/SolJSON#JSON_specific_parameters
 * @class Manager
 * @augments AjaxSolr.AbstractManager
 */
AjaxSolr.Manager = AjaxSolr.AbstractManager.extend(


  /** @lends AjaxSolr.Manager.prototype */
{
    widgetRequest : null,
    
    executeRequest: function (servlet, string, handler) {
      var self = this;
      string = string || this.store.string();
      
      handler = handler || function (data) { 
      self.handleResponse(data);
    };
    
    if (this.proxyUrl) {
      //var params = this.parsingToPost(string);
      //console.log( params);
      
      //jQuery.post(this.proxyUrl, params, handler, 'json');
      jQuery.post(this.proxyUrl, { query: string }, handler, 'json');
    }
    else {
      
      jQuery.getJSON(this.solrUrl + servlet + '?' + string + '&wt=json&json.wrf=?', {}, handler);
    }
    
  },

    doRequest: function (start,widgetRequest,servlet) {
  
    this.widgetRequest = widgetRequest;
    console.log('Manager jquery -do Request , widget = ' + this.widgetRequest);

    if (this.initialized === false) {
      this.init();
    }
    // Allow non-pagination widgets to reset the offset parameter.
    if (start !== undefined) {
      this.store.get('start').val(start);
    }
    if (servlet === undefined) {
      servlet = this.servlet;
    }
    this.store.save();
     
    if(this.widgetRequest=='textquery1'){
         this.widgets['resultquery1'].beforeRequest();
    }   
    else if(this.widgetRequest=='textquery2'){
         this.widgets['resultquery2'].beforeRequest();
    }
     else if(this.widgetRequest=='textquery3'){
         this.widgets['resultquery3'].beforeRequest();
    }
    else if(this.widgetRequest=='content'){
         this.widgets['content'].beforeRequest();
       }
    
    this.executeRequest(servlet);
  },
  
    handleResponse: function (data) {
     this.response = data;
     
     if(this.widgetRequest=='textquery1'){
         this.widgets['resultquery1'].afterRequest();
     }
     else if(this.widgetRequest=='textquery2'){
         this.widgets['resultquery2'].afterRequest();
     } 
     else if(this.widgetRequest=='textquery3'){
         this.widgets['resultquery3'].afterRequest();
     }  
     else if(this.widgetRequest=='content'){
         this.widgets['content'].afterRequest();
       }
       
  },
  
    parsingToPost: function (q) {
    
      var e;
      var urlParams = {};
      console.log(q);
      a = /\+/g;  // Regex for replacing addition symbol with a space
      r = /([^&=]+)=?([^&]*)/g;
      
      
      d = function (s) { return decodeURIComponent(s.replace(a, " ")); };
      
      while (e = r.exec(q))
        urlParams[d(e[1])] = d(e[2]);

      return urlParams;
    }

});
