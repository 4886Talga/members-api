  const links = [];

  const socialsLinks = ['Twitter', 'GitHub', 'LinkedIn'];

  let rundomNumberOfElem = Math.floor(Math.random() * 3) + 1;
  console.log(rundomNumberOfElem);

  for(let i = 0; i < rundomNumberOfElem; i++) {
    links.push(socialsLinks[i]);
  }
  
  module.exports = links;