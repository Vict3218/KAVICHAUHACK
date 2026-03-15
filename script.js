const countryData = {
    "France": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [224.33, 186.85, 186.93, 156.79, 152.92, 154.28, 165.95, 157.71, 160.53, 173.82, 195.25, 220.23],
        topSources: [
            { name: "Nuclear", value: 1485.69 },
            { name: "Wind Onshore", value: 171.68 },
            { name: "Hydro Ror", value: 151.08 },
            { name: "Solar", value: 121.05 }
        ],
        total: 2135.60
    },

    "Netherlands": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [43.74, 42.68, 41.70, 35.82, 35.77, 32.82, 36.81, 38.75, 37.27, 39.14, 44.11, 46.29],
        topSources: [
            { name: "Other", value: 173.23 },
            { name: "Fossil Gas", value: 125.99 },
            { name: "Wind Offshore", value: 62.64 },
            { name: "Hard Coal", value: 49.43 }
        ],
        total: 474.91
    },

    "Poland": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [63.06, 55.84, 55.69, 50.40, 49.38, 48.22, 50.12, 47.17, 48.80, 55.16, 54.73, 57.44],
        topSources: [
            { name: "Hard Coal", value: 208.77 },
            { name: "Lignite", value: 122.48 },
            { name: "Wind Onshore", value: 87.56 },
            { name: "Fossil Gas", value: 83.97 }
        ],
        total: 636.02
    },

    "Switzerland": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [5.10, 4.43, 4.25, 4.72, 4.83, 5.97, 5.10, 4.96, 4.72, 4.06, 4.05, 3.76],
        topSources: [
            { name: "Nuclear", value: 18.37 },
            { name: "Hydro Ror", value: 14.50 },
            { name: "Hydro Water Reservoir", value: 9.78 },
            { name: "Hydro Pumped Storage", value: 7.97 }
        ],
        total: 55.94
    },

    "Czech Republic": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [28.24, 26.89, 27.41, 23.43, 21.73, 18.06, 21.14, 22.79, 20.49, 23.67, 26.19, 25.67],
        topSources: [
            { name: "Nuclear", value: 121.15 },
            { name: "Lignite", value: 91.90 },
            { name: "Solar", value: 18.83 },
            { name: "Fossil Gas", value: 14.73 }
        ],
        total: 285.71
    },

    "Denmark": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [2.23, 1.96, 2.23, 4.92, 7.10, 7.02, 5.81, 6.31, 7.19, 8.33, 8.59, 9.01],
        topSources: [
            { name: "Wind Onshore", value: 27.52 },
            { name: "Wind Offshore", value: 18.48 },
            { name: "Solar", value: 10.67 },
            { name: "Biomass", value: 7.84 }
        ],
        total: 70.70
    },

    "Belgium": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [6.54, 6.35, 6.12, 5.43, 5.50, 5.50, 5.31, 5.32, 5.38, 5.51, 5.79, 6.20],
        topSources: [
            { name: "Nuclear", value: 22.63 },
            { name: "Fossil Gas", value: 12.70 },
            { name: "Solar", value: 10.20 },
            { name: "Other", value: 6.88 }
        ],
        total: 68.96
    },

    "Austria": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthly: [20.79, 18.44, 18.04, 19.68, 19.21, 19.80, 21.19, 20.34, 16.72, 19.10, 17.34, 17.06],
        topSources: [
            { name: "Hydro Ror", value: 96.47 },
            { name: "Wind Onshore", value: 34.17 },
            { name: "Fossil Gas", value: 29.26 },
            { name: "Solar", value: 22.66 }
        ],
        total: 227.71
    },

    "Germany": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        monthly: [169.68, 150.40, 151.01, 133.88, 138.01, 138.11, 134.39, 127.94, 138.07, 158.67, 60.14],
        topSources: [
            { name: "Wind Onshore", value: 347.71 },
            { name: "Solar", value: 283.74 },
            { name: "Lignite", value: 234.07 },
            { name: "Fossil Gas", value: 195.76 }
        ],
        total: 1500.29
    }
};

