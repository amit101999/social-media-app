{let e=function(){let e=$("#new-post-form");e.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(e){let o=t(e.data.post,e.data.user);$("#posts-list-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(e.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},t=function(e,t){return $(`\n    <li id="post-${e._id}">\n    <div id="user-post">\n      <div>\n        <div id="user-name">\n          Posted By:\n          <a  href="/user/profile/${t._id}" >${t.name}</a>\n        </div>\n        <div class="user-content">\n          <p>\n            ${e.content}\n          </p>\n          <div>\n        <a\n          class="toggle-like-button"\n          data-likes="${e.likes.length}"\n          href="/likes/toggle/?id=${e._id}&type=Post"\n          >Likes : ${e.likes.length} \n        </a>\n      </div>\n      <div class="delete-post">\n        <a class="delete-post-button" href="/posts/delete/${e._id}"\n          >Delete</a\n        >\n      </div>\n        </div>\n  \n        <div class="post-comments">\n          \x3c!-- let's give an id to the new comment form, we'll also need to make the same changes in home_posts.js where we're adding a post to the page --\x3e\n          <form\n            id="post-${e._id}-comments-form"\n            action="/comment/create"\n            method="POST"\n          >\n            <input\n              type="text"\n              name="content"\n              placeholder="Aapki Tipdi.."\n              required\n            />\n            <input type="hidden" name="post" value="${e._id}" />\n            <input id="comment-btn" type="submit" value="Post comment" />\n          </form>\n  \n  \n          <div class="post-comments-list">\n            <ul id="post-comments-${e._id}">\n             \n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </li>`)},n=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#post-${e.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let e=$(this),t=$(" .delete-post-button",e);n(t);let o=e.prop("id").split("-")[1];new PostComments(o)}))};e(),o()}