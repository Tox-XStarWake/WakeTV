let spinning = false;
let winningNumber = 42; // Set your desired winning number

async function fetchData() {
  try {
    const response = await fetch('data.txt'); // Update with your actual file path
    const data = await response.text();
    return data.split('\n').map(line => {
      const [name, number] = line.split(':');
      return { name: name.trim(), number: parseInt(number.trim()) };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function sortDataByNumber(data) {
  return data.sort((a, b) => a.number - b.number);
}

function spinWheel() {
  if (!spinning) {
    const wheel = document.getElementById('wheel');
    fetchData().then(data => {
      const sortedData = sortDataByNumber(data);

      // Update to enable vertical scrolling
      wheel.classList.add('vertical-scroll');

      // Generate sections dynamically based on fetched data
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

      // Clean up to allow for future spins without interference
      setTimeout(() => {
        wheel.classList.remove('vertical-scroll');
      }, 3000); // Adjust this time to match the wheel's transition time
    });
  }
}

function getSelectedSection(degrees) {
  // Determine the section based on the wheel's rotation
  // You might need to adjust the logic based on your wheel's setup
  const sectionCount = 8; // Adjust this based on the number of sections
  const sectionSize = 360 / sectionCount;

  const selectedSection = Math.floor(degrees / sectionSize) + 1;
  return selectedSection;
}

function getClosestSection(targetNumber, data) {
  // Find the section with the number closest to the targetNumber
  const closestEntry = data.reduce((closest, entry) => {
    const diff = Math.abs(entry.number - targetNumber);
    return (diff < closest.diff) ? { entry, diff } : closest;
  }, { entry: null, diff: Infinity });

  return { entry: closestEntry.entry, index: data.indexOf(closestEntry.entry) };
}
