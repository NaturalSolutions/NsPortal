/**

	TODO:
	- error msg
	- autocomplete vincent plugin (bb collection)

**/
define(['marionette', 'backbone', 'sha1', 'config', 'jqueryui','i18n'],
function(Marionette, Backbone, JsSHA, config, $ui) {
  'use strict';
  return Marionette.LayoutView.extend({
    template: 'app/base/login/tpl/tpl-login.html',
    collection: new Backbone.Collection(),
    className: 'full-height',

    events: {
      'submit': 'login',
      'change #UNportal': 'isValidUserName',
      'focus input': 'clear',
    },

    ui: {
      err: '#help-password',
      logo: '#logo',

      userName: '#UNportal',
      password: '#password',
    },

    pwd: function(pwd) {

      pwd = window.btoa(unescape(decodeURIComponent( pwd )));
      var hashObj = new JsSHA('SHA-1', 'B64', 1);

      hashObj.update(pwd);
      pwd = hashObj.getHash('HEX');
      return pwd;
    },

    initialize: function() {
      this.model = window.app.siteInfo;

      var tmp = this.model.get('label').split('^');
      if (tmp.length > 1) {
        this.model.set({'sup' : tmp[1]});
      }else {
        this.model.set({'sup' : ''});
      }
      this.model.set({'title' : tmp[0]});
    },

    style: function() {
      var _this = this;
      var imgBackPortal = this.model.get('imgBackPortal');
      var imgLogoPrtal = this.model.get('imgLogoPortal');
      var logo = 'url(data:image/png;base64,' + imgBackPortal + ')';
      $(this.$el[0]).css('background', logo + ' center center no-repeat');
      var bg = 'url(data:image/png;base64,' + imgLogoPrtal + ')';
      this.ui.logo.css('background', bg + 'center center no-repeat');
      this.ui.logo.css({
        'background-size': 'contain',
      });

      $(this.$el[0]).css({
        'background-position': 'center',
        'background-attachment': 'fixed',
        'background-size': 'cover',
      });
    },

    onShow: function() {
      this.style();
      this.focus();
      var ctx = this;
      this.collection.url = config.coreUrl + 'user';
      this.collection.fetch({
        success: function(data) {
          ctx.users = [];
          data.each(function(m) {
            ctx.users.push(m.get('fullname'));
          });

          $('#UNportal').autocomplete({
            source: function(request, response) {
              var exp = '^' + $.ui.autocomplete.escapeRegex(request.term);
              var matcher = new RegExp(exp, 'i');
              response($.grep(ctx.users, function(item) {
                return matcher.test(item);
              }));
            },
          });
        },
      });
      this.$el.i18n();

      $("body").css('background-image', 'none');
    },

    isValidUserName: function() {
      return {
        username : this.ui.userName.val()
      }
      // var user = this.collection.findWhere({fullname: this.ui.userName.val()});
      // if (!user) {
      //   this.displayError(true, this.ui.userName, 'Invalid username');
      //   return false;
      // } else {
      //   return user;
      // }
    },

    login: function(elt) {
      var _this = this;
      elt.preventDefault();
      elt.stopPropagation();
      var url = config.coreUrl + 'security/oauth2/v1/login';
      var user = this.isValidUserName();

      if (!$('#password').val().length) {
        this.displayPwdError(true, this.ui.password, 'Invalid password');
        this.shake();
      }

      if (user) {
        $.ajax({
          context: this,
          type: 'POST',
          url: url,
          data: {
            username: user.username,
            password: this.pwd($('#password').val()),
          },
        }).done(function() {
          $('.login-form').addClass('rotate3d');
          //window.app.user.set('name', $('#UNportal').val());
          setTimeout(function() {
            // seems dirty but i don't known how to do it
            // without spend a lot of time to refact the front app
            // when we are logged we reload the location for execute again
            // the function checkIfCookie() when app start
            // it's usefull when an app redirect to portal
            // and the user is not logged in or is cookie not more valid
            window.location.reload()
          }, 500);
        }).fail(function() {
          this.displayPwdError(true, this.ui.password, 'Invalid password');
          this.shake();
          $('#password').val('');
        });
      } else {
        this.shake();
      }
    },

    clear: function(evt) {
      $(evt.target).removeClass('help-error');
      $(evt.target).val('');

      this.ui.password.attr('placeholder', 'Password');
      this.ui.password.val('');
      this.ui.password.removeClass('help-error');
    },

    displayError: function(error, elt, placeholder){
      if(error){
        elt.addClass('help-error');
        elt.val(placeholder);
      } else {
        elt.removeClass('help-error');
      }
    },

    displayPwdError: function(error, elt, placeholder){
      if(error){
        elt.addClass('help-error');
        elt.val('');
        elt.attr('placeholder', 'Invalid password');
      }
    },

    shake: function() {
      this.focus();
      $('.login-form').addClass('animated shake');
      setTimeout(function() {
        $('.login-form').removeClass('animated shake');
      }, 1000);
    },

    focus: function() {
      $('#UNportal').focus();
    }
  });
});
