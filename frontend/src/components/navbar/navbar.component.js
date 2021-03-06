import appModule from '../../app.module';

function navbarController(sessionService, $location) {
  this.logout = () => {
    sessionService.save('loggedIn', false);
    sessionService.save('userId', undefined);
    $location.path('/home');
  };
}

appModule
  .component('myNavbar', {
    templateUrl: '/src/components/navbar/navbar.html',
    bindings: {
      loggedIn: '<',
    },
    controller: ['sessionService', '$location', navbarController],
  });
