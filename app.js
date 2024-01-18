const API = 'https://api.github.com/users';

const getUserInfo = async (username) => {
  try {
    const res = await fetch(API + `/${username}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllRepos = async (username) => {
  try {
    const res = await fetch(API + `/${username}/repos?per_page=6`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const showRepos = (repos) => {
  const repoListDiv = document.getElementById('repo-list');

  repoListDiv.innerHTML = '';

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const topicList = repo.topics;

    const topicListDiv = document.createElement('ul');
    topicListDiv.className = 'repo-topic-list';

    topicList.map((topic) => {
      const repoItemDiv = document.createElement('li');
      repoItemDiv.innerHTML = topic;
      repoItemDiv.className = 'repo-topic-item';

      topicListDiv.appendChild(repoItemDiv);
    });

    // console.log(topicListDiv);

    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo';

    repoDiv.innerHTML = `
      <h3 class="repo-name">
        <a href="${repo.url}" target="_blank">${repo.name}</a>
      </h3>
      <p>${repo.description}</p>
    `;

    repoDiv.appendChild(topicListDiv);

    // console.log(repoDiv);
    repoListDiv.appendChild(repoDiv);
  }
};

const showUser = (user) => {
  const userImgDiv = document.getElementById('user-img-section');
  userImgDiv.innerHTML = '';
  // img
  const userImg = document.createElement('img');
  userImg.className = 'user-img';
  userImg.src = user.avatar_url;

  userImgDiv.appendChild(userImg);

  // name
  const userDescDiv = document.getElementById('user-desc');
  userDescDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p>${user.bio}</p>

    <p>${user.location}</p>
    <p><b>Twitter: </b>https://twitter.com/${user.twitter_username}</p>
  `;

  const githubURL = document.getElementById('github-url');
  githubURL.innerHTML = '';
  const url = document.createElement('a');
  url.href = user.html_url;
  url.innerHTML = user.html_url;
  githubURL.appendChild(url);

  // console.log(githubURL);
};

const form = document.getElementById('form');
const initialUI = document.querySelector('.initial');
const loadingUI = document.querySelector('.loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  loadingUI.style.display = 'flex';

  const username = document.getElementById('username').value;

  const userData = await getUserInfo(username);
  const repoData = await getAllRepos(username);

  // console.log(userData);
  // console.log(repoData);

  initialUI.style.display = 'none';
  loadingUI.style.display = 'none';

  showUser(userData);
  showRepos(repoData);
});
