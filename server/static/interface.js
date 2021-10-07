"use strict"

let positions = {
    "position1": {
        "node_name": "Balkongen",
        "type": "temp-hum",
        "values": {},
        "elementId": "foo1"
    },
    "position2": {
        "node_name": "Bastu",
        "type": "temp-hum",
        "values": {},
        "elementId": "foo2"
    },
    "position3": {
        "node_name": "Inne",
        "type": "temp-hum",
        "values": {},
        "elementId": "foo3"
    },
    "position4": {
        "node_name": "Tid",
        "type": "time",
        "values": ["1.1.1970", "00:00", "Mån"],
        "elementId": "foo4"
    },
}

const getAllReadings = async (url) => {
    const r = await fetch(`${url}/sensors`);
    const resString = await r.text();
    const res = JSON.parse(resString);
    //console.log("getAllReadings: Got response: ", res);

    return res;
}

//   document.querySelector(".position1").innerHTML = `${res.node_name}<br/>${res.temperature}° C<br/> ${res.humidity}%`;



const createTempCard = async (reading, id) => {
    // In another universe, a setInterval could be used to read the latest value from a global readings object

    const cardDiv = document.createElement("div");
    cardDiv.className = id;
    cardDiv.classList.add(["kurwa"]);
    const temp = document.createElement("span");
    temp.className = "temp";
    const hum = document.createElement("span");
    hum.className = "hum";
    const feels = document.createElement("span");
    feels.className = "feels";
    const title = document.createElement("div");
    title.classList.add("title");

    title.appendChild(document.createTextNode(reading.node_name));
    title.appendChild(document.createElement("br"));
    temp.appendChild(document.createTextNode(reading.values.temperature ? `🌡️${reading.values.temperature}°C` : "🌡️ -"));
    temp.appendChild(document.createElement("br"));
    hum.appendChild(document.createTextNode(reading.values.humidity ? `💦${reading.values.humidity}%` : "💦 -"));
    hum.appendChild(document.createElement("br"));
    feels.appendChild(document.createTextNode(`❄️4.20C`));
    feels.appendChild(document.createElement("br"));
    feels.appendChild(document.createTextNode(`🔥69.00C`));


    cardDiv.appendChild(title);
    cardDiv.appendChild(temp);
    cardDiv.appendChild(hum);
    cardDiv.appendChild(feels);

    return cardDiv;
}

const createCO2Card = async (reading) => {
    return document.createTextNode("Co2")
}

const createTimeCard = async () => {
    const d = new Date().toLocaleString().split(",");
    console.log("Date:", new Date().toLocaleString().split(","));
    const time = document.createElement("div");
    const title = document.createElement("div");
    title.classList.add("title");
    title.appendChild(document.createTextNode("Time"));
    time.appendChild(title);
    time.appendChild(document.createTextNode(`${d[1].slice(0,6)}`));
    time.appendChild(document.createElement("br"));
    time.appendChild(document.createTextNode(`${d[0].slice(0,5)}`));
    return time;

}


const insert = async (position, reading) => {
    let el;

    switch (reading.type) {
        case "temp-hum":
            el = await createTempCard(reading, `${position}-temp`);
            break;
        case "co2":
            el = await createCO2Card(reading, `${position}-co2`);
            break;
        case "time":
            el = await createTimeCard();
            break;
    }

    const parent = document.querySelector(`.${position}`);
    while (parent.firstChild && !parent.firstChild.className?.includes("updated")) {
        parent.removeChild(parent.firstChild);
    }

    parent.appendChild(el);
    parent.insertBefore(el, el.previousElementSibling);
}

const formatReadings = async (readings) => {
    // if key == "temperature" add "° C" etc...


    // return formattedObj
}

const placeIntoPositionsObj = async (readings, pos) => {
    for (const [key, value] of Object.entries(pos)) {
        // console.log(readings[value.node_name], " ", Boolean(readings[value.node_name]));
        if (readings[value.node_name]) {
            pos[key].values = { ...readings[value.node_name] }
            delete pos[key].values.node_name;
        }
    }

    return pos;
}

const loop = async () => {
    const readings = await getAllReadings("http://91.153.75.77:5454");
    // console.log("Got readings:", readings);

    positions = await placeIntoPositionsObj(readings, positions);
    // console.log("Positions after being placed: ", positions);

    for (const [position, values] of Object.entries(positions)) {
        insert(position, values);
    }

    document.querySelector("#updatedAt").innerHTML = readings.updated;
}

const requestFullscreen = async (target) => {
    if (target.requestFullscreen) {
        target.requestFullscreen();
    }
    if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
    }
    if (target.msRequestFullscreen) {
        target.msRequestFullscreen();
    }
}

const main = async () => {
    //await requestFullscreen(document.querySelector(".grid-container"));
    loop();
    setInterval(() => {
        loop();
    }, 2000);

}

main();

// requestFullscreen must be a user interaction, thus a click eventlistener
document.querySelector(".position1").addEventListener("click", async (e) => {
    await requestFullscreen(document.querySelector(".grid-container"));
});