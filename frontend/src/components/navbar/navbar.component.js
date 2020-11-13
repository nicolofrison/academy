import appModule from '../../app.module';

appModule
  .component('myNavbar', {
    templateUrl: '/app/components/navbar/navbar.html',
    bindings: {
      loggedIn: '<',
    },
  });
