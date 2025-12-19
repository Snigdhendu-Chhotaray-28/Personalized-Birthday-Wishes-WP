 
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const sendernameInput = document.getElementById('sendernameInput');
    const generateLinkBtn = document.getElementById('generateLinkBtn');
    const linkOutput = document.getElementById('linkOutput');
    const generatedLinkInput = document.getElementById('generatedLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');







    // ============== Generate link with receving names ============== //

    if (generateLinkBtn) { // Check if we are on the link generation page
        generateLinkBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const yourName = sendernameInput.value.trim(); // Changed to 'const' for clarity
            if (name && yourName) {
                // console.log(window.location.hostname);
                // Get the base URL of your website

                // const baseUrl = window.location.origin + window.location.pathname.replace('index.html', 'wish.html');
                const baseUrl = window.location.origin + '/wish.html';
                console.log(window.location);
                
                // Encode the name to handle spaces and special characters
                const encodedName = encodeURIComponent(name);
                const encodedSenderName = encodeURIComponent(yourName); // Encode senderName as well
                // Corrected: Use '&' to separate multiple query parameters
                const wishLink = `${baseUrl}?name=${encodedName}&senderName=${encodedSenderName}`;

                generatedLinkInput.value = wishLink;
                linkOutput.style.display = 'block'; // Show the link output section



                // NEW: Enable WhatsApp button and set its click handler
                whatsappShareBtn.style.display =  'inline-block'; // Show it
                whatsappShareBtn.onclick = () => {
                    const message = `🎉 Happy Birthday! Click this link for a special wish: ${wishLink}`;
                    const encodedMessage = encodeURIComponent(message);
                    // For web browsers (opens web.whatsapp.com)
                    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
                    // For mobile devices (opens WhatsApp app directly) - can also be used for web
                    // const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

                    window.open(whatsappUrl, '_blank');
                };
            } else {
                alert('Please enter both names!'); // More specific alert
                linkOutput.style.display = 'none'; // Hide if no name entered
            }
        });

        copyLinkBtn.addEventListener('click', () => {
            generatedLinkInput.select();
            generatedLinkInput.setSelectionRange(0, 99999); // For mobile devices
            document.execCommand('copy');
            alert('Link copied to clipboard!');
        });
    }





    // ==================== diplay name as per link ==================== // 

    // --- For the wish display page (wish.html) ---
    const wishMessage = document.getElementById('wishMessage');
    const recipientNameSpan = document.getElementById('recipientName');
    const signature = document.getElementById('signature');

    if (wishMessage && recipientNameSpan) { // Check if we are on the wish display page
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const senderName = urlParams.get('senderName'); // Correctly retrieve senderName

        if (name) { // Check if name exists
            recipientNameSpan.textContent = decodeURIComponent(name);
            document.querySelector('.frd_name').innerHTML = decodeURIComponent(name);
            if (senderName) { // Check if senderName exists
                signature.textContent = decodeURIComponent(senderName); // Corrected typo here
            } else {
                signature.textContent = 'A Secret Admirer'; // Fallback for sender if not provided
            }
        } else {
            // Fallback if no name is provided in the URL
            recipientNameSpan.textContent = 'Dear Friend';
            wishMessage.innerHTML = `Happy Birthday! We hope you have a fantastic day filled with joy and laughter.`;
            signature.textContent = 'Someone Special'; // Fallback for sender if no name
        }
    }
});









// =================== box dispior and page appear =================== //

let determine = 0;

(()=>{

    setTimeout(()=>{
        document.querySelector('.gift-box').classList.add('hide');
        document.querySelector('.gift-box').classList.remove('visible');
        document.querySelector('main').classList.remove('hide');
        document.querySelector('main').classList.add('visible');
    },7000);
})();
(()=>{

    setTimeout(()=>{
        document.querySelector('main').classList.remove('hide');
        document.querySelector('main').classList.add('visible');
        windBlow();
    },8000);
})();

// Countdown Timer
// function updateCountdown() {
//     const now = new Date();
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     const diff = endOfDay - now;

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
//     document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
//     document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
// }

// setInterval(updateCountdown, 1000);
// updateCountdown();





