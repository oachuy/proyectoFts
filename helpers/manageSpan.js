function reset_highlight(style) {

    var aux;
    var b = document.getElementsByTagName('span') ;
    for (var i=0;i<b.length;i++){  
      if(b[ i ].className == style){
         var parent = b[i].parentNode;  
         if(b[ i ].firstChild.nodeName == 'SPAN' ){
              aux = i+1;
              //console.log('auxspan = ',aux);
            }
         else{
              aux = i;
            }   
         parent.insertBefore(  b[ i ].firstChild, b[ i ] );
       
         parent.removeChild( b[ aux] );
         i=0;
       }
    }  
 
}

function after_requestHihglight(thisObject){

  $(thisObject.target).empty();
  console.log(thisObject.manager.response);
    if (thisObject.manager.response.highlighting !=undefined && thisObject.manager.response.highlighting.doc1 !=undefined){
      for (var i = 0, l = thisObject.manager.response.highlighting.doc1.content.length; i < l; i++) {
        var doc = thisObject.manager.response.highlighting.doc1.content[i];
        $(thisObject.target).append(AjaxSolr.theme('result', doc, AjaxSolr.theme('snippet', doc))); 
      }
    }
}

function set_highlight(thisObjet,style){

  var hltext=[];
  var options={};

  if (thisObjet.manager.response.highlighting !=undefined && thisObjet.manager.response.highlighting.doc1 !=undefined){
      reset_highlight(style);
      for (var i =0, l = thisObjet.manager.response.highlighting.doc1.content.length; i < l; i++) {
        var doc = thisObjet.manager.response.highlighting.doc1.content[i];
        var dochl = doc.replace( /\//g,'');
        dochl = dochl.replace( /<strong>/g,''); 
        hltext[i] = jQuery.trim(dochl);
      }
      for (var i = 0, l = thisObjet.manager.response.highlighting.doc1.content.length; i < l; i++) { 
        jQuery(function(){
		        options = {
			    exact:"exact",
			    style_name:style,
			    style_name_suffix:false,
			    keys: hltext[i]
			    
		    }
		    console.log(i,hltext[i]);
		
		    jQuery(document).SearchHighlight(options);
		    console.log("set_highlight");
	    });
      }
    }
  else{           
    reset_highlight(style);         
  }
}


