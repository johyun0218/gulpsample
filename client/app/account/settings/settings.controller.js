'use strict';

export default class SettingsController {

  errors = {
    other: undefined
  };
  message = '';
  submitted = false;


  /*@ngInject*/
  constructor(Auth, User, Upload, Facebook, $window) {
    this.Auth = Auth;
    this.me = Auth.getCurrentUserSync();
    this.Upload = Upload;
    this.Facebook = Facebook;
    this.$window = $window;

    //console.log(this.Facebook);
  }

  inviteFacebook() {
    
    this.$window.fbAsyncInit();

    this.Facebook.geMyFriends();
  }


  changeUserName(form) {
    this.submitted = true;
    if(form.$valid) {
      this.Auth.changeUsername(this.me.user.username)
        .then(() => {
          this.message = 'User Name successfully changed.';
        })
        .catch((err) => {
          form.username.$setValidity('mongoose', false);
          this.errors.other = err.data.message;
          this.message = '';
        });
    }
  }

  uploadProfile(file) {
    this.Upload.upload({
        url: '/api/users/me/update-profile-photo',
        data: {file: file}
    }).then(function (resp) {
        this.message  = 'Success ' + resp.config.data.file.name;
        this.me = this.Auth.getCurrentUserSync();
    }.bind(this), function (resp) {
        console.log('Error status: ' + resp.status);
        form.profile.$setValidity('mongoose', false);
        this.errors.other = 'Upload fail';
        this.message = '';
    }.bind(this), function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  }
}
