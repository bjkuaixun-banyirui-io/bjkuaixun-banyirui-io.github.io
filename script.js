// 初始化帖子数据（存在浏览器里，刷新不消失）
let posts = JSON.parse(localStorage.getItem('banjiu_posts')) || [];
let currentTab = 'all';

// 页面加载时渲染帖子
window.onload = function() {
    renderPosts();
};

// 渲染帖子列表
function renderPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';

    // 按分类过滤帖子
    let filteredPosts = posts;
    if (currentTab === 'hot') {
        filteredPosts = [...posts].sort((a, b) => b.likes - a.likes);
    } else if (currentTab !== 'all') {
        filteredPosts = posts.filter(p => p.category === currentTab);
    }

    if (filteredPosts.length === 0) {
        postsList.innerHTML = '<div class="empty-tip">还没有帖子，快来发布第一条吧！</div>';
        return;
    }

    filteredPosts.forEach(post => {
        post.views++; // 每次渲染浏览数+1
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <span class="post-author">${post.author || '匿名用户'}</span>
                <span class="post-time">${post.time}</span>
                <span class="post-category">${post.category === 'campus' ? '校园' : '生活'}</span>
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

    localStorage.setItem('banjiu_posts', JSON.stringify(posts));
}

// 按分类过滤帖子
function filterPosts(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderPosts();
}

// 点赞功能
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('banjiu_posts', JSON.stringify(posts));
        renderPosts();
    }
}

// 登录按钮（先做个空的，后面再加功能）
function toggleLogin() {
    alert('登录功能正在开发中，先发布帖子试试吧！');
}
