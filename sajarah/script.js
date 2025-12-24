let isChatbotOpen = false;

// Floating arrow functionality
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');
    const floatingArrow = document.getElementById('floatingArrow');
    const chatbotToggle = document.querySelector('.chatbot-toggle');

    // Show/hide arrow on scroll
    function handleScroll() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom && !isChatbotOpen) {
            floatingArrow.classList.add('visible');
        } else {
            floatingArrow.classList.remove('visible');
        }
    }

    // Toggle chatbot when arrow is clicked
    floatingArrow.addEventListener('click', function () {
        toggleChatbot();
        this.classList.remove('visible');
    });

    // Hide arrow when chatbot is opened via toggle
    chatbotToggle.addEventListener('click', function () {
        floatingArrow.classList.remove('visible');
    });

    window.addEventListener('scroll', handleScroll);
    // Initial check in case page loads with scroll position past hero
    handleScroll();
});

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    const floatingArrow = document.getElementById('floatingArrow');
    isChatbotOpen = !isChatbotOpen;

    if (isChatbotOpen) {
        // Hide the floating arrow when opening the chat
        floatingArrow.classList.remove('visible');
        chatbotWindow.style.display = 'flex';
        // Small delay to allow the display property to take effect before adding the active class
        setTimeout(() => {
            chatbotWindow.classList.add('active');
        }, 10);
        // Focus the input when opening
        const input = document.getElementById('userInput');
        if (input) input.focus();
    } else {
        chatbotWindow.classList.remove('active');
        // Wait for the transition to complete before hiding
        setTimeout(() => {
            if (!isChatbotOpen) {
                chatbotWindow.style.display = 'none';
                // Show the floating arrow again when closing the chat if we're past the hero
                const heroSection = document.querySelector('.hero');
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                if (window.scrollY > heroBottom) {
                    floatingArrow.classList.add('visible');
                }
            }
        }, 300);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    const loading = document.getElementById('loadingIndicator');
    loading.style.display = 'block';

    try {
        // const response = await simulateGeminiResponse(message);
        const response = await callGeminiAPI(message); // Uncomment this line for production
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Hapunten, aya gangguan dina sistem. Mangga coba deui.', 'bot');
    } finally {
        loading.style.display = 'none';
    }
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ====== KEEP DULU INI, TAKUTNYA ERROR ======
async function simulateGeminiResponse(message) {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    const lower = message.toLowerCase();

    // Jawaban acak untuk topik "tahu bulat"
    if (lower.includes('tahu bulat')) {
        // Special case for origin city
        if (lower.includes('asal') && (lower.includes('kota') || lower.includes('daerah') || lower.includes('tempat'))) {
            return "🥟 Tahu bulat asalna ti Kota Tasikmalaya, Jawa Barat! Salahsiji jajanan khas Sunda anu jadi ikon kuliner di dinya. <br><em>(Tahu bulat berasal dari Kota Tasikmalaya, Jawa Barat! Salah satu jajanan khas Sunda yang menjadi ikon kuliner di sana.)</em>";
        }

        const responses = [
            "🥟 Tahu bulat téh digoreng dadakan! Buleud, gurih, ngeunah pisan!<br><em>(Tahu bulat digoreng dadakan! Bulat, gurih, sangat enak!)</em>",
            "Tahu bulat mangrupa cemilan favorit barudak Sunda! Biasana dijual di mobil pick-up.<br><em>(Tahu bulat adalah camilan favorit anak-anak Sunda! Biasanya dijual di mobil bak terbuka.)</em>",
            "Buleud jeung renyah, tahu bulat jadi lambang saderhana tapi ngeunah!<br><em>(Bulat dan renyah, tahu bulat melambangkan kesederhanaan yang nikmat!)</em>",
            "Tahu bulat, jajanan legendaris ti Tasikmalaya! Dijual di pinggir jalan, hargana murah meriah! 🚚<br><em>(Tahu bulat, jajanan legendaris dari Tasikmalaya! Dijual di pinggir jalan, harganya murah meriah!)</em>"
        ];
        return randomFrom(responses);
    }

    // Resep atau bahan
    if (lower.includes('resep') || lower.includes('bahan')) {
        const responses = [
            "Resepna gampang: tahu putih, bawang bodas, soda kue. Diulék, dibuleudkeun, tuluy digoreng. 🍳<br><em>(Resepnya mudah: tahu putih, bawang putih, baking soda. Dihaluskan, dibulatkan, lalu digoreng.)</em>",
            "Bahan pokokna téh: tahu putih 500g, bawang, soda kue, jeung rasa cinta masakna. ❤️<br><em>(Bahan pokoknya: tahu putih 500g, bawang, baking soda, dan cinta saat memasaknya.)</em>"
        ];
        return randomFrom(responses);
    }

    // Filosofi atau makna
    if (lower.includes('filosofi') || lower.includes('makna')) {
        const responses = [
            "🌀 Tahu bulat téh lambang kahirupan sederhana tapi bermakna.<br><em>(Tahu bulat adalah simbol hidup sederhana yang bermakna.)</em>",
            "Bentukna buleud: ngalambangkeun kasampurnaan jeung kaharmonisan. ☯️<br><em>(Bentuknya bulat: melambangkan kesempurnaan dan keharmonisan.)</em>"
        ];
        return randomFrom(responses);
    }

    // Kuliner Sunda
    if (lower.includes('kuliner') || lower.includes('sunda')) {
        const responses = [
            "Kuliner Sunda beunghar rasa! Nasi liwet, karedok, lotek, peuyeum, jeung tangtu wae... tahu bulat! 🍛",
            "Sunda miboga rupa-rupa kadaharan tradisional: awug, surabi, bandros, jeung sejenna. 🥥🍠"
        ];
        return randomFrom(responses);
    }

    // Sambal atau bumbu
    if (lower.includes('sambal') || lower.includes('bumbu')) {
        return "Biasana dikonsumsi jeung sambel kacang atanapi sambel rujak. Pedas-pedas ngangenin! 🌶️<br><em>(Biasanya dimakan dengan sambal kacang atau rujak. Pedasnya bikin kangen!)</em>";
    }

    // Harga
    if (lower.includes('harga') || lower.includes('jual')) {
        return "Hargana ramah kantong! Biasana Rp1.000 - Rp2.000 per biji. Bisa diteang di tukang keliling. 🚛";
    }

    // Sapaan
    if (lower.includes('halo') || lower.includes('hai') || lower.includes('hello')) {
        return "Halo, wilujeng sumping ka AI Kuliner Sunda! 👋<br><em>(Halo, selamat datang di AI Kuliner Sunda!)</em>";
    }

    // Terima kasih
    if (lower.includes('makasih') || lower.includes('terima kasih')) {
        return "Sami-sami! Mugia jawaban abdi aya mangpaatna. 🙏<br><em>(Sama-sama! Semoga jawaban saya bermanfaat.)</em>";
    }

    // Default
    return "Hapunten, abdi ngan tiasa ngawalon patarosan ngeunaan tahu bulat jeung kuliner Sunda. 🥟<br><em>(Maaf, saya hanya bisa menjawab pertanyaan tentang tahu bulat dan kuliner Sunda.)</em>";
}

// Fungsi bantu ambil jawaban acak
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ====== INI UNTUK PANGGIL GEMINI API ======
async function callGeminiAPI(message) {
    const API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    const prompt = `
    ‼️ ANDA HANYA BOLEH MENJAWAB DALAM LINGKUP INI SAJA:

    ✅ Topik yang boleh dijawab:
    - Sapaan (halo, hai, selamat datang)
    - Tahu Bulat (asal-usul, resep, filosofi, harga, penyajian)
    - Makanan atau minuman khas Sunda lainnya
    - Budaya kuliner Sunda (cara makan, nilai sosial, sejarah, kebiasaan)

    ❌ Jangan jawab jika pertanyaannya:
    - Tidak berkaitan dengan kuliner Sunda
    - Bersifat umum, curhat, politik, teknologi, atau tidak relevan

    Jika pertanyaan TIDAK relevan, jawab:
    "Hapunten, abdi ngan tiasa ngajawab patarosan ngeunaan kuliner khas Sunda. 🥟"

    ✍️ FORMAT WAJIB:
    - Jawaban dalam bahasa Sunda disertai terjemahan dalam bahasa Indonesia dengan format HTML <em>...</em>
    - Gunakan emoji jika sesuai
    - Jangan jawab dengan terlalu panjang, cukup ringkas dan padat

    Contoh format:
    "Kuliner Sunda kawentar ku rasa seger jeung hampang. 🍛<br><em>(Kuliner Sunda terkenal dengan rasa yang segar dan ringan.)</em>"

    🧠 Pertanyaan: ${message}
    `;


    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                    topP: 0.8,
                    topK: 10
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Gemini raw response:', data); // tambahkan untuk debugging

        let geminiResponse = 'Hapunten, teu aya jawaban ti bot.';

        if (
            data &&
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0] &&
            data.candidates[0].content.parts[0].text
        ) {
            geminiResponse = data.candidates[0].content.parts[0].text;
        }

        return geminiResponse;

    }
    catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}