import { useEffect, useState } from "react"

function useDebounce(value = "", delay = 1000) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay)

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, delay])
    return debounce;
}
export default useDebounce