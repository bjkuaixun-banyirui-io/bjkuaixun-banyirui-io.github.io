// 初始化帖子数据（刷新也不会丢）
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function addPost() {
    const username = document.getElementById('username').value || '匿名用户';
    const content = document.getElementById('postContent').value;
    if (!content) return alert('请输入内容！');

    // 新建帖子，加上时间、浏览数、点赞数
    const newPost = {
        id: Date.now(),
        author: username,
        content: content,
        views: 0,
        likes: 0,
        time: new Date().toLocaleString()
    };

    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();

    // 清空输入框
    document.getElementById('username').value = '';
    document.getElementById('postContent').value = '';
}

// 渲染帖子列表
function renderPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';

    posts.forEach(post => {
        post.views++; // 每次渲染，浏览数+1
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <span class="post-author">${post.author}</span>
                <span class="post-time">${post.time}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-stats">
                <span>👁️ ${post.views} 围观</span>
                <span>👍 ${post.likes}</span>
                <button onclick="likePost(${post.id})">点赞</button>
            </div>
        `;
        postsList.appendChild(postDiv);
    });

    localStorage.setItem('posts', JSON.stringify(posts));
}

// 点赞功能
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

// 页面加载时自动渲染帖子
window.onload = renderPosts;
