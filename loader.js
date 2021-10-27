const handledata = data => {
    const parsed = JSON.parse(data);

    if (document.getElementById("content")){
        document.getElementById("content").remove();
    }

    let box = document.createElement("div");
    box.id = "content";
    document.body.appendChild(box);

    let avatar = document.createElement("img");
    avatar.src = parsed.avatar;
    avatar.align = "right";
    box.appendChild(avatar);

    let name = document.createElement("h1");
    name.innerHTML = parsed.name;
    box.appendChild(name);

    let link = document.createElement("a");
    link.href = parsed.site[1];
    link.innerHTML = parsed.site[0];
    box.appendChild(link);

    let dc = document.createElement("div");
    dc.id = "desc";
    box.appendChild(dc);
    
    let text = document.createElement("p");
    text.innerHTML = parsed.description;
    dc.appendChild(text);

    let infobox = document.createElement("div");
    infobox.id = "info";
    box.appendChild(infobox);

    let out = "";
    for (let i = 0; i < parsed.info.length; i++){
        out += `<div class="info-section">
        <b>${parsed.info[i][0]}:</b> ${parsed.info[i][1]}
        </div>`;
        out += "\n";
    }

    infobox.innerHTML = out;
}

const openFile = fname => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200){
            handledata(xhr.responseText);
        }
    }
    xhr.open("GET", `/userwiki/files/${fname}`);
    xhr.send();
}

const updateList = data => {
    const parsed = JSON.parse(data);
    const s = document.getElementById("users");
    for (let i = 0; i < parsed.length; i++){
        let o = document.createElement("option");
        o.value = parsed[i][1];
        o.innerHTML = parsed[i][0];
        s.appendChild(o);
    }
}

window.onload = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200){
            updateList(xhr.responseText);
        }
    }
    xhr.open("GET", "/userwiki/list.json");
    xhr.send();
    document.getElementById("users").onchange = ()=>{
        openFile(document.getElementById("users").value);
    }
    openFile("greenman.json");
}