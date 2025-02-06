let spinCount = 0;

document.getElementById("spinButton").addEventListener("click", function () {
    const wheel = document.getElementById("wheel");
    const randomDegree = Math.floor(3600 + Math.random() * 360); 
    wheel.style.transition = "none"; 
    wheel.style.transform = `rotate(${randomDegree % 360}deg)`; 

    setTimeout(() => {
        wheel.style.transition = "transform 4s ease-out";
        wheel.style.transform = `rotate(${randomDegree}deg)`;
    }, 0);

    spinCount++;
    document.getElementById("spinCount").textContent = spinCount;

    setTimeout(() => {
        const prize = determinePrize((randomDegree % 360) + 2 * (360 / 8));
        alert(`🎉 Ваш приз: ${prize}`);
        sendSpinResult(prize); // Отправка на сервер
    }, 4000);
});

function determinePrize(degree) {
    const segments = [
        "1 ДЕНЬ",
        "5$",
        "5 ДНЕЙ",
        "AIRPODS",
        "10 ДНЕЙ",
        "IPHONE 14",
        "20 ДНЕЙ",
        "200 000 РУБ."
    ];
    const segmentAngle = 360 / segments.length;
    const index = Math.floor(degree / segmentAngle) % segments.length;
    return segments[segments.length - 1 - index];
}

async function sendSpinResult(prize) {
    const userId = "test_user"; // Заменить на реальный ID пользователя
    try {
        const response = await axios.post("http://localhost:8000/spin/", {
            user_id: userId,
            prize: prize
        });

        console.log("Результат сохранён:", response.data);
    } catch (error) {
        console.error("Ошибка при отправке результата:", error);
    }
}
