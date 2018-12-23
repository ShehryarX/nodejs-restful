// using callbacks
const getUser = id => {
  return new Promise((resolve, reject) => {
    // kick off async work
    setTimeout(() => {
      console.log("Reading a user from database");
      resolve({
        id,
        gitHubUsername: "ShehryarX"
      });
    }, 2000);
  });
};
// console.log("before");
const getRepositories = name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
};
getUser(1, user => {
  console.log(user);
  const repos = getRepositories("shehryar", repos => {
    console.log(repos);
  });
});

// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(res => getCommits(repos[0]))
//   .then(commits => console.log(commits))
// .catch(err => console.log(err));
// problems: callback hell

// methods:
// callbacks
// getUser(1).then(res => console.log(res));
// console.log("after");

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);

    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}

displayCommits();
