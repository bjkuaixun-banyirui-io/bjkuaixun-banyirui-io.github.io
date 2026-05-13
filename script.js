function addPost() {
    const username = document.getElementById('username').value || '匿名用户';
    const content = document.getElementById('postContent').value;
    if (!content) return alert('请输入内容！');

    const postsList = document.getElementById('postsList');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <div class="post-author">${username}</div>
        <div class="post-content">${content}</div>
    `;
    postsList.prepend(postDiv);

    // 清空输入框
    document.getElementById('username').value = '';
    document.getElementById('postContent').value = '';
}
