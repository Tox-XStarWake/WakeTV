let spinning = false;

// Function to fetch and parse data from the text file
async function fetchData() {
  try {
    const response = await fetch('data.txt'); // Update with your actual file path
    const data = await response.text();
    return data.split('\n').map(line => {
      const [name, number] = line.split(': ');
      return { name, number: parseInt(number) };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Function to sort the data by number
function sortDataByNumber(data) {
  return data.sort((a, b) => a.number - b.number);
}

function spinWheel() {
  if (!spinning) {
    const wheel = document.getElementById('wheel');
    fetchData().then(data => {
      const sortedData = sortDataByNumber(data);
      const sections = sortedData.map((entry, index) => `<div class="section">${index + 1}: ${entry.name}</div>`);
      
      wheel.innerHTML = sections.join('');

      const randomDegree = Math.floor(Math.random() * 360) + 1440; // Adjust this range as needed
      spinning = true;

      wheel.style.transform = `rotate(${randomDegree}deg)`;

      setTimeout(() => {
        spinning = false;
        const selectedSection = getSelectedSection(randomDegree % 360);
        alert(`Selected Section: ${selectedSection}`);
      }, 3000); // Adjust this time to match the wheel's transition time
    });
  }
}

// The getSelectedSection function remains the same
