export function formatAndConvertDateTime(inputDateTime: string) {
    // Функция для форматирования времени с учетом текущей локали и часовой зоны пользователя
    function formatDateTime(inputDateTime: Date) {
        const { locale } = Intl.DateTimeFormat().resolvedOptions();

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        return new Intl.DateTimeFormat(locale, options).format(inputDateTime);
    }

    // Получаем текущую дату и время из входной строки и устанавливаем часовой пояс в UTC
    const dateTime = new Date(`${inputDateTime}Z`);

    // Форматируем дату и время с учетом текущей локали
    const formattedDateTime = formatDateTime(dateTime);

    return formattedDateTime;
}
