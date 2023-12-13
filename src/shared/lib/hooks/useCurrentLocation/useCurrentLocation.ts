import { useEffect, useState } from 'react';

export function useCurrentLocation(path: string, location: string): boolean {
    const [isPicked, setIsPicked] = useState(false);

    useEffect(() => {
        setIsPicked(location === path);
    }, [path, location]);

    return isPicked;
}
