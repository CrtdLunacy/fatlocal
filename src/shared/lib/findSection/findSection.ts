export function findSection(location: string): string {
    const regex = /&.*$/;
    return location.replace(regex, '');
}

export function findSubSection(location: string): string {
    const regex = /&.*$/;
    const regex2 = /&([^&]+)&/g;
    const locPath = location;
    const section = locPath.replace(regex, '');
    const match = location.match(regex2);
    const result = match ? `${section}${match[0]}` : location;
    return result;
}
