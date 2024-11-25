function startAction() {
  alert("Get ready to explore the best food around!");
  window.location.href = "menu.html"; // Replace with your desired link
}

function needHelp() {
  alert("How can we assist you?");
  window.location.href = "help.html"; // Replace with your desired link
}

function contactUs() {
  alert("We’d love to hear from you! Contact us at contact@foodlovers.com.");
  window.location.href = "contact.html"; // Replace with your desired link
}

// Adding animation effects to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".corner-button, .start-button");
  buttons.forEach((button) => {
    button.style.transition = "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
      button.style.boxShadow = "0 0 10px #28a745, 0 0 20px #218838";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    });
  });
});

// Initialize variables
let mediaRecorder;
let audioChunks = [];

document.getElementById('record').addEventListener('click', async () => {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    // Update UI
    document.getElementById('status').innerText = 'Recording...';
    audioChunks = [];

    // Start recording
    mediaRecorder.start();

    // Collect audio data
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // Stop recording after 5 seconds or manually
    setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, 5000);

    mediaRecorder.onstop = async () => {
      document.getElementById('status').innerText = 'Processing...';

      // Convert audio data to a Blob and send it to Flask server
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      // Send to Flask server
      const response = await fetch('http://127.0.0.1:5000/convert', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      document.getElementById('status').innerText = 'Completed!';
      document.getElementById('transcription').innerText = result.text || 'No transcription available.';

    };
  }
});

