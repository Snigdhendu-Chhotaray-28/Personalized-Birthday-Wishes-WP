 
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







