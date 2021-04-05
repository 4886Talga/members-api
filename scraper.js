const axios = require('axios');
const cheerio = require('cheerio');
const  links = require('./links');
const fs = require('fs');

const siteUrl = "https://tretton37.com/meet";


const rndLinks = () => {
    const links = [];

    const socialsLinks = ['Twitter', 'GitHub', 'LinkedIn'];

    let rundomNumberOfElem = Math.floor(Math.random() * 3) + 1;

    for(let i = 0; i < rundomNumberOfElem; i++) {
     links.push(socialsLinks[i]);
    };

    return links;
}


const fetchData = async () => {
    const result = await axios.get(siteUrl);
    const $ = cheerio.load(result.data);
    let members = [];

    $(".ninja-summary > .contact-info > h1 > a").each((index, element) => {
      let member = {
                name: "",
                office: "",
                contact: [],
                image: ""
            };
            member.name = $(element.firstChild).text();
            member.office = $(element.lastChild).text();
            member.image = $(".ninja-summary > a > img").attr('src');
             member.contact = rndLinks();
             members.push(member);
    });
    
    return members;
};

// const extractMembersData = async () => {
//   const $ = await fetchData();
//   let members = [];
 
//   $(".ninja-summary > .contact-info > h1 > a").each((index, element) => {
//       let member = {
//           name: "",
//           office: "",
//           contact: [],
//           image: ""
//       };
//       member.name = $(element.firstChild).text();
//       member.office = $(element.lastChild).text();
//       member.image = $(".ninja-summary > a > img").attr('src');
//       member.contact = rndLinks();
//       members.push(member);
//     });
//     return 'members';
    
//   };


exports.fetchData = fetchData;
  