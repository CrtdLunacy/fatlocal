import { useEffect, useState } from 'react';

export function useLatencyLoading(state: boolean) {
    const [isLatencyLoading, setIsLatencyLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLatencyLoading(state);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [state]);

    return [isLatencyLoading];
}
