var params;
var v2_0 = false;
function md5(str) {
  //  discuss at: http://phpjs.org/functions/md5/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: utf8_encode
  //   example 1: md5('Kevin van Zonneveld');
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  var xl;

  var rotateLeft = function(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };

  var addUnsigned = function(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function(x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function(x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function(x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function(x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function(str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function(lValue) {
    var wordToHexValue = '',
      wordToHexValue_temp = '',
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  //str = utf8_encode(str);
    
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return temp.toLowerCase();
}
function submit_param(key, value, newValue){
    var req_body = {};
    req_body[key] = newValue;
    var jqxhr = $.post( "/v1/config", req_body)
                .done(function(data,textStatus,jqXHR) {
                    if(data.substring(0, 6) == "Cannot"){
                        sweetAlert("Oops...", "There is no such parameter!", "error");
                        $("#"+key).editable('setValue', value);
                    } else {
                        $("#"+key).editable('setValue', newValue);
                    }
                })
                .fail(function() {
                    sweetAlert("Oops...", "Unexpected error occured!", "error");
                    $("#"+key).editable('setValue', value);
                }); 
}
var paramIsOpen = false;
function configure_params(params) {
    if (jQuery.isEmptyObject(params)) {
        $("#params_window").empty();
        $("#params_window").html('<h5 align="center" style="color:orange;">No Specific Parameters Configuration</h5>');
    } else {
        $("#params_table").empty();
        var i = 0;
        var tabIndex = 0;
        var param_keys = [];
        $.each( params, function( key, value ) {
            if(i < 9){
                // add a new row
                $("#params_table").append(parse("<div id='%s' class='row' style='height: 30px;'></div>", ('row'+i)));
            }
            $("#row"+(i%9)).append(parse("<div class='col-md-1'>%s.</div><div class='col-md-3' align='left'>%s</div><div class='col-md-2' style='text-align: right;'><a id='%s'></a></div>", ++i, key, key));
            param_keys.push(key);
            
            if(i<10){
                shortcut.add("Alt+"+i,function() {
                    if(!paramIsOpen) { 
                        $("#param_settings").click();
                    }
                    $("#"+key).click();
                });
            } else {
                var index = i-10;
                shortcut.add("Alt+Shift+"+index,function() {
                    if(!paramIsOpen) { 
                        $("#param_settings").click();
                    }
                    $("#"+key).click();
                });
            }
            var newValue;
            $('#'+key).click(function(e) {
                tabIndex = param_keys.indexOf(key);
                e.stopPropagation();
                // hide all other
                $.each(param_keys, function(k){
                    if($('#in'+param_keys[k]).val() != undefined){
                        newValue = $('#in'+param_keys[k]).val();
                        submit_param(param_keys[k], params[param_keys[k]], newValue);
                        $('#'+param_keys[k]).editable('hide');
                    }
                });
            });
            $.fn.editable.defaults.mode = 'inline';
            $('#'+key).editable({
                type: 'text',
                pk: 1,
                title: 'Enter parameter value',
                highlight: false,
                showbuttons: false,
                value: value,
                emptytext: value,
                defaultValue: value,
                onblur: 'ignore',
                tpl: parse("<input id='%s' type='text' style='width: 70px;'>", ('in'+key)),
                success: function(response, newValue) {
                      submit_param(key, value, newValue);
                    }
                }                    
            );
        });
        $("#params_table").append("<div class='row' style='height: 30px; padding-top:10px;'><div style='text-align: center;'><button id='reset_params' class='btn btn-warning btn-xs' data-toggle='tooltip' title='reset to defaults'>reset to defaults</button></div></div>");
        $('#reset_params').click(function(e) {
            e.stopPropagation();
            var req_body = {};
            $.each( params, function( key, value ) {    
                req_body[key] = value;
            });
            var jqxhr = $.post( "/v1/config", req_body)
            .done(function(data,textStatus,jqXHR) {
                if(data.substring(0, 6) == "Cannot"){
                    sweetAlert("Oops...", "Some parameter name is mis-spelled!", "error");
                } else{
                    $.each( params, function( key, value ) {
                        $('#'+key).editable('setValue', value);
                    });
                    $.notify({message: "<div align='center'>Parameters Successfully Reset to Defaults</div>"},
                         {
                            delay: 3000,
                            placement: {
		                      from: "bottom",
		                      align: "center"
                            },
                            type: "info"
                        });
                }})
            .fail(function() {
                sweetAlert("Oops...", "Unexpected error occured!", "error");
                $.each( params, function( key, value ) {
                    $('#'+key).editable('setValue', value);
                });
            });
        });
        $('#close_params').click(function(e) {
            e.stopPropagation();
            $("#param_settings").click();
        });
        $('#param_settings').click(function (e) {
            if (paramIsOpen){
                $.each(param_keys, function(k){
                    if($('#in'+param_keys[k]).val() != undefined){
                        newValue = $('#in'+param_keys[k]).val();
                        submit_param(param_keys[k], params[param_keys[k]], newValue);
                        $('#'+param_keys[k]).editable('hide');
                    }
                });
                paramIsOpen =false;
            } else {
                paramIsOpen = true;
            }
        });
        $('#params_window').click(function(e) {
                e.stopPropagation();
            });
        shortcut.add("Tab",function() {
            if(!paramIsOpen) { 
                $("#param_settings").click();
            }
            $('#'+(param_keys[tabIndex%param_keys.length])).click();
            tabIndex++;
        });
        shortcut.add("Shift+Tab",function() {
            if(!paramIsOpen) { 
                $("#param_settings").click();
            }
            tabIndex--;
            if(tabIndex<0){
                tabIndex = param_keys.length - 1;
            }
            $('#'+(param_keys[tabIndex%param_keys.length])).click();
        });
    }
}
function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}
function update_ui(){
    $.get( "/algorun_info/manifest.json", function( data ) {
        data = JSON.parse(stripJsonComments(data));
        version = data['manifest_version']
        if(version == "2.0"){
            v2_0 = true
            $("#postRun").text("HTTP POST /v2/run")
            $("#postConfig").text("HTTP POST /v2/config")
        }
        if(data["algo_name"]){
            $( "#algo_name" ).html( data["algo_name"] );
            $( "#algo_tab" ).html( data["algo_name"] );
            $( "#about_algo_name" ).html( data["algo_name"] );
            $( "#algo_title" ).html( data["algo_name"] );
        }

        if(data["algo_summary"]){
            $( "#short_description" ).html( data["algo_summary"] );
        }
        if(data["algo_website"]){
            $( "#algo_website" ).attr( 'href', data["algo_website"] );
            $( "#algo_website" ).html( data["algo_website"] );
        }
        if(data["published_paper"]){
            var title = data["published_paper"]["title"];
            var url = data["published_paper"]["url"];
            if(title != "" && title != undefined && url != "" && url != undefined){
                $('#summary-section').append("<p>Published paper:&nbsp;<a href='" + url + "' target='_blank'>" + title + "</a></p>");   
            }
        }
        if(data["algo_packager"]){
            var name = data["algo_packager"]["name"];
            var url = data["algo_packager"]["personal_website"];
            if(name != "" && name != undefined && url != "" && url != undefined){
                $('#summary-section').append("<p>Packaged by:&nbsp;<a href='" + url + "' target='_blank'>" + name + "</a></p>");   
            }
        }
        
        $( "#authors" ).html("<h1 style='text-align: left; color:#58ACFA;'>Authors</h1>");
        if(data["algo_authors"]){
            var auth_id = 0;
            data["algo_authors"].forEach(function(obj) {
                auth_id += 1;
                var name = obj["name"];
                var email = obj["email"];
                if(email == undefined){
                    email = "";
                }
                var pic = obj["profile_picture"];
                var personal_page = obj["personal_website"];
                if(personal_page == undefined){
                    personal_page = '#';
                }
                var org = obj["organization"];
                var org_page = obj["org_website"];
                if(org == undefined ||  org_page == undefined){
                    org_page = '#';
                    org = 'Organization Not Given';
                }
                var author = parse("<div class='col-md-1'><img id='%s' src='/images/author.png' alt='author picture' style='width:40px; height:40px; vertical-align: middle;'></div><div class='col-md-5'><a href='%s' target='_blank'><h5 style='line-height: 30%;'>%s</h5></a><a href='%s' target='_blank' style='color: #888888; font-size:10px;'><p style='line-height: 100%;'>%s</p></a></div>", "auth"+auth_id ,personal_page, name, org_page, org);
                // get image from gravatar
                $("#authors").append( author );
                if(pic != undefined){
                    if(pic.trim() === ''){
                        $("#auth" + auth_id).attr('src', 'http://www.gravatar.com/avatar/' + md5(email));
                    }else{
                        $("#auth" + auth_id).attr('src', '/algorun_info/' + pic.trim());
                    }
		}else{
		    $("#auth" + auth_id).attr('src', 'http://www.gravatar.com/avatar/' + md5(email));		
		}
            });
        }
        
        if(data["algo_description"]){
            $( "#long_description" ).html( data["algo_description"] + '<br>' );
        }
        
        if(data["algo_image"]){
            $( "#offline_command" ).html( 'docker run -it -p 31331:8765 --name &#60;container_name&#62; ' + data["algo_image"] );
        }else{
            $("#download_section").empty();
            $("#download_nav").remove();
        }
        
        if(data["algo_parameters"]){
            params = data["algo_parameters"];
            configure_params(params);
        }
    }, "text");
}
$('.dropup.keep-open').on({
    "shown.bs.dropdown": function() { this.closable = false; },
    "click":             function() { this.closable = true; },
    "hide.bs.dropdown":  function() { return this.closable; }
});
update_ui();
$(document).ready(function(){
 
        //When distance from top = 250px fade button in/out
        $(window).scroll(function(){
            if ($(this).scrollTop() > 250) {
                $('#scrollup').fadeIn(300);
            } else {
                $('#scrollup').fadeOut(300);
            }
        });
 
        //On click scroll to top of page t = 1000ms
        $('#scrollup').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
 
});
