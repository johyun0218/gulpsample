'use strict';

import _ from 'lodash';

export default class CasesController {
  showcaseInfo = {};
  commentList = [];
  newComment = '';
  errors = {
    delcomment: undefined
  };
  currentUser = undefined;
  InfoPromise = undefined;
  CommentPromise = undefined;

  delay = 0;
	minDuration = 0;
	message = 'Please Wait...';
	backdrop = true;
	templateUrl = '';

  /*@ngInject*/
  constructor($scope, $stateParams, Showcase, Auth) {
    //console.log($stateParams);
    this.$stateParams = $stateParams;
    this.Showcase = Showcase;
    //this.Auth = Auth;

    this.currentUser = Auth.getCurrentUserSync();

    window.localStorage.setItem('showcase', $stateParams.showcaseId);

  }

  $onInit() {

    this.InfoPromise = this.Showcase.getInfo({id: this.$stateParams.showcaseId})
      .then(function(response) {
        //console.log(response.data);
        this.showcaseInfo = response.data;
      }.bind(this));

      this.getComments();
  }

  getComments() {

    this.CommentPromise = this.Showcase.getComments({
                            id: this.$stateParams.showcaseId, 
                            count: 10,
                            cursor: ''})
      .then(function(response) {
        this.commentList = response.data;
      }.bind(this));
  }

  addComment() {
    if (this.newComment) {
      this.CommentPromise = this.Showcase.addComment({
        id: this.$stateParams.showcaseId,
        value: this.newComment
      })
      .then(function(response) {
        //console.log(response.data);
        // comment_id 값으로 dummy 생성
        var comment = {id: response.data.comment_id};
        comment.commented_at = new Date();
        comment.author = this.currentUser.user;
        comment.comment_text = {elements: [{type: 'Text', value: this.newComment}]};
        this.commentList.unshift(comment);
        this.newComment = '';
        this.showcaseInfo.comments.count = this.showcaseInfo.comments.count + 1;
      }.bind(this));
    }
  }

  deleteComment(comment) {

    this.commentList = _.without(this.commentList, _.find(this.commentList, {
      id: comment.id
    }));

    this.showcaseInfo.comments.count = this.showcaseInfo.comments.count - 1;

    this.CommentPromise = this.Showcase.deleteComment({
      id: this.$stateParams.showcaseId,
      commentId: comment.id
    })
    .then(function(response) {
      //console.log(response.data);
      //this.getComments();
    }.bind(this))
    .catch(function(err) {
      this.errors.delcomment = err.data.message;
    }.bind(this));
  }
}
