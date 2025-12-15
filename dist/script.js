 
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





});






