const p = new Promise((resolve, reject) => {
  // to async work
  // resolve(1);
  setTimeout(() => {
    // resolve(1);
    reject(new Error("message"));
  }, 2000);
});

p.then(result => console.log(result)).catch(e => console.log(e.message));
