export function formatCookingTime(seconds: number): string {
    if (seconds === 0) return '00:00';

    const hours: number = Math.floor(seconds / 3600);
    const remainingMinutes: number = Math.floor((seconds % 3600) / 60);

    const formattedHours: string = String(hours).padStart(2, '0');
    const formattedMinutes: string = String(remainingMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}
