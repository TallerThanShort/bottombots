const firebaseConfig = {
    apiKey: "AIzaSyAV1jnqT5r1xKYaW_z1c_M7rp8rWiMC3A8",
    authDomain: "bottombots.xyz",
    projectId: "bottom-bots",
    storageBucket: "bottom-bots.appspot.com",
    messagingSenderId: "759946456504",
    appId: "1:759946456504:web:d5e5eacfa53d9ef43ab34d"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

if(localStorage.getItem("username") != null){
    document.getElementById("owner_name").value = localStorage.getItem("username")+"#"+localStorage.getItem("discriminator");
} else{
    document.getElementById("flow").innerHTML = `<h3 style="color: crimson; cursor: pointer;" onclick="location.href = '/'">You Must Log In First To Perform This Action</h3>`
}
function addServFlow() {
    const server_id = document.getElementById("id").value;
    const server_name = document.getElementById("name").value;
    const invitelonk = document.getElementById("invite").value;
    const owner_nemo = document.getElementById("owner_name").value;
    const pidid = document.getElementById("tagz").value;
    let wid = '979794969600610354'
    let woken = 'vz2roCCDQRwXHO0jqVcHk_NIiBJ6Oqqjb8HXon5EdL8akVmMfzqd4Gt5n-NsueukS58o'

    if(invitelonk === ""){
        window.alert("You need to fill in all the details in the correct fields")
    } else if(server_name === ""){
        window.alert("You need to fill in all the details in the correct fields")
    } else{
        const loginVal = `https://discord.com/api/webhooks/${wid}/${woken}`
        
        var request = new XMLHttpRequest();
            
        request.open("POST", loginVal);
        try {
            if(loginVal == "") throw "empty";
        }
        catch(err) {
            window.alert("Webhook: " + err);
        }
        request.setRequestHeader('Content-type', 'application/json');
        var params = {
            username: "refactored rotary logger",
            avatar_url: "https://cdn.discordapp.com/avatars/967116498290217010/79f1fad9d30192caa2f787ad06ecbc60.webp",
            content: `<@!${localStorage.getItem('log_id')}> added ${document.getElementById("name").value}`,
            embeds: [
                {
                    "author": {
                        "name": `${server_name} has been added to Bottom!`,
                        "url": "https://bottombots.xyz/servers",
                        "icon_url": "https://tallerthanshort.github.io/ut3.ggpht/icons/Bottom_new.png"
                    }
                }
            ]
        }
        request.send(JSON.stringify(params))
        db.collection('servers').doc(server_id).set({
            id: server_id,
            name: server_name,
            owner_name: owner_nemo,
            invite: invitelonk,
            banner: "https://tallerthanshort.github.io/ut3.ggpht/banners/3gqmGut6otkNN_2j6p3f65Xm5DvWxOEx4S2IfxOQiXQ.png",
            profile_image: "https://tallerthanshort.github.io/ut3.ggpht/icons/Bottom_new.png",
            tags: pidid
        })
        .then(
            document.getElementById("flow").innerHTML = `<h3 style="color: lime">${server_name} was added succesfully!</h5>`
        )
    }
}

window.onload = () => {
    const query = new URLSearchParams(window.location.search.slice(1));
    const [code, guild_id, state, userID] = [query.get('code'), query.get('guild_id'), localStorage.getItem('state'), localStorage.getItem('log_id')];
    if(code != null){
        document.getElementById("id").value = `${guild_id}`;
        document.getElementById('stepone').style.display = `none`;
        document.getElementById('steptwo').style.display = `block`;
    } else{
        document.getElementById('stepone').style.display = `block`;
        document.getElementById('steptwo').style.display = `none`;
    }


const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`
if(state, userID != null){
let html = `
<div class="dropdown">
    <span class="dropbtn">${loggedAs}</span>
        <div class="dropdown-content">
        <a href="/bots/add">Add a Bot</a>
        <a href="/servers/add">Add a Server</a>
        <a style="cursor: pointer;" onclick="logout()">Log Out</a>
    </div>
</div>
`
document.getElementById('navbarthings').innerHTML += html;
} else{
    document.getElementById('navbarthings').innerHTML += `<span class="link-1naFFL link-2eyudH" onclick="document.location.href = 'https://discord.com/api/oauth2/authorize?client_id=914396590901452820&redirect_uri=http%3A%2F%2Fbottombots.xyz%2Fauth&response_type=token&scope=identify%20email&state=${localStorage.getItem('oauth-state')}';">Log In</span>`
}
}