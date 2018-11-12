describe('Zoolander Tracking Module', () => {
  it('is defined', () => {
    expect(Zoolander.Tracking).to.not.be.undefined;
  });

  describe('tracking', () => {
    beforeEach(() => {
      $('body').html('');
      window.dataLayer = [];
    });

    // call clicks
    it('should track call clicks', () => {
      $('body').append('<a class="track-ceilingCall">Call</a>')
        .append('<a class="track-pageCall">In-Page Call</a>');
      Zoolander.Tracking.init();

      $('.track-ceilingCall').trigger('click');
      let expected = {
        event: 'rs.call_click',
        eventCategory: 'Infinity Tracking Triggers',
        eventAction: 'Call Click CTA - Eyebrow',
        eventLabel: 'http://localhost:9876/context.html',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(window.dataLayer.pop(), 'to include ceiling call event').to.eql(expected);

      $('.track-pageCall').trigger('click');
      expected = {
        event: 'rs.call_click',
        eventCategory: 'Infinity Tracking Triggers',
        eventAction: 'Call Click CTA - Page',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(window.dataLayer.pop(), 'to include page call event').to.eql(expected);
    });

    // login clicks
    it('should track login clicks', () => {
      $('body').append('<a class="track-loginMyRack">MyZoolander Portal</a>')
        .append('<a class="track-loginFaws">FAWS</a>')
        .append('<a class="track-loginApps">Apps</a>')
        .append('<a class="track-loginCloudOffice">Cloud Office</a>')
        .append('<a class="track-loginOnePortal">Login One</a>')
        .append('<a class="track-loginCloudCp">Cloud Control Panel</a>')
        .append('<a class="track-loginGcp">GCP Login</a>');
      Zoolander.Tracking.init();

      $('.track-loginMyRack').trigger('click');
      let expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://my.rackspace.com/portal/auth/login',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.deep.eql(window.dataLayer.pop());

      $('.track-loginApps').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://apps.rackspace.com/',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.deep.eql(window.dataLayer.pop());

      $('.track-loginFaws').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://manage.rackspace.com/aws',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.deep.eql(window.dataLayer.pop());

      $('.track-loginCloudOffice').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://cp.rackspace.com/',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());

      $('.track-loginCloudCp').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://mycloud.rackspace.com/',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());

      $('.track-loginGcp').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://manage.rackspace.com/gcp',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());

      $('.track-loginOnePortal').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Login',
        eventAction: 'Click',
        eventLabel: 'https://login.rackspace.com/',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());
    });

    // cta clicks
    it('should track form cta clicks', () => {
      $('body').append('<a class="track-ceilingEmail">Email</a>')
        .append('<a class="track-secondCTA">Secondary CTA</a>')
        .append('<a class="track-subnavEmail">Subnav CTA</a>')
        .append('<a class="track-pageEmail">In-Page CTA</a>');
      Zoolander.Tracking.init();

      $('.track-ceilingEmail').trigger('click');
      let expected = {
        event: 'ga.event',
        eventCategory: 'Site Submission',
        eventAction: 'Form Click CTA - Eyebrow',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      const result = window.dataLayer.pop();
      expect(expected, '.track-ceilingEmail').to.eql(result);

      $('.track-secondCTA').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Site Submission',
        eventAction: 'Form Click CTA - Secondary CTA',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());

      $('.track-subnavEmail').trigger('click');
      expected = {
        event: 'rs.form_click',
        eventCategory: 'Site Submission',
        eventAction: 'Form Click CTA - Subnav',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());

      $('.track-pageEmail').trigger('click');
      expected = {
        event: 'rs.form_click',
        eventCategory: 'Site Submission',
        eventAction: 'Form Click CTA - Page',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());
    });

    it("should track 'back to top' clicks", () => {
      $('body').append('<a class="track-backToTop">Back To Top</a>');
      Zoolander.Tracking.init();

      $('.track-backToTop').trigger('click');
      const expected = {
        event: 'ga.event',
        eventCategory: 'Page-Level Interactions',
        eventAction: 'Click Back to Top',
        eventLabel: window.location.href,
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());
    });

    it('should track signup CTA clicks', () => {
      $('body').append('<a class="track-signupCTA" href="https://cart.rackspace.com">Sign Up</a>');
      Zoolander.Tracking.init();

      $('.track-signupCTA').trigger('click');
      const expected = {
        event: 'ga.event',
        eventCategory: 'Signup',
        eventAction: 'Signup Click CTA',
        eventLabel: 'https://cart.rackspace.com',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());
    });

    it('should track resource clicks', () => {
      $('body').append('<a class="track-cta" href="https://rackspace.com">View Resource</a>');
      Zoolander.Tracking.init();

      $('.track-cta').trigger('click');
      const expected = {
        event: 'cta.click',
        eventCategory: 'CTA',
        eventAction: 'CTA Click',
        eventLabel: 'View Resource',
        eventValue: '0',
        eventNonInteraction: 0,
      };
      expect(expected).to.eql(window.dataLayer.pop());
    });

    it('should track internal nav clicks', () => {
      const linkHtml = '<div class="navbar-menuContainer" id="main-navigation"><ul class="top-nav">' +
          '<li class="item-i"><span class="navbar-topLink">Top lvl first</span></li> ' +
          '<li class="item-ii"><span class="navbar-topLink">Top lvl second</span>' +
            '<ul class="mid-nav">' +
              '<li class="item-a"><a class="navbar-dropDownLink">Mid lvl first</a></li>' +
              '<li class="item-b"><span id="midlvl">Mid lvl second</span>' +
                '<ul class="third-nav">' +
                  '<li class="item-1">Base lvl first</li>' +
                  '<li class="item-2"><a class="navbar-tertiary-dropDownLink">Base lvl second</a></li>' +
                  '<li class="item-3">Base lvl third</li>' +
                '</ul>' +
              '</li>' +
              '<li class="item-c">Mid lvl third</li>' +
            '</ul>' +
          '</li>' +
          '<li class="item-iii"><a class="navbar-topLink">Top lvl third</a></li>' +
        '</ul>' +
      '</div>';

      $('body').append(linkHtml);
      Zoolander.Tracking.init();

      // click base level
      $('.item-2 .navbar-tertiary-dropDownLink').trigger('click');
      let expected = {
        event: 'ga.event',
        eventCategory: 'Internal Links',
        eventAction: 'Link Click - Navigation',
        eventLabel: 'Top lvl second:Mid lvl second:Base lvl second',
        eventValue: 0,
        eventNonInteraction: 0,
      };
      let result = window.dataLayer.pop();
      expect(expected, 'base lvl click').to.deep.eql(result);

      // click mid level
      $('.item-a .navbar-dropDownLink').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Internal Links',
        eventAction: 'Link Click - Navigation',
        eventLabel: 'Top lvl second:Mid lvl first',
        eventValue: 0,
        eventNonInteraction: 0,
      };
      result = window.dataLayer.pop();
      expect(expected, 'Mid lvl click').to.deep.eql(result);

      // click mid level span non link
      $('.item-b').trigger('click');
      let expectLength = 0;
      result = window.dataLayer.length;
      expect(expectLength, 'datalayer length').to.eql(result);

      // click top level link
      $('.item-iii .navbar-topLink').trigger('click');
      expected = {
        event: 'ga.event',
        eventCategory: 'Internal Links',
        eventAction: 'Link Click - Navigation',
        eventLabel: 'Top lvl third',
        eventValue: 0,
        eventNonInteraction: 0,
      };
      result = window.dataLayer.pop();
      expect(expected, 'top lvl click').to.deep.eql(result);

      // click top level menu item
      $('.item-ii').trigger('click');
      expectLength = 0;
      result = window.dataLayer.length;
      expect(expectLength, 'datalayer length').to.eql(result);
    });

    it('should track resource filtering products', () => {
      $('body').append('<form class="rsFilter-form"><select name="product"><option value="96" selected="selected">Public Cloud</option><option value="101">-Fanatical Support for AWS</option><input type="checkbox" name="content_type[]" id="edit-content-type-case-study" value="case_study" checked="checked" class="rsFilter-checkbox"><input type="checkbox" name="content_type[]" id="edit-content-type-code-repository" value="code_repository" class="rsFilter-checkbox"><input type="checkbox" name="content_type[]" id="edit-content-type-ebook" value="ebook" checked="checked" class="rsFilter-checkbox"></form>');
      Zoolander.Tracking.init();

      $('form.rsFilter-form').trigger('submit');
      const expected = [{
        event: 'ga.event',
        eventCategory: 'Resource Center',
        eventAction: 'Resource Center Filter - Product',
        eventLabel: 'Public Cloud',
        eventValue: '0',
        eventNonInteraction: 0,
      },
      {
        event: 'ga.event',
        eventCategory: 'Resource Center',
        eventAction: 'Resource Center Filter - Type',
        eventLabel: 'case_study:ebook',
        eventValue: '0',
        eventNonInteraction: 0,
      }];
      expect(expected).to.eql(window.dataLayer);
    });
  });
});