const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("status");
const selectedCountry = document.getElementById("selectedCountry");
const totalValue = document.getElementById("totalValue");
const peakMonth = document.getElementById("peakMonth");
const topSource = document.getElementById("topSource");
const monthlyChart = document.getElementById("monthlyChart");
const sourceList = document.getElementById("sourceList");
const countryList = document.getElementById("countryList");

let port;
let reader;

Object.keys(countryData).forEach(country => {
    const item = document.createElement("div");
    item.className = "country-item";
    item.id = `country-${country}`;
    item.textContent = country;
    item.addEventListener("click", () => updateCountry(country));
    countryList.appendChild(item);
});

connectButton.addEventListener("click", async () => {
    if (!("serial" in navigator)) {
        statusText.textContent = "Status: Web Serial is not supported in this browser.";
        return;
    }

    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        statusText.textContent = "Status: Connected to Arduino";

        const decoder = new TextDecoderStream();
        port.readable.pipeTo(decoder.writable);

        reader = decoder.readable.getReader();
        readSerialLoop();
    } catch (error) {
        console.error(error);
        statusText.textContent = "Status: Connection failed";
    }
});

async function readSerialLoop() {
    let buffer = "";

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += value;
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const raw of lines) {
                const line = raw.trim();

                if (line.startsWith("COUNTRY:")) {
                    const country = line.replace("COUNTRY:", "").trim();
                    updateCountry(country);
                }
            }
        }
    } catch (error) {
        console.error(error);
        statusText.textContent = "Status: Read error";
    }
}

function updateCountry(country) {
    const data = countryData[country];

    if (!data) {
        statusText.textContent = `Status: Received unknown country (${country})`;
        return;
    }

    document.querySelectorAll(".country-item").forEach(el => el.classList.remove("active"));
    const activeItem = document.getElementById(`country-${country}`);
    if (activeItem) activeItem.classList.add("active");

    selectedCountry.textContent = country;
    totalValue.textContent = `${data.total.toFixed(2)} TWh`;

    const maxMonthly = Math.max(...data.monthly);
    const peakIndex = data.monthly.indexOf(maxMonthly);
    peakMonth.textContent = `${data.months[peakIndex]} (${maxMonthly.toFixed(2)})`;

    topSource.textContent = data.topSources[0].name;

    renderMonthlyChart(data);
    renderSources(data);
    statusText.textContent = `Status: Showing ${country}`;
}

function renderMonthlyChart(data) {
    monthlyChart.innerHTML = "";
    const max = Math.max(...data.monthly);

    data.months.forEach((month, index) => {
        const group = document.createElement("div");
        group.className = "bar-group";

        const value = document.createElement("div");
        value.className = "bar-value";
        value.textContent = data.monthly[index].toFixed(1);

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${Math.max(10, (data.monthly[index] / max) * 190)}px`;

        const label = document.createElement("div");
        label.className = "bar-label";
        label.textContent = month;

        group.appendChild(value);
        group.appendChild(bar);
        group.appendChild(label);

        monthlyChart.appendChild(group);
    });
}

function renderSources(data) {
    sourceList.innerHTML = "";
    const max = Math.max(...data.topSources.map(source => source.value));

    data.topSources.forEach(source => {
        const row = document.createElement("div");
        row.className = "source-row";

        const name = document.createElement("div");
        name.className = "source-name";
        name.textContent = source.name;

        const track = document.createElement("div");
        track.className = "source-track";

        const fill = document.createElement("div");
        fill.className = "source-fill";
        fill.style.width = `${(source.value / max) * 100}%`;

        track.appendChild(fill);

        const value = document.createElement("div");
        value.className = "source-value";
        value.textContent = source.value.toFixed(2);

        row.appendChild(name);
        row.appendChild(track);
        row.appendChild(value);

        sourceList.appendChild(row);
    });
}

updateCountry("Germany");