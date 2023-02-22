// Add comma to the number
export function formatNumber(price) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function trimAddress(string) {
    if(string.length > 35) return `${string.substring(0, 35)}...`;
    return string;
}