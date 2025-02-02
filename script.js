let spinCount = 0;

document.getElementById("spinButton").addEventListener("click", function () {
    const wheel = document.getElementById("wheel");
    const randomDegree = Math.floor(3600 + Math.random() * 360); // Случайное вращение
    wheel.style.transition = "none"; // Сбрасываем переход
    wheel.style.transform = `rotate(${randomDegree % 360}deg)`; // Устанавливаем начальное положение

    setTimeout(() => {
        wheel.style.transition = "transform 4s ease-out"; // Добавляем плавный переход
        wheel.style.transform = `rotate(${randomDegree}deg)`;
    }, 0);

    spinCount++;
    document.getElementById("spinCount").textContent = spinCount;

    setTimeout(() => {
        const winningSegment = determinePrize((randomDegree % 360) + 2 * (360 / 8));
        alert(`🎉 Ваш приз: ${winningSegment}`);
    }, 4000); // Задержка для окончания анимации
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
