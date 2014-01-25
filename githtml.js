(function(d){

/*!
 * License http://www.apache.org/licenses/LICENSE-2.0
 */

  var cel = function(tag,prop,ap){
    var c=document.createElement(tag);
    for(p in prop){
      if(typeof prop[p] == 'object'){
        for(q in prop[p])
          c[p][q] = prop[p][q];
      }
      else c[p] = prop[p];
    }
    if(ap) ap.appendChild(c);
    return c;
  }

  var gitHtml = {
    decode: (function(el,str){
      if(str && typeof str === 'string'){
        str            = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str            = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        el.innerHTML   = str;
        str            = el.textContent;
        el.textContent = '';
      }
      return str;
    }),

    open: (function(c,d) {
        var ifr = cel('iframe',{
            src: 'about:blank',
            style: {
              width:      '100%',
              height:     '100%',
              position:   'absolute',
              top:        '0px',
              zIndex:     '9999',
              background: '#fff'
            },
            id:  'iframe'
        }, false);
        var close = cel('a',{
            innerHTML:  'x',
            style: {
              position: 'absolute',
              top:      '5px',
              left:     '5px',
              zIndex:   '99999'
            },
            className: 'minibutton',
            href:      'javascript:;',
            onclick: (function(){
              location.reload();
              return false;
            })
        },false);

        var allow = cel('a',{
          innerHTML:  '[links]',
          style:{
            position: 'absolute',
            top:      '5px',
            left:     '5px',
            zIndex:   '99999'
          },
          className:  'minibutton',
          href:       'javascript:;',
          onclick: (function(){
                this.style.cssText = this.style.cssText+';'+
                                     "color:#fff;"+
                                     "text-decoration:none;"+
                                     "text-shadow:0 -1px 0 rgba(0,0,0,0.3);"+
                                     "border-color:#518cc6;"+
                                     "border-bottom-color:#2a65a0;"+
                                     "background:#599bdc;"+
                                     "background:-moz-linear-gradient(#599bdc,#3072b3);"+
                                     "background:-webkit-linear-gradient(#599bdc,#3072b3);";
                  var ifrm = d.getElementById('iframe');
                      ifrm = (ifrm.contentDocument.document) 
                              ? ifrm.contentDocument.document 
                              : ifrm.contentDocument;
                  var all = ifrm.getElementsByTagName('a');
                      for(var i = 0; i<all.length; i++){
                        all[i].onclick = function(){
                          location.href = this.href;
                          return false;
                        }
                      }
                return false;        
          })
        },false);
          
        if(location.href.indexOf('#gitHtml')==-1){
            allow.style.left = '40px';
            d.body.appendChild(close);
        } 
        else {
          cel('link',{
            type: 'text/css',
            rel:  'stylesheet',
            href: 'https://a248.e.akamai.net/assets.github.com/assets/github-496f7426a679ea2d607d7e535f79e4be5f2a5352.css'
          },d.body);
        }
        d.body.appendChild(allow);
        d.body.appendChild(ifr);
        d.body.style.padding   = '0px';
        d.body.style.margin    = '0px';
      var ifrm = d.getElementById('iframe');
          ifrm = (ifrm.contentWindow) 
               ? ifrm.contentWindow 
               : (ifrm.contentDocument.document) 
                  ? ifrm.contentDocument.document 
                  : ifrm.contentDocument;
          ifrm.document.open();
          if(c.indexOf('githtml.min.js')!=-1){
            c = '---> click the [x] on the left and try "git-html" again';
          }
          ifrm.document.write(c);
          ifrm.document.close();
    }),

    start: (function(d){
      var link = {
        bootstrap: 'http://raw.github.com/twitter'+
                   '/bootstrap/master/docs/assets'+
                   '/css/bootstrap.css'
      };
      var el = d.createElement('div');
      var hp = (typeof jQuery === "undefined") 
             ? d.getElementsByTagName('pre')[0].innerHTML 
             : $(".highlight pre").html();
      var lo = location.href.replace(/\/blob\//,'/raw/');
      var bh = lo.replace(/\/[a-zA-Z0-9-_\.]+$/,'');
      var pr = hp.replace(/<div class=[\'|\"]line/g,'\n<div class="line').replace(/(<([^>]+)>)/ig,'');
          pr = pr.replace(/http\:([a-zA-Z0-9-_\.\/]+)bootstrap[a-zA-Z0-9-_\.\/\:]+css/g,link.bootstrap);
          pr = escape(gitHtml.decode(el,pr));
          if(location.href.indexOf('#gitHtml')==-1)
            pr = pr.replace(/http/g,'https');
          pr = pr.replace(/\.htm(l?)/g,'.htm$1#gitHtml');
            
  	  pr = unescape(pr).replace(/\n/g,'--githtml-newline--').replace(/\s/g,' ').replace(/--githtml-newline--/g,'\n');
      gitHtml.open(
        unescape("%3Cbase%20href%3D%22"+escape(lo)+"%22%3E")+pr,d
      );
    })
  }

  gitHtml.start(d);

})(document);
