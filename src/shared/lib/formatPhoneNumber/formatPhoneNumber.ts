export function formatPhoneNumber(phoneNumber: string | undefined): string {
    const cleaned = (`${phoneNumber}`).replace(/\D/g, '');

    if (cleaned.length === 0 || phoneNumber === undefined) {
        return '';
    }

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        const formattedNumber = `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        return formattedNumber;
    }

    return phoneNumber;
}