// =================== Falling small ribbon animation =================== //

function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';

        document.getElementById('confetti-container').appendChild(confetti);

        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    document.querySelector('.blowWind').classList.add('hide');
}





// =================== Blow Candles Button =================== //

document.getElementById('wish-btn').addEventListener('click', function() {
    // Animate candles
    if(determine == 0){
        determine = 1;
        // Animate candles
        const flames = document.querySelectorAll('.candle-flame');
        flames.forEach(flame => {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
        });
        document.querySelector('.myAudio').play();
        createConfetti();
    }
});





// =================== Bottom balloons animation =================== //

function createBalloons() {
    const balloonContainer = document.createElement('div');
    balloonContainer.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-0';
    document.body.appendChild(balloonContainer);

    const balloonColors = ['#ff3366', '#ff6633', '#ffcc33', '#33ccff', '#9933ff', '#33ff66'];

    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'absolute rounded-full';
        balloon.style.width = Math.random() * 60 + 30 + 'px';
        balloon.style.height = Math.random() * 80 + 50 + 'px';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.bottom = '-100px';
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.opacity = '0.7'; 
        balloon.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        balloon.style.animationDelay = Math.random() * 5 + 's';

        // Balloon string
        const string = document.createElement('div');
        string.className = 'absolute bg-gray-400';
        string.style.width = '2px';
        string.style.height = Math.random() * 50 + 30 + 'px';
        string.style.bottom = '-30px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';

        balloon.appendChild(string);
        balloonContainer.appendChild(balloon);
    }
}





// =================== Flower Animation in home page =================== //

function createFlowers() {
    const flowerContainer = document.getElementById('flower-container');
    const flowerColors = ['#FF69B4', '#FF1493', '#FF00FF', '#EE82EE', '#DA70D6']; // Various shades of pink/purple

    for (let i = 0; i < 20; i++) { // Create 20 flowers
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 20 + '%'; // Bloom in the top 20% of the screen
        flower.style.backgroundColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        flower.style.animationDelay = Math.random() * 3 + 's'; // Stagger the animation
        flowerContainer.appendChild(flower);
    }
}

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
    createBalloons();
    createFlowers();
});






// =================== Bottom 4 img height and width adjustement for different device(always width == height) =================== //

function restich_height(){
    const width = document.querySelector('.restict').offsetWidth;
    const resticts = document.querySelectorAll('.restict');
    resticts.forEach((restict) => {
        restict.style.height = width+'px';
    });
}
restich_height();











// =================== Audio play =================== //

let audioContext;
let analyser;
let mediaStreamSource;





// =================== Check wind blow =================== //

function windBlow(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                mediaStreamSource = audioContext.createMediaStreamSource(stream);
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048; // Fast Fourier Transform size
                mediaStreamSource.connect(analyser);

                detectWind();
            })
            .catch(err => {
                console.error('Error accessing microphone:', err);
            });
        } else {
            console.error('getUserMedia not supported in this browser.');
        }
}








function detectWind() {
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudio = () => {
        analyser.getByteTimeDomainData(dataArray); // Get waveform data

        // Calculate the average amplitude
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            const value = (dataArray[i] - 128) / 128.0; // Normalize to -1 to 1
            sum += Math.abs(value); // Absolute value for amplitude
        }
        const averageAmplitude = sum / bufferLength;

        // Define a threshold for "wind"
        const windThreshold = 0.2; // You'll need to adjust this value!

        if (averageAmplitude > windThreshold) {
            // --- YOUR TASK GOES HERE ---
            // Example: Change background color, play a sound, show an image
            document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;

            if(determine == 0){
                determine = 1;
                // Animate candles
                const flames = document.querySelectorAll('.candle-flame');
                flames.forEach(flame => {
                    flame.style.animation = 'none';
                    flame.style.opacity = '0';
                    flame.style.transform = 'scale(0)';
                });
                document.querySelector('.myAudio').play();
                createConfetti();
            }
        } else {
            document.body.style.backgroundColor = ''; // Reset background
        }

        requestAnimationFrame(checkAudio);
    };
    checkAudio();
}