const root = process.env.SERVER_URL || 'http://127.0.0.1:8080'
const fetch = require("node-fetch")
const assignmentRoot = root+'/api/assignmentload/'

const assignment_post =  {
    "matricola": "178131.1",
    "github": "github_link.1",
    "heroku": "heroku_link.1",
    "apiary": "apiary_link.1"
}


fetch(assignmentRoot, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(assignment_post)
});


fetch(assignmentRoot, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(function(res) {
    return res.json();
})
.then(function(json) {
    console.log(json);
});
