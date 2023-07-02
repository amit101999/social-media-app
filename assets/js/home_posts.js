{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post, data.data.user);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          // call the create comment class
          new PostComments(data.data.post._id);
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post, user) {
    return $(`
    <li id="post-${post._id}">
    <div id="user-post">
      <div>
        <div id="user-name">
          Posted By:
          <a>${user}</a>
        </div>
        <div class="user-content">
          <p>
            ${post.content}
          </p>
          <div>
        <a
          class="toggle-like-button"
          data-likes="${post.likes.length}"
          href="/likes/toggle/?id=${post._id}&type=Post"
          >Likes : ${post.likes.length} 
        </a>
      </div>
      <div class="delete-post">
        <a class="delete-post-button" href="/posts/delete/${post._id}"
          >Delete</a
        >
      </div>
        </div>
  
        <div class="post-comments">
          <!-- let's give an id to the new comment form, we'll also need to make the same changes in home_posts.js where we're adding a post to the page -->
          <form
            id="post-${post._id}-comments-form"
            action="/comment/create"
            method="POST"
          >
            <input
              type="text"
              name="content"
              placeholder="Aapki Tipdi.."
              required
            />
            <input type="hidden" name="post" value="${post._id}" />
            <input id="comment-btn" type="submit" value="Post comment" />
          </form>
  
  
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  </li>`);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
