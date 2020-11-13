import appModule from '../../app.module';

appModule
  .component('myNavbar', {
    templateUrl: '/src/components/navbar/navbar.html',
    bindings: {
      loggedIn: '<',
    },
  });
