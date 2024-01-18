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
    const res = await fetch(API + `/${username}/repos`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;

  const userData = await getUserInfo(username);
  const repoData = await getAllRepos(username);

  console.log(userData);
  console.log(repoData);
});
